export type UserRole = 
  | 'COMPLAINANT' 
  | 'OFFICER' 
  | 'COUNSELLOR' 
  | 'LEGAL' 
  | 'ADMIN';

export type SupportedLanguage = 'en' | 'ta' | 'hi' | 'bn' | 'te';

export type IndicatorType = 
  | 'THREAT'
  | 'FEAR_DISTRESS'
  | 'IMMEDIATE_SAFETY'
  | 'URGENCY'
  | 'VIOLENCE'
  | 'REPEATED_INCIDENT'
  | 'EMOTIONAL_INTENSITY'
  | 'SOCIAL_ISOLATION';

export type SeverityLevel = 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';

export interface Indicator {
  type: IndicatorType;
  severity: SeverityLevel;
  evidence: string;
  translatedEvidence?: string;
  confidence: number;
}

export interface EvidenceItem {
  text: string;
  type: IndicatorType;
  label: string;
}

export interface AudioMeta {
  speaking_rate?: string;
  pause_duration?: string;
  hesitation?: string;
  pitch_variation?: string;
  voice_intensity?: string;
}

export interface SpeechMismatch {
  detected: boolean;
  title: string;
  explanation: string;
  recommendation: string;
}

export interface CaseMemory {
  incident?: string;
  threat?: string;
  people_involved?: string;
  location?: string;
  time?: string;
  previous_occurrence?: string;
  current_safety?: string;
  support_requested?: string;
}

export interface SupportPathwayItem {
  id: string;
  category: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  reason?: string;
  status: 'SUGGESTED' | 'CONSIDERED' | 'DISMISSED' | 'CONFIRMED';
  icon?: string;
}

export interface TimelineEvent {
  timestamp: string;
  event: string;
  actor: 'System' | 'AI Layer' | 'Human Officer' | 'Complainant' | 'Counsellor' | 'Legal Officer';
}

export interface CaseData {
  id: string;
  title: string;
  complainantName: string;
  language: SupportedLanguage;
  languageName: string;
  timestamp: string;
  originalText: string;
  translatedText: string;
  svi: number;
  band: 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';
  bandColor?: string;
  confidence: number;
  immediateSafety: boolean;
  distressStatus: string;
  threatStatus: string;
  caseStatus: string; // Active | Pending | Under Review | Closed
  humanReviewStatus: string; // Pending Review | Reviewed | Escalated | Action Taken
  assignedOfficer: string;
  audioMeta: AudioMeta;
  indicators: Indicator[];
  evidenceList: EvidenceItem[];
  caseMemory: CaseMemory;
  suggestedNextQuestion: string;
  supportPathways: SupportPathwayItem[];
  timeline: TimelineEvent[];
  officerDecision?: string;
  officerNote?: string;
}

export interface AnalysisResponse {
  text: string;
  language: SupportedLanguage;
  indicators: Indicator[];
  immediateSafety: boolean;
  svi: number;
  band: 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';
  bandColor: string;
  confidence: number;
  confidenceLabel: string;
  speechMetrics: AudioMeta;
  mismatch: SpeechMismatch;
  suggestedNextQuestion: string;
  nextQuestionRationale?: string;
  avoidRepetitionWarning?: string;
  supportPathways: SupportPathwayItem[];
  disclaimer: string;
}
