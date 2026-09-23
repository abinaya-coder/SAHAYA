"""
SAHAYA Database & Case Repository Manager
In-memory database store initialized with 8 synthetic demo cases.
"""

from typing import List, Dict, Any, Optional
from cases.demo_cases import DEMO_CASES
import copy

class CaseRepository:
    def __init__(self):
        self._cases: Dict[str, Dict[str, Any]] = {c["id"]: copy.deepcopy(c) for c in DEMO_CASES}

    def get_all_cases(self) -> List[Dict[str, Any]]:
        return list(self._cases.values())

    def get_case(self, case_id: str) -> Optional[Dict[str, Any]]:
        return self._cases.get(case_id)

    def update_human_review(self, case_id: str, status: str, action: str, note: Optional[str], officer_name: str) -> Optional[Dict[str, Any]]:
        case = self._cases.get(case_id)
        if not case:
            return None
        
        case["humanReviewStatus"] = status
        case["officerDecision"] = action
        case["officerNote"] = note

        # Add event to timeline
        event = f"Human Officer {officer_name} recorded action: [{action.upper()}]."
        if note:
            event += f" Note: {note}"

        case["timeline"].append({
            "timestamp": "13:10",
            "event": event,
            "actor": "Human Officer"
        })
        return case

    def add_timeline_event(self, case_id: str, event_text: str, actor: str = "Human Officer") -> Optional[Dict[str, Any]]:
        case = self._cases.get(case_id)
        if not case:
            return None
        case["timeline"].append({
            "timestamp": "13:12",
            "event": event_text,
            "actor": actor
        })
        return case

    def update_support_pathway(self, case_id: str, pathway_id: str, status: str) -> Optional[Dict[str, Any]]:
        case = self._cases.get(case_id)
        if not case:
            return None
        for sp in case.get("supportPathways", []):
            if sp["id"] == pathway_id:
                sp["status"] = status
                break
        return case

repo = CaseRepository()
