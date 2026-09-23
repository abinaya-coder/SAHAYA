"""
SAHAYA Unified Full-Stack Application & API Server
Serves production React UI dashboard, WebSockets, and real-time trauma-sensitive NLP analysis APIs.
"""

from fastapi import FastAPI, WebSocket, WebSocketDisconnect, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel
from typing import Optional, List, Dict, Any
import json
import asyncio
import os

from analysis.engine import analyze_transcript
from analysis.scoring import calculate_svi
from analysis.next_question import suggest_next_question
from analysis.speech_analysis import analyze_speech_indicators
from analysis.support_pathway import recommend_support_pathways
from database.db import repo

app = FastAPI(
    title="SAHAYA Unified Full-Stack AI Co-Pilot",
    description="Smart India Hackathon decision support platform for NHAA 14566 & Integrated Portal",
    version="1.0.0"
)

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class AnalyzeRequest(BaseModel):
    text: str
    language: str = "en"
    audioMeta: Optional[Dict[str, Any]] = None
    caseMemory: Optional[Dict[str, Any]] = None

class HumanReviewRequest(BaseModel):
    status: str  # Reviewed | Action Required | Escalated
    action: str  # Confirm | Modify | Dismiss
    note: Optional[str] = None
    officerName: str = "Authorized Officer"

class TimelineEventRequest(BaseModel):
    event: str
    actor: str = "Human Officer"

class SupportPathwayRequest(BaseModel):
    pathwayId: str
    status: str  # SUGGESTED | CONSIDERED | DISMISSED | CONFIRMED

# REST API Endpoints
@app.get("/api/status")
def read_status():
    return {
        "system": "SAHAYA AI Co-Pilot for Trauma-Sensitive Response",
        "status": "ONLINE",
        "disclaimer": "AI-assisted indicator — final assessment and action remain with the authorized human officer."
    }

@app.get("/api/cases")
def get_cases():
    return repo.get_all_cases()

@app.get("/api/cases/{case_id}")
def get_case(case_id: str):
    case = repo.get_case(case_id)
    if not case:
        raise HTTPException(status_code=404, detail="Case not found")
    return case

@app.post("/api/analyze")
def analyze_endpoint(req: AnalyzeRequest):
    nlp_result = analyze_transcript(req.text, req.language)
    indicators = nlp_result["indicators"]
    
    svi_result = calculate_svi(indicators)
    speech_result = analyze_speech_indicators(req.text, indicators, req.audioMeta or {})
    next_q_result = suggest_next_question(nlp_result, req.caseMemory or {})
    support_result = recommend_support_pathways(indicators, svi_result["svi"])

    return {
        "text": req.text,
        "language": req.language,
        "indicators": indicators,
        "immediateSafety": nlp_result["immediateSafety"],
        "svi": svi_result["svi"],
        "band": svi_result["band"],
        "bandColor": svi_result["bandColor"],
        "confidence": svi_result["confidence"],
        "confidenceLabel": svi_result["confidenceLabel"],
        "speechMetrics": speech_result["metrics"],
        "mismatch": speech_result["mismatch"],
        "suggestedNextQuestion": next_q_result["suggestedQuestion"],
        "nextQuestionRationale": next_q_result["rationale"],
        "avoidRepetitionWarning": next_q_result["avoidRepetitionWarning"],
        "supportPathways": support_result,
        "disclaimer": svi_result["disclaimer"]
    }

@app.post("/api/cases/{case_id}/review")
def record_human_review(case_id: str, req: HumanReviewRequest):
    updated = repo.update_human_review(case_id, req.status, req.action, req.note, req.officerName)
    if not updated:
        raise HTTPException(status_code=404, detail="Case not found")
    return updated

@app.post("/api/cases/{case_id}/timeline")
def add_timeline(case_id: str, req: TimelineEventRequest):
    updated = repo.add_timeline_event(case_id, req.event, req.actor)
    if not updated:
        raise HTTPException(status_code=404, detail="Case not found")
    return updated

@app.post("/api/cases/{case_id}/support-pathway")
def update_pathway(case_id: str, req: SupportPathwayRequest):
    updated = repo.update_support_pathway(case_id, req.pathwayId, req.status)
    if not updated:
        raise HTTPException(status_code=404, detail="Case not found")
    return updated

@app.websocket("/ws/live-analysis")
async def websocket_live_analysis(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            data_str = await websocket.receive_text()
            data = json.loads(data_str)
            text = data.get("text", "")
            lang = data.get("language", "en")
            
            nlp_result = analyze_transcript(text, lang)
            svi_result = calculate_svi(nlp_result["indicators"])
            speech_result = analyze_speech_indicators(text, nlp_result["indicators"], data.get("audioMeta", {}))
            next_q = suggest_next_question(nlp_result, data.get("caseMemory", {}))

            response = {
                "indicators": nlp_result["indicators"],
                "immediateSafety": nlp_result["immediateSafety"],
                "svi": svi_result["svi"],
                "band": svi_result["band"],
                "confidence": svi_result["confidence"],
                "mismatch": speech_result["mismatch"],
                "suggestedNextQuestion": next_q["suggestedQuestion"],
                "avoidRepetitionWarning": next_q["avoidRepetitionWarning"]
            }
            await websocket.send_text(json.dumps(response))
    except WebSocketDisconnect:
        pass

# Mount Static Frontend Bundle (SPA)
DIST_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "frontend", "dist"))

if os.path.exists(DIST_DIR):
    assets_dir = os.path.join(DIST_DIR, "assets")
    if os.path.exists(assets_dir):
        app.mount("/assets", StaticFiles(directory=assets_dir), name="assets")

    @app.get("/{full_path:path}")
    async def serve_spa_frontend(full_path: str):
        # Do not intercept API or Docs
        if full_path.startswith("api") or full_path.startswith("ws") or full_path.startswith("docs") or full_path.startswith("openapi.json"):
            raise HTTPException(status_code=404, detail="API route not found")
        
        target_file = os.path.join(DIST_DIR, full_path)
        if full_path and os.path.exists(target_file) and os.path.isfile(target_file):
            return FileResponse(target_file)
        
        # Serve index.html SPA
        return FileResponse(os.path.join(DIST_DIR, "index.html"))
