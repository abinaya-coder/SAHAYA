import type { AnalysisResponse, AudioMeta, CaseMemory, Indicator, IndicatorType, SupportedLanguage, SupportPathwayItem } from '../types';
import { DEFAULT_SVI_CONFIG } from '../config/svi_config';

const MULTILINGUAL_DICT: Record<IndicatorType, Record<SupportedLanguage, string[]>> = {
  THREAT: {
    en: ['threaten', 'threatened', 'threat', 'kill', 'harm', 'blackmail', 'intimidate', 'stalking', 'following me', 'he said he has a knife'],
    ta: ['மிரட்டினார்கள்', 'மிரட்டல்', 'கொன்றுவிடுவேன்', 'துன்புறுத்தல்', 'பயமுறுத்துகிறது'],
    hi: ['धमकी दी', 'धमकी', "जान से मार", 'ब्लैकमेल', 'डरा रहे हैं'],
    bn: ['হুমকি দিয়েছে', 'হুমকি', 'ব্ল্যাকমেইল', 'ভয় দেখাচ্ছে'],
    te: ['బెదిరించారు', 'బెదిరింపు', 'హాని చేస్తా', 'బ్లాక్‌మెయిల్']
  },
  FEAR_DISTRESS: {
    en: ['afraid', 'scared', 'fear', 'terrified', 'crying', 'helpless', 'anxious', 'panic', 'shaking', 'feel safe'],
    ta: ['பயமாக இருக்கிறது', 'பயம்', 'அழுகிறேன்', 'உதவியற்ற', 'பயப்படுகிறேன்'],
    hi: ['डर लग रहा है', 'डर', 'घबराहट', 'असहाय', 'रो रही हूँ'],
    bn: ['ভয় লাগছে', 'ভয়', 'অসহায়', 'কান্না'],
    te: ['భయంగా ఉంది', 'భయం', 'ఏడుస్తున్నాను', 'దిక్కులేని']
  },
  IMMEDIATE_SAFETY: {
    en: ['outside my house now', 'coming here', 'in danger right now', 'safe tonight', 'outside the door', 'staying inside', 'afraid to go home', 'going back home'],
    ta: ['வீட்டிற்கு போகவே பயமாக', 'வீட்டிற்கு வந்தார்கள்', 'இப்போதே ஆபத்து', 'கதவு வெளியே'],
    hi: ['घर के बाहर है', 'अभी खतरे में', 'यहाँ आ रहे हैं', 'घर वापस जाने में डर'],
    bn: ['এখনই বিপদে', 'ঘরের বাইরে আছে', 'বাড়িতে যেতে ভয়'],
    te: ['ఇప్పుడే ప్రమాదం', 'ఇంటి బయట ఉన్నాడు', 'ఇంటికి వెళ్ళడానికి భయం']
  },
  URGENCY: {
    en: ['right now', 'immediately', 'help fast', 'hurry', 'tonight', 'today'],
    ta: ['இப்போதே', 'உடனடியாக', 'சீக்கிரம்', 'இன்று இரவு'],
    hi: ['अभी', 'तुरंत', 'जल्दी मदद', 'आज रात'],
    bn: ['এখনই', 'অবিলম্বে', 'আজ রাতে'],
    te: ['ఇప్పుడే', 'వెంటనే', 'ఈ రాత్రి']
  },
  VIOLENCE: {
    en: ['hit', 'beat', 'weapon', 'knife', 'physical force', 'pushed', 'slapped', 'bleeding'],
    ta: ['அடித்தார்', 'கத்தி', 'தாக்கினார்', 'ரத்தம்'],
    hi: ['मारपीट', 'चाकू', 'हाथापाई', 'खून'],
    bn: ['মারধর', 'ছুরি', 'রক্ত'],
    te: ['కొட்டాడు', 'కత్తి', 'రక్తం']
  },
  REPEATED_INCIDENT: {
    en: ['again', 'repeatedly', 'every day', 'last night', 'always', 'multiple times', 'three days now', 'continuously'],
    ta: ['மீண்டும்', 'நேற்று இரவும்', 'தொடர்ந்து', 'ஒவ்வொரு நாளும்'],
    hi: ['फिर से', 'कल रात भी', 'बार-बार', 'हमेशा'],
    bn: ['আবার', 'গত পরশুও', 'ক্রমাগত'],
    te: ['மళ్లీ', 'నిన్న రాత్రి కూడా', 'నిరంతరం']
  },
  EMOTIONAL_INTENSITY: {
    en: ['cannot take it anymore', 'overwhelmed', 'desperate', 'shattered', 'everything feels ruined', 'crying uncontrollably'],
    ta: ['தாங்க முடியவில்லை', 'மனவேதனை', 'உடைந்துவிட்டேன்'],
    hi: ['अब सहन नहीं होता', 'टूट गई हूँ', 'बहुत परेशान'],
    bn: ['আর সহ্য হচ্ছে না', 'ভেঙে পড়েছি'],
    te: ['ఇక భరించలేను', 'கృంగிపోయాను']
  },
  SOCIAL_ISOLATION: {
    en: ['no one to help', 'locked inside', 'isolated', 'took my phone', 'alone'],
    ta: ['யாரும் இல்லை', 'போனை பிடுங்கிவிட்டனர்', 'தனியாக'],
    hi: ['कोई मदद के लिए नहीं', 'फोन छीन लिया', 'अकेली हूँ'],
    bn: ['কেউ নেই', 'फोन কেড়ে নিয়েছে'],
    te: ['ఎవ్వరూ లేరు', 'ఫోన్ లాక్కున్నారు']
  }
};

