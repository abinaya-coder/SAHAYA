import type { AnalysisResponse, AudioMeta, CaseData, CaseMemory, SupportedLanguage } from '../types';
import { analyzeTranscriptClient } from './nlpEngine';

const API_BASE_URL = 'http://localhost:8000/api';

export async function fetchCases(): Promise<CaseData[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/cases`);
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn('Backend API unreachable, returning client synthetic demo cases', err);
  }
  
  // Return client fallback cases
  const { DEMO_CASES_CLIENT } = await import('./clientDemoCases');
  return DEMO_CASES_CLIENT;
}

export async function analyzeTranscriptAPI(
  text: string,
  language: SupportedLanguage = 'en',
  audioMeta?: AudioMeta,
  caseMemory?: CaseMemory,
  useExternalAPI: boolean = false
): Promise<AnalysisResponse> {
  if (useExternalAPI) {
    try {
      const res = await fetch(`${API_BASE_URL}/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, language, audioMeta, caseMemory })
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (err) {
      console.warn('FastAPI backend unreachable, falling back to deterministic client engine', err);
    }
  }

  // Fallback to client NLP engine
  return analyzeTranscriptClient(text, language, audioMeta, caseMemory);
}

export async function recordHumanReviewAPI(
  caseId: string,
  status: string,
  action: string,
  note?: string,
  officerName: string = 'Authorized Officer'
) {
  try {
    const res = await fetch(`${API_BASE_URL}/cases/${caseId}/review`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, action, note, officerName })
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn('API review failed, returning updated local object', err);
  }
  return null;
}
