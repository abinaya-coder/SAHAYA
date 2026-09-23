import type { CaseData } from '../types';

export const DEMO_CASES_CLIENT: CaseData[] = [
  {
    id: 'NHAA-10482',
    title: 'Intimidation & Stalking Complaint (Judge Demo Case)',
    complainantName: 'Anonymous / Protected Complainant #82',
    language: 'ta',
    languageName: 'Tamil',
    timestamp: '2026-09-23T10:02:00Z',
    originalText: 'அவர்கள் என்னை மீண்டும் மிரட்டினார்கள். எனக்கு வீட்டிற்கு போகவே பயமாக இருக்கிறது. நேற்று இரவும் அவர்கள் வீட்டிற்கு வந்தார்கள்.',
    translatedText: 'They threatened me again. I am afraid to go home. They came to the house again last night.',
    svi: 84,
    band: 'HIGH',
    bandColor: 'orange',
    confidence: 0.82,
    immediateSafety: true,
    distressStatus: 'HIGH',
    threatStatus: 'HIGH',
    caseStatus: 'Active',
    humanReviewStatus: 'Pending Review',
    assignedOfficer: 'Inspector S. Raman (NHAA-Chennai)',
    audioMeta: {
      speaking_rate: 'Reduced',
      pause_duration: 'Elevated (3.2s avg)',
      hesitation: 'High Hesitation',
      pitch_variation: 'Monotone',
      voice_intensity: 'Low / Restrained'
    },
    indicators: [
      { type: 'THREAT', severity: 'HIGH', evidence: 'மிரட்டினார்கள்', translatedEvidence: 'threatened', confidence: 0.91 },
      { type: 'FEAR_DISTRESS', severity: 'HIGH', evidence: 'பயமாக இருக்கிறது', translatedEvidence: 'afraid', confidence: 0.88 },
      { type: 'REPEATED_INCIDENT', severity: 'HIGH', evidence: 'மீண்டும்', translatedEvidence: 'again', confidence: 0.95 },
      { type: 'IMMEDIATE_SAFETY', severity: 'CRITICAL', evidence: 'வீட்டிற்கு போகவே பயமாக', translatedEvidence: 'afraid to go home', confidence: 0.90 }
    ],
    evidenceList: [
      { text: 'மிரட்டினார்கள்', type: 'THREAT', label: 'Threat Indicator' },
      { text: 'பயமாக இருக்கிறது', type: 'FEAR_DISTRESS', label: 'Fear / Distress' },
      { text: 'மீண்டும்', type: 'REPEATED_INCIDENT', label: 'Repeated Incident' },
      { text: 'வீட்டிற்கு போகவே பயமாக', type: 'IMMEDIATE_SAFETY', label: 'Safety Concern' }
    ],
    caseMemory: {
      incident: 'Repeated threats and physical presence near home',
      threat: 'Reported intimidation by known perpetrators',
      people_involved: '2 individuals previously reported',
      location: 'Resides near Vadapalani, Chennai',
      time: 'Last night (22 Sep) & ongoing',
      previous_occurrence: 'Yes (Multiple prior threats)',
      current_safety: 'Unsafe at home',
      support_requested: 'Safety protection and legal assistance'
    },
    suggestedNextQuestion: 'Are you currently in a safe place right now?',
    supportPathways: [
      { id: 'sp-1', category: 'Safety Assessment', priority: 'HIGH', status: 'SUGGESTED' },
      { id: 'sp-2', category: 'Legal Assistance', priority: 'HIGH', status: 'SUGGESTED' },
      { id: 'sp-3', category: 'Counselling Referral', priority: 'MEDIUM', status: 'SUGGESTED' }
    ],
    timeline: [
      { timestamp: '10:02', event: 'Complaint initiated via NHAA 14566 Multilingual Voice Portal', actor: 'System' },
      { timestamp: '10:03', event: 'Linguistic Threat Indicator detected (\'மிரட்டினார்கள்\')', actor: 'AI Layer' },
      { timestamp: '10:04', event: 'Repeated Incident pattern identified (\'மீண்டும்\')', actor: 'AI Layer' },
      { timestamp: '10:05', event: '🚨 Immediate Safety Concern flagged (\'வீட்டிற்கு போகவே பயமாக\')', actor: 'AI Layer' },
      { timestamp: '10:06', event: 'Case routed to Authorized Officer Console for Priority Review', actor: 'System' }
    ]
  },
  {
    id: 'NHAA-10483',
    title: 'Severe Verbal Threat & Intimidation',
    complainantName: 'Anonymous / Protected Complainant #83',
    language: 'hi',
    languageName: 'Hindi',
    timestamp: '2026-09-23T10:15:00Z',
    originalText: 'उन्होंने मुझे फिर से धमकी दी। मुझे घर वापस जाने में डर लग रहा है।',
    translatedText: 'They threatened me again. I am afraid to go back home.',
    svi: 88,
    band: 'CRITICAL',
    bandColor: 'rose',
    confidence: 0.89,
    immediateSafety: true,
    distressStatus: 'CRITICAL',
    threatStatus: 'CRITICAL',
    caseStatus: 'Active',
    humanReviewStatus: 'Pending Review',
    assignedOfficer: 'Sub-Inspector K. Sharma (NHAA-Delhi)',
    audioMeta: {
      speaking_rate: 'Reduced',
      pause_duration: 'Elevated (4.1s avg)',
      hesitation: 'High Hesitation',
      pitch_variation: 'Monotone',
      voice_intensity: 'Low'
    },
    indicators: [
      { type: 'THREAT', severity: 'CRITICAL', evidence: 'धमकी दी', translatedEvidence: 'threatened', confidence: 0.94 },
      { type: 'FEAR_DISTRESS', severity: 'HIGH', evidence: 'डर लग रहा है', translatedEvidence: 'feeling afraid', confidence: 0.91 },
      { type: 'REPEATED_INCIDENT', severity: 'HIGH', evidence: 'फिर से', translatedEvidence: 'again', confidence: 0.96 },
      { type: 'IMMEDIATE_SAFETY', severity: 'CRITICAL', evidence: 'घर वापस जाने में डर', translatedEvidence: 'afraid to go back home', confidence: 0.93 }
    ],
    evidenceList: [
      { text: 'धमकी दी', type: 'THREAT', label: 'Threat Indicator' },
      { text: 'डर लग रहा है', type: 'FEAR_DISTRESS', label: 'Fear / Distress' },
      { text: 'फिर से', type: 'REPEATED_INCIDENT', label: 'Repeated Incident' }
    ],
    caseMemory: {
      incident: 'Direct threats upon returning home',
      threat: 'Verbal intimidation',
      people_involved: 'Neighbor / Known entity',
      location: 'Central Delhi',
      time: 'Today',
      previous_occurrence: 'Yes',
      current_safety: 'Unconfirmed',
      support_requested: 'Immediate Officer Contact'
    },
    suggestedNextQuestion: 'Are you currently in a safe place right now?',
    supportPathways: [
      { id: 'sp-1', category: 'Safety Assessment', priority: 'CRITICAL', status: 'SUGGESTED' },
      { id: 'sp-2', category: 'Protection Support', priority: 'HIGH', status: 'SUGGESTED' }
    ],
    timeline: [
      { timestamp: '10:15', event: 'Voice complaint registered in Hindi', actor: 'System' },
      { timestamp: '10:16', event: 'Critical threat & safety concern detected', actor: 'AI Layer' }
    ]
  },
  {
    id: 'NHAA-10484',
    title: 'Persistent Stalking & Harassment',
    complainantName: 'Anonymous / Protected Complainant #84',
    language: 'en',
    languageName: 'English',
    timestamp: '2026-09-23T11:00:00Z',
    originalText: 'They have been following me for three days now. I don\'t feel safe anywhere.',
    translatedText: 'They have been following me for three days now. I don\'t feel safe anywhere.',
    svi: 76,
    band: 'HIGH',
    bandColor: 'orange',
    confidence: 0.85,
    immediateSafety: true,
    distressStatus: 'HIGH',
    threatStatus: 'HIGH',
    caseStatus: 'Active',
    humanReviewStatus: 'Pending Review',
    assignedOfficer: 'Inspector R. Nair (NHAA-Bengaluru)',
    audioMeta: {
      speaking_rate: 'Normal',
      pause_duration: 'Normal',
      hesitation: 'Minimal',
      pitch_variation: 'Moderate',
      voice_intensity: 'Normal'
    },
    indicators: [
      { type: 'THREAT', severity: 'HIGH', evidence: 'following me', translatedEvidence: 'following me', confidence: 0.89 },
      { type: 'REPEATED_INCIDENT', severity: 'HIGH', evidence: 'three days now', translatedEvidence: 'three days now', confidence: 0.92 },
      { type: 'IMMEDIATE_SAFETY', severity: 'HIGH', evidence: 'don\'t feel safe anywhere', translatedEvidence: 'don\'t feel safe anywhere', confidence: 0.86 }
    ],
    evidenceList: [
      { text: 'following me', type: 'THREAT', label: 'Stalking Indicator' },
      { text: 'three days now', type: 'REPEATED_INCIDENT', label: 'Duration Indicator' }
    ],
    caseMemory: {
      incident: 'Physical stalking over 3 days',
      threat: 'Persistent tracking',
      people_involved: 'Unidentified individual in sedan',
      location: 'Indiranagar, Bengaluru',
      time: 'Past 72 hours',
      previous_occurrence: 'Yes (3 consecutive days)',
      current_safety: 'Vulnerable',
      support_requested: 'Legal action & CCTV check'
    },
    suggestedNextQuestion: 'Would you like to share your current location with the authorized responder?',
    supportPathways: [
      { id: 'sp-1', category: 'Legal Assistance', priority: 'HIGH', status: 'SUGGESTED' },
      { id: 'sp-2', category: 'Safety Assessment', priority: 'HIGH', status: 'SUGGESTED' }
    ],
    timeline: [
      { timestamp: '11:00', event: 'Web complaint submitted in English', actor: 'System' }
    ]
  },
  {
    id: 'NHAA-10485',
    title: 'Online Harassment & Cyber Blackmail',
    complainantName: 'Anonymous / Protected Complainant #85',
    language: 'bn',
    languageName: 'Bengali',
    timestamp: '2026-09-23T11:40:00Z',
    originalText: 'আমাকে সোশ্যাল মিডিয়ায় মেসেজ পাঠিয়ে ভয় দেখানো হচ্ছে।',
    translatedText: 'I am being intimidated with messages on social media.',
    svi: 58,
    band: 'MODERATE',
    bandColor: 'amber',
    confidence: 0.80,
    immediateSafety: false,
    distressStatus: 'MODERATE',
    threatStatus: 'MODERATE',
    caseStatus: 'Under Review',
    humanReviewStatus: 'Reviewed',
    assignedOfficer: 'Officer A. Das (NHAA-Kolkata)',
    audioMeta: {
      speaking_rate: 'Normal',
      pause_duration: 'Normal',
      hesitation: 'Moderate',
      pitch_variation: 'Moderate',
      voice_intensity: 'Normal'
    },
    indicators: [
      { type: 'THREAT', severity: 'MODERATE', evidence: 'ভয় দেখানো হচ্ছে', translatedEvidence: 'being intimidated', confidence: 0.82 },
      { type: 'FEAR_DISTRESS', severity: 'MODERATE', evidence: 'মেসেজ পাঠিয়ে', translatedEvidence: 'sending messages', confidence: 0.75 }
    ],
    evidenceList: [
      { text: 'ভয় দেখানো হচ্ছে', type: 'THREAT', label: 'Cyber Intimidation' }
    ],
    caseMemory: {
      incident: 'Digital harassment via messaging apps',
      threat: 'Social media blackmail',
      people_involved: 'Anonymous handle',
      location: 'Kolkata',
      time: 'Ongoing online',
      previous_occurrence: 'Yes',
      current_safety: 'Physically safe',
      support_requested: 'Cyber cell escalation'
    },
    suggestedNextQuestion: 'What kind of support would be most helpful to you right now (counselling or cyber legal guidance)?',
    supportPathways: [
      { id: 'sp-1', category: 'Legal Assistance', priority: 'MEDIUM', status: 'CONFIRMED' },
      { id: 'sp-2', category: 'Counselling Referral', priority: 'MEDIUM', status: 'SUGGESTED' }
    ],
    timeline: [
      { timestamp: '11:40', event: 'Cyber harassment report logged', actor: 'System' },
      { timestamp: '11:45', event: 'Officer Das confirmed cyber legal pathway', actor: 'Human Officer' }
    ]
  },
  {
    id: 'NHAA-10486',
    title: 'Low Confidence Query / Vague Statement',
    complainantName: 'Anonymous / Protected Complainant #86',
    language: 'te',
    languageName: 'Telugu',
    timestamp: '2026-09-23T12:10:00Z',
    originalText: 'నాకు కొంత సహాయం కావాలి, కానీ వివరాలు చెప్పలేను.',
    translatedText: 'I need some help, but I cannot share details.',
    svi: 35,
    band: 'LOW',
    bandColor: 'emerald',
    confidence: 0.45,
    immediateSafety: false,
    distressStatus: 'LOW',
    threatStatus: 'LOW',
    caseStatus: 'Pending',
    humanReviewStatus: 'Pending Review',
    assignedOfficer: 'Officer M. Rao (NHAA-Hyderabad)',
    audioMeta: {
      speaking_rate: 'Slow',
      pause_duration: 'Long',
      hesitation: 'High',
      pitch_variation: 'Low',
      voice_intensity: 'Quiet'
    },
    indicators: [
      { type: 'FEAR_DISTRESS', severity: 'LOW', evidence: 'సహాయం కావాలి', translatedEvidence: 'need help', confidence: 0.50 }
    ],
    evidenceList: [
      { text: 'సహాయం కావాలి', type: 'FEAR_DISTRESS', label: 'Help Request' }
    ],
    caseMemory: {
      incident: 'Unspecified request for assistance',
      threat: 'Unknown',
      people_involved: 'Unspecified',
      location: 'Hyderabad',
      time: 'Today',
      previous_occurrence: 'Unknown',
      current_safety: 'Unconfirmed',
      support_requested: 'Initial contact'
    },
    suggestedNextQuestion: 'Take your time. We are listening. How can we best assist you at this moment?',
    supportPathways: [
      { id: 'sp-1', category: 'Counselling Referral', priority: 'LOW', status: 'SUGGESTED' }
    ],
    timeline: [
      { timestamp: '12:10', event: 'Vague statement registered. Confidence rated LOW.', actor: 'AI Layer' }
    ]
  },
  {
    id: 'NHAA-10487',
    title: 'Calm Monotone Speech + Serious Threat (Incongruence Case)',
    complainantName: 'Anonymous / Protected Complainant #87',
    language: 'en',
    languageName: 'English',
    timestamp: '2026-09-23T12:45:00Z',
    originalText: 'He said he has a knife outside. I am staying inside.',
    translatedText: 'He said he has a knife outside. I am staying inside.',
    svi: 90,
    band: 'CRITICAL',
    bandColor: 'rose',
    confidence: 0.92,
    immediateSafety: true,
    distressStatus: 'LOW (Speech Tone) / CRITICAL (Linguistic)',
    threatStatus: 'CRITICAL',
    caseStatus: 'Active',
    humanReviewStatus: 'Pending Review',
    assignedOfficer: 'Inspector S. Raman (NHAA-Chennai)',
    audioMeta: {
      speaking_rate: 'Normal',
      pause_duration: 'Normal',
      hesitation: 'Minimal',
      pitch_variation: 'Monotone / Low Variation',
      voice_intensity: 'Calm / Flat'
    },
    indicators: [
      { type: 'VIOLENCE', severity: 'CRITICAL', evidence: 'knife outside', translatedEvidence: 'knife outside', confidence: 0.96 },
      { type: 'THREAT', severity: 'CRITICAL', evidence: 'He said he has a knife', translatedEvidence: 'He said he has a knife', confidence: 0.94 },
      { type: 'IMMEDIATE_SAFETY', severity: 'CRITICAL', evidence: 'outside. I am staying inside', translatedEvidence: 'outside', confidence: 0.92 }
    ],
    evidenceList: [
      { text: 'knife outside', type: 'VIOLENCE', label: 'Weapon Threat' },
      { text: 'staying inside', type: 'IMMEDIATE_SAFETY', label: 'Safety Lock-In' }
    ],
    caseMemory: {
      incident: 'Armed threat outside residence',
      threat: 'Individual with knife outside premises',
      people_involved: 'Ex-partner / Known perpetrator',
      location: 'Chennai',
      time: 'Current moment',
      previous_occurrence: 'Yes',
      current_safety: '🚨 IMMEDIATE PHYSICAL DANGER',
      support_requested: 'Emergency protection'
    },
    suggestedNextQuestion: 'Are you currently behind a locked door in a secure room?',
    supportPathways: [
      { id: 'sp-1', category: 'Safety Assessment', priority: 'CRITICAL', status: 'SUGGESTED' },
      { id: 'sp-2', category: 'Protection Support', priority: 'CRITICAL', status: 'SUGGESTED' }
    ],
    timeline: [
      { timestamp: '12:45', event: 'Voice statement received with flat tone', actor: 'System' },
      { timestamp: '12:46', event: 'CONTENT–SPEECH MISMATCH DETECTED: Flat tone vs Knife threat', actor: 'AI Layer' }
    ]
  },
  {
    id: 'NHAA-10488',
    title: 'High Emotional Overwhelm (Academic / Non-Physical)',
    complainantName: 'Anonymous / Protected Complainant #88',
    language: 'en',
    languageName: 'English',
    timestamp: '2026-09-23T13:00:00Z',
    originalText: 'I failed my final exam and everything feels ruined. I am crying uncontrollably.',
    translatedText: 'I failed my final exam and everything feels ruined. I am crying uncontrollably.',
    svi: 42,
    band: 'MODERATE',
    bandColor: 'amber',
    confidence: 0.88,
    immediateSafety: false,
    distressStatus: 'HIGH (Emotional)',
    threatStatus: 'LOW (No Physical Danger)',
    caseStatus: 'Active',
    humanReviewStatus: 'Pending Review',
    assignedOfficer: 'Counsellor P. Menon (NHAA)',
    audioMeta: {
      speaking_rate: 'Rapid',
      pause_duration: 'Erratic',
      hesitation: 'High',
      pitch_variation: 'High Pitch / Crying',
      voice_intensity: 'Elevated'
    },
    indicators: [
      { type: 'FEAR_DISTRESS', severity: 'HIGH', evidence: 'crying uncontrollably', translatedEvidence: 'crying uncontrollably', confidence: 0.90 },
      { type: 'EMOTIONAL_INTENSITY', severity: 'HIGH', evidence: 'everything feels ruined', translatedEvidence: 'everything feels ruined', confidence: 0.88 }
    ],
    evidenceList: [
      { text: 'crying uncontrollably', type: 'FEAR_DISTRESS', label: 'Emotional Distress' }
    ],
    caseMemory: {
      incident: 'Academic crisis distress call',
      threat: 'None physical',
      people_involved: 'Self',
      location: 'Hostel campus',
      time: 'Today',
      previous_occurrence: 'No',
      current_safety: 'Physically safe',
      support_requested: 'Emotional counseling & student guidance'
    },
    suggestedNextQuestion: 'Would you like to speak with a supportive student counsellor right now?',
    supportPathways: [
      { id: 'sp-1', category: 'Counselling Referral', priority: 'HIGH', status: 'SUGGESTED' }
    ],
    timeline: [
      { timestamp: '13:00', event: 'High emotional distress logged with zero physical danger indicators', actor: 'AI Layer' }
    ]
  }
];