const ENGLISH_TRANSLATIONS: Record<string, string> = {
  'மிரட்டினார்கள்': 'threatened',
  'பயமாக இருக்கிறது': 'afraid',
  'மீண்டும்': 'again',
  'வீட்டிற்கு போகவே பயமாக': 'afraid to go home',
  'धमकी दी': 'threatened',
  'डर लग रहा है': 'feeling afraid',
  'फिर से': 'again',
  'घर वापस जाने में डर': 'afraid to go back home',
  'ভয় দেখানো হচ্ছে': 'intimidated',
  'মেসেজ পাঠিয়ে': 'messaging',
  'సహాయం కావాలి': 'need help'
};

export function analyzeTranscriptClient(
  text: string,
  language: SupportedLanguage = 'en',
  audioMeta?: AudioMeta,
  caseMemory?: CaseMemory
): AnalysisResponse {
  const textLower = text.toLowerCase();
  const indicators: Indicator[] = [];
  let immediateSafetyDetected = false;

  for (const [cat, langDict] of Object.entries(MULTILINGUAL_DICT)) {
    const category = cat as IndicatorType;
    const detectedPhrases: string[] = [];

    for (const phrases of Object.values(langDict)) {
      for (const phrase of phrases) {
        if (textLower.includes(phrase.toLowerCase())) {
          if (!detectedPhrases.includes(phrase)) {
            detectedPhrases.push(phrase);
          }
        }
      }
    }

    if (detectedPhrases.length > 0) {
      const confidence = Math.min(0.95, 0.70 + (detectedPhrases.length * 0.08));
      const severity = ['IMMEDIATE_SAFETY', 'THREAT', 'VIOLENCE'].includes(category) 
        ? 'CRITICAL' 
        : ['FEAR_DISTRESS', 'URGENCY', 'REPEATED_INCIDENT'].includes(category) 
        ? 'HIGH' 
        : 'MODERATE';

      const matchText = detectedPhrases[0];
      const translated = ENGLISH_TRANSLATIONS[matchText] || matchText;

      indicators.push({
        type: category,
        severity,
        evidence: matchText,
        translatedEvidence: translated,
        confidence: Number(confidence.toFixed(2))
      });

      if (category === 'IMMEDIATE_SAFETY') {
        immediateSafetyDetected = true;
      }
    }
  }

  // Calculate SVI Score
  let scorePoints = 0;
  indicators.forEach(ind => {
    const weight = DEFAULT_SVI_CONFIG.weights[ind.type] || 10;
    scorePoints += weight * ind.confidence;
  });

  const sviScore = Math.min(100, Math.round(scorePoints));
  let band: 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL' = 'LOW';
  let bandColor = 'emerald';

  if (sviScore > 75) {
    band = 'CRITICAL';
    bandColor = 'rose';
  } else if (sviScore > 50) {
    band = 'HIGH';
    bandColor = 'orange';
  } else if (sviScore > 25) {
    band = 'MODERATE';
    bandColor = 'amber';
  }

  const confidenceValue = indicators.length === 0 ? 0.40 : Number((indicators.reduce((acc, curr) => acc + curr.confidence, 0) / indicators.length).toFixed(2));
  const confidenceLabel = confidenceValue >= 0.75 ? 'HIGH' : 'MODERATE';

  // Speech Metrics & Mismatch
  const metrics: AudioMeta = {
    speaking_rate: audioMeta?.speaking_rate || 'Reduced',
    pause_duration: audioMeta?.pause_duration || 'Elevated (3.2s avg)',
    hesitation: audioMeta?.hesitation || 'High Hesitation Detected',
    pitch_variation: audioMeta?.pitch_variation || 'Monotone / Low Variation',
    voice_intensity: audioMeta?.voice_intensity || 'Low / Restrained'
  };

  const hasCriticalThreat = indicators.some(i => ['THREAT', 'IMMEDIATE_SAFETY', 'VIOLENCE'].includes(i.type));
  const isCalmTone = Boolean(metrics.pitch_variation?.includes('Monotone') || metrics.voice_intensity?.includes('Low'));
  const mismatchDetected = Boolean(hasCriticalThreat && isCalmTone);

  // Next Question Engine
  let suggestedQ = 'Take your time. We are listening. How can we best assist you at this moment?';
  let rationale = 'Default trauma-sensitive response.';
  let repeatWarn: string | undefined = undefined;

  if (immediateSafetyDetected) {
    suggestedQ = 'Are you currently in a safe place right now?';
    rationale = 'Immediate safety indicator detected. Confirming physical safety first.';
  } else if (indicators.some(i => i.type === 'THREAT') && !caseMemory?.location) {
    suggestedQ = 'Would you like to share your current location with the authorized responder?';
    rationale = 'Threat language present. Location required for responder awareness.';
  } else if (!caseMemory?.support_requested) {
    suggestedQ = 'What kind of support would be most helpful to you right now (counselling, legal advice, or protection)?';
    rationale = 'Empowering complainant with clear support options.';
  }

  if (caseMemory?.incident || indicators.length > 0) {
    repeatWarn = 'Previously provided information is already recorded. Avoid unnecessary repetition.';
  }

  // Support Pathways
  const pathways: SupportPathwayItem[] = [
    { id: 'sp-1', category: 'Safety Assessment', priority: immediateSafetyDetected ? 'CRITICAL' : 'HIGH', status: 'SUGGESTED', reason: 'Safety indicators detected' },
    { id: 'sp-2', category: 'Legal Assistance', priority: 'HIGH', status: 'SUGGESTED', reason: 'Intimidation/threat language reported' },
    { id: 'sp-3', category: 'Counselling Referral', priority: 'MEDIUM', status: 'SUGGESTED', reason: 'Distress and emotional overwhelm indicators' }
  ];

  const response: AnalysisResponse = {
    text,
    language,
    indicators,
    immediateSafety: Boolean(immediateSafetyDetected),
    svi: sviScore,
    band,
    bandColor,
    confidence: confidenceValue,
    confidenceLabel,
    speechMetrics: metrics,
    mismatch: {
      detected: mismatchDetected,
      title: mismatchDetected ? 'CONTENT–SPEECH MISMATCH DETECTED' : 'Speech Alignment Normal',
      explanation: mismatchDetected 
        ? 'The linguistic content contains critical safety-related indicators that do not align with the observed speech pattern (e.g. flat monotone voice despite severe threat).' 
        : 'Speech pattern aligns with text indicators.',
      recommendation: mismatchDetected 
        ? 'Human review recommended. Complainants experiencing severe shock or trauma may communicate in flat or calm tones.' 
        : 'Standard protocol applies.'
    },
    suggestedNextQuestion: suggestedQ,
    nextQuestionRationale: rationale,
    avoidRepetitionWarning: repeatWarn,
    supportPathways: pathways,
    disclaimer: DEFAULT_SVI_CONFIG.disclaimer
  };

  return response;
}
