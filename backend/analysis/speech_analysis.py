"""
SAHAYA Speech & Acoustic Feature Analysis Module
Analyzes non-clinical speech indicators and content-speech incongruence.
"""

from typing import Dict, List, Any

def analyze_speech_indicators(transcript: str, indicators: List[Dict[str, Any]], audio_meta: Dict[str, Any] = None) -> Dict[str, Any]:
    """
    Derives non-clinical speech indicators and detects content-speech incongruence.
    """
    audio_meta = audio_meta or {}
    
    # Non-clinical acoustic indicators (simulated from audio or session meta)
    speaking_rate = audio_meta.get("speaking_rate", "Reduced")
    pause_duration = audio_meta.get("pause_duration", "Elevated")
    hesitation = audio_meta.get("hesitation", "High Hesitation Detected")
    pitch_variation = audio_meta.get("pitch_variation", "Monotone / Low Variation")
    voice_intensity = audio_meta.get("voice_intensity", "Low / Restrained")

    # Content vs Speech Mismatch Detection Logic
    # Example: Severe threat or physical danger in text, but monotone/calm audio profile
    has_high_threat = any(i["type"] in ["THREAT", "IMMEDIATE_SAFETY", "VIOLENCE"] for i in indicators)
    is_calm_voice = pitch_variation in ["Monotone / Low Variation", "Flat"] or voice_intensity in ["Low / Restrained", "Calm"]

    mismatch_detected = has_high_threat and is_calm_voice

    return {
        "metrics": {
            "speakingRate": speaking_rate,
            "pauseDuration": pause_duration,
            "hesitation": hesitation,
            "pitchVariation": pitch_variation,
            "voiceIntensity": voice_intensity
        },
        "mismatch": {
            "detected": mismatch_detected,
            "title": "CONTENT–SPEECH MISMATCH DETECTED" if mismatch_detected else "Speech Alignment Normal",
            "explanation": "The linguistic content contains critical safety-related indicators that do not align with the observed speech pattern (e.g. calm tone despite severe threat content)." if mismatch_detected else "Speech acoustic pattern aligns with linguistic indicators.",
            "recommendation": "Human review recommended. Complainants experiencing severe shock or trauma may communicate in flat or calm tones." if mismatch_detected else "Standard protocol applies."
        },
        "disclaimer": "These are non-clinical speech indicators derived from acoustic features and require human interpretation."
    }
