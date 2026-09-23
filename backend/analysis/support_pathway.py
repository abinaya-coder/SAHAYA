"""
SAHAYA Support Pathway Recommendation Engine
Recommends multi-disciplinary support pathways for officer consideration.
"""

from typing import Dict, List, Any

def recommend_support_pathways(indicators: List[Dict[str, Any]], svi_score: int) -> List[Dict[str, Any]]:
    ind_types = {i["type"] for i in indicators}
    recommendations = []

    # Safety Assessment
    if "IMMEDIATE_SAFETY" in ind_types or "THREAT" in ind_types or svi_score >= 60:
        recommendations.append({
            "id": "pathway-safety",
            "category": "Safety Assessment",
            "priority": "HIGH",
            "reason": "Immediate safety or threat indicators detected in complainant statement.",
            "status": "SUGGESTED", # SUGGESTED | CONSIDERED | DISMISSED | CONFIRMED
            "icon": "ShieldAlert"
        })

    # Counselling Referral
    if "FEAR_DISTRESS" in ind_types or "EMOTIONAL_INTENSITY" in ind_types or svi_score >= 40:
        recommendations.append({
            "id": "pathway-counselling",
            "category": "Counselling Referral",
            "priority": "HIGH" if "EMOTIONAL_INTENSITY" in ind_types else "MEDIUM",
            "reason": "Linguistic indicators of fear, distress, or emotional overwhelm identified.",
            "status": "SUGGESTED",
            "icon": "HeartHandshake"
        })

    # Legal Assistance
    if "THREAT" in ind_types or "REPEATED_INCIDENT" in ind_types or "VIOLENCE" in ind_types:
        recommendations.append({
            "id": "pathway-legal",
            "category": "Legal Assistance",
            "priority": "HIGH",
            "reason": "Intimidation, repeated harassment, or violent threat reported.",
            "status": "SUGGESTED",
            "icon": "Scale"
        })

    # Protection-Related Support
    if "VIOLENCE" in ind_types or "SOCIAL_ISOLATION" in ind_types or svi_score >= 75:
        recommendations.append({
            "id": "pathway-protection",
            "category": "Protection Support",
            "priority": "CRITICAL",
            "reason": "High vulnerability, physical force threat, or isolation language detected.",
            "status": "SUGGESTED",
            "icon": "UserCheck"
        })

    # Follow-up Contact
    recommendations.append({
        "id": "pathway-followup",
        "category": "Scheduled Follow-up",
        "priority": "MEDIUM",
        "reason": "Mandatory 24-hour trauma-informed welfare check-in.",
        "status": "SUGGESTED",
        "icon": "CalendarCheck"
    })

    return recommendations
