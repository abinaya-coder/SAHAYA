"""
SAHAYA Multilingual NLP Analysis Engine
Supports English, Tamil, Hindi, Bengali, Telugu keyword & phrase extraction.
"""

from typing import Dict, List, Any
import re

MULTILINGUAL_DICTIONARY = {
    "THREAT": {
        "en": ["threaten", "threatened", "threat", "kill", "harm", "blackmail", "intimidate", "stalking", "follow me"],
        "ta": ["மிரட்டினார்கள்", "மிரட்டல்", "கொன்றுவிடுவேன்", "துன்புறுத்தல்", "பயமுறுத்துகிறது"],
        "hi": ["धमकी दी", "धमकी", "जान से मार", "ब्लैकमेल", "डरा रहे हैं"],
        "bn": ["হুমকি দিয়েছে", "হুমকি", "ব্ল্যাকমেইল", "ভয় দেখাচ্ছে"],
        "te": ["బెదిరించారు", "బెదిరింపు", "హాని చేస్తా", "బ్లాక్‌మెయిల్"]
    },
    "FEAR_DISTRESS": {
        "en": ["afraid", "scared", "fear", "terrified", "crying", "helpless", "anxious", "panic", "shaking"],
        "ta": ["பயமாக இருக்கிறது", "பயம்", "அழுகிறேன்", "உதவியற்ற", "பயப்படுகிறேன்"],
        "hi": ["डर लग रहा है", "डर", "घबराहट", "असहाय", "रो रही हूँ"],
        "bn": ["ভয় লাগছে", "ভয়", "অসহায়", "কান্না"],
        "te": ["భయంగా ఉంది", "భయం", "ఏడుస్తున్నాను", "దిక్కులేని"]
    },
    "IMMEDIATE_SAFETY": {
        "en": ["outside my house now", "coming here", "in danger right now", "safe tonight", "outside the door", "following me right now"],
        "ta": ["வீட்டிற்கு போகவே பயமாக", "வீட்டிற்கு வந்தார்கள்", "இப்போதே ஆபத்து", "கதவு வெளியே"],
        "hi": ["घर के बाहर है", "अभी खतरे में", "यहाँ आ रहे हैं", "घर वापस जाने में डर"],
        "bn": ["এখনই বিপদে", "ঘরের বাইরে আছে", "বাড়িতে যেতে ভয়"],
        "te": ["ఇప్పుడే ప్రమాదం", "ఇంటి బయట ఉన్నాడు", "ఇంటికి వెళ్ళడానికి భయం"]
    },
    "URGENCY": {
        "en": ["right now", "immediately", "help fast", "hurry", "tonight", "today"],
        "ta": ["இப்போதே", "உடனடியாக", "சீக்கிரம்", "இன்று இரவு"],
        "hi": ["अभी", "तुरंत", "जल्दी मदद", "आज रात"],
        "bn": ["এখনই", "অবিলম্বে", "আজ রাতে"],
        "te": ["ఇప్పుడే", "వెంటనే", "ఈ రాత్రి"]
    },
    "VIOLENCE": {
        "en": ["hit", "beat", "weapon", "knife", "physical force", "pushed", "slapped", "bleeding"],
        "ta": ["அடித்தார்", "கத்தி", "தாக்கினார்", "ரத்தம்"],
        "hi": ["मारपीट", "चाकू", "हाथापाई", "खून"],
        "bn": ["মারধর", "ছুরি", "রক্ত"],
        "te": ["కొట్టాడు", "కత్తి", "రక్తం"]
    },
    "REPEATED_INCIDENT": {
        "en": ["again", "repeatedly", "every day", "last night", "always", "multiple times", "continuously"],
        "ta": ["மீண்டும்", "நேற்று இரவும்", "தொடர்ந்து", "ஒவ்வொரு நாளும்"],
        "hi": ["फिर से", "कल रात भी", "बार-बार", "हमेशा"],
        "bn": ["আবার", "গত পরশুও", "ক্রমাগত"],
        "te": ["మళ్లీ", "నిన్న రాత్రి కూడా", "నిరంతరం"]
    },
    "EMOTIONAL_INTENSITY": {
        "en": ["cannot take it anymore", "overwhelmed", "desperate", "shattered", "broken"],
        "ta": ["தாங்க முடியவில்லை", "மனவேதனை", "உடைந்துவிட்டேன்"],
        "hi": ["अब सहन नहीं होता", "टूट गई हूँ", "बहुत परेशान"],
        "bn": ["আর সহ্য হচ্ছে না", "ভেঙে পড়েছি"],
        "te": ["ఇక భరించలేను", "కృంగిపోయాను"]
    },
    "SOCIAL_ISOLATION": {
        "en": ["no one to help", "locked inside", "isolated", "took my phone", "alone"],
        "ta": ["யாரும் இல்லை", "போனை பிடுங்கிவிட்டனர்", "தனியாக"],
        "hi": ["कोई मदद के लिए नहीं", "फोन छीन लिया", "अकेली हूँ"],
        "bn": ["কেউ নেই", "ফোন কেড়ে নিয়েছে"],
        "te": ["ఎవ్వరూ లేరు", "ఫోన్ లాక్కున్నారు"]
    }
}

def analyze_transcript(text: str, language: str = "en") -> Dict[str, Any]:
    """
    Analyzes text transcript and returns extracted indicators, detected phrases,
    severity levels, confidence, and timestamps.
    """
    text_lower = text.lower()
    indicators = []
    immediate_safety_detected = False

    for category, lang_dict in MULTILINGUAL_DICTIONARY.items():
        # Check all languages in case of code-switching
        detected_phrases = []
        for lang_code, phrases in lang_dict.items():
            for phrase in phrases:
                if phrase.lower() in text_lower:
                    detected_phrases.append(phrase)

        if detected_phrases:
            confidence = min(0.95, 0.70 + (len(detected_phrases) * 0.08))
            severity = "CRITICAL" if category in ["IMMEDIATE_SAFETY", "THREAT", "VIOLENCE"] else "HIGH" if category in ["FEAR_DISTRESS", "URGENCY", "REPEATED_INCIDENT"] else "MODERATE"
            
            indicators.append({
                "type": category,
                "severity": severity,
                "evidence": detected_phrases[0],
                "allPhrases": detected_phrases,
                "confidence": round(confidence, 2)
            })

            if category == "IMMEDIATE_SAFETY":
                immediate_safety_detected = True

    return {
        "indicators": indicators,
        "immediateSafety": immediate_safety_detected,
        "rawText": text,
        "language": language
    }
