"""
SAHAYA Trauma-Aware Next Question Engine
Suggests the single least-traumatizing question for the human responder to ask next.
Guarantees victim is never asked to unnecessarily repeat traumatic details.
"""

from typing import Dict, List, Any

def suggest_next_question(analysis: Dict[str, Any], case_memory: Dict[str, Any]) -> Dict[str, Any]:
    indicators = analysis.get("indicators", [])
    ind_types = {i["type"] for i in indicators}

    has_location = bool(case_memory.get("location"))
    has_safety_info = "IMMEDIATE_SAFETY" in ind_types or bool(case_memory.get("current_safety"))
    has_support_info = bool(case_memory.get("support_requested"))
    has_incident_info = bool(case_memory.get("incident"))

    # Priority 1: Check Immediate Physical Safety
    if "IMMEDIATE_SAFETY" in ind_types or not has_safety_info:
        question = "Are you currently in a safe place right now?"
        rationale = "Immediate physical safety is unconfirmed. Prioritizing safety assessment before details."
    # Priority 2: Location if high threat/safety issue
    elif ("THREAT" in ind_types or "VIOLENCE" in ind_types) and not has_location:
        question = "Would you like to share your current location with the authorized responder?"
        rationale = "Threat/violence language present. Location needed for potential dispatch if requested."
    # Priority 3: Support preference
    elif not has_support_info:
        question = "What kind of support would be most helpful to you right now (counselling, legal advice, or protection)?"
        rationale = "Empowering complainant by offering support options without probing incident trauma."
    else:
        question = "Take your time. We have recorded your statement. Is there anything else you would like us to know?"
        rationale = "Incident context already captured. Avoiding repeated questioning."

    repeat_warning = None
    if has_incident_info:
        repeat_warning = "Previously provided information is already recorded. Avoid unnecessary repetition of traumatic events."

    return {
        "suggestedQuestion": question,
        "rationale": rationale,
        "avoidRepetitionWarning": repeat_warning,
        "isSafetyQuestion": "IMMEDIATE_SAFETY" in ind_types or not has_safety_info
    }
