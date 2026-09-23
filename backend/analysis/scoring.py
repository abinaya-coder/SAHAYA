"""
SAHAYA Stress Vulnerability Index (SVI) Scoring Module
Calculates SVI (0-100), risk band, and overall analysis confidence.
"""

import json
import os
from typing import Dict, List, Any

# Load SVI Weights from config file
CONFIG_PATH = os.path.join(os.path.dirname(__file__), "..", "svi_config.json")
try:
    with open(CONFIG_PATH, "r", encoding="utf-8") as f:
        SVI_CONFIG = json.load(f)
except Exception:
    SVI_CONFIG = {
        "weights": {
            "IMMEDIATE_SAFETY": 30,
            "THREAT": 25,
            "FEAR_DISTRESS": 15,
            "URGENCY": 10,
            "REPEATED_INCIDENT": 10,
            "VIOLENCE": 5,
            "EMOTIONAL_INTENSITY": 5
        },
        "bands": [
            { "max": 25, "label": "LOW", "color": "emerald" },
            { "max": 50, "label": "MODERATE", "color": "amber" },
            { "max": 75, "label": "HIGH", "color": "orange" },
            { "max": 100, "label": "CRITICAL", "color": "rose" }
        ]
    }

def calculate_svi(indicators: List[Dict[str, Any]]) -> Dict[str, Any]:
    weights = SVI_CONFIG["weights"]
    total_score = 0.0
    detected_types = set()

    for ind in indicators:
        ind_type = ind.get("type")
        confidence = ind.get("confidence", 0.8)
        if ind_type in weights:
            detected_types.add(ind_type)
            # Add weighted score
            total_score += weights[ind_type] * confidence

    # Cap score at 100 and round
    svi_score = min(100, int(round(total_score)))

    # Determine band
    band = "LOW"
    color = "emerald"
    for b in SVI_CONFIG["bands"]:
        if svi_score <= b["max"]:
            band = b["label"]
            color = b["color"]
            break

    # Overall Confidence Calculation
    if not indicators:
        overall_confidence = 0.40
        confidence_label = "LOW"
    else:
        avg_conf = sum(i.get("confidence", 0.8) for i in indicators) / len(indicators)
        overall_confidence = round(avg_conf, 2)
        confidence_label = "HIGH" if overall_confidence >= 0.75 else "MODERATE"

    return {
        "svi": svi_score,
        "band": band,
        "bandColor": color,
        "confidence": overall_confidence,
        "confidenceLabel": confidence_label,
        "detectedCategoriesCount": len(detected_types),
        "disclaimer": "AI-assisted indicator — final assessment and action remain with the authorized human officer."
    }
