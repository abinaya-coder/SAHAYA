import React, { createContext, useContext, useState } from 'react';
import type { CaseData, SupportPathwayItem } from '../types';
import { DEMO_CASES_CLIENT } from '../services/clientDemoCases';

interface CaseContextType {
  cases: CaseData[];
  activeCase: CaseData | null;
  setActiveCase: (c: CaseData | null) => void;
  recordOfficerDecision: (caseId: string, action: string, note?: string) => void;
  addTimelineEvent: (caseId: string, eventText: string, actor?: any) => void;
  updateSupportPathwayStatus: (caseId: string, pathwayId: string, status: SupportPathwayItem['status']) => void;
  loadPresetCase: (presetId: string) => CaseData | null;
}

const CaseContext = createContext<CaseContextType | undefined>(undefined);

export const CaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cases, setCases] = useState<CaseData[]>(DEMO_CASES_CLIENT);
  const [activeCase, setActiveCase] = useState<CaseData | null>(DEMO_CASES_CLIENT[0]);

  const recordOfficerDecision = (caseId: string, action: string, note?: string) => {
    setCases(prev => prev.map(c => {
      if (c.id === caseId) {
        const updatedTimeline = [
          ...c.timeline,
          {
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            event: `Human Officer Decision recorded: [${action.toUpperCase()}]. ${note ? 'Note: ' + note : ''}`,
            actor: 'Human Officer' as const
          }
        ];
        return {
          ...c,
          humanReviewStatus: 'Reviewed',
          officerDecision: action,
          officerNote: note,
          timeline: updatedTimeline
        };
      }
      return c;
    }));

    if (activeCase && activeCase.id === caseId) {
      setActiveCase(prev => prev ? {
        ...prev,
        humanReviewStatus: 'Reviewed',
        officerDecision: action,
        officerNote: note,
        timeline: [
          ...prev.timeline,
          {
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            event: `Human Officer Decision recorded: [${action.toUpperCase()}]. ${note ? 'Note: ' + note : ''}`,
            actor: 'Human Officer' as const
          }
        ]
      } : null);
    }
  };

  const addTimelineEvent = (caseId: string, eventText: string, actor: any = 'Human Officer') => {
    setCases(prev => prev.map(c => {
      if (c.id === caseId) {
        return {
          ...c,
          timeline: [
            ...c.timeline,
            {
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              event: eventText,
              actor
            }
          ]
        };
      }
      return c;
    }));

    if (activeCase && activeCase.id === caseId) {
      setActiveCase(prev => prev ? {
        ...prev,
        timeline: [
          ...prev.timeline,
          {
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            event: eventText,
            actor
          }
        ]
      } : null);
    }
  };

  const updateSupportPathwayStatus = (caseId: string, pathwayId: string, status: SupportPathwayItem['status']) => {
    setCases(prev => prev.map(c => {
      if (c.id === caseId) {
        const updatedPathways = c.supportPathways.map(sp => sp.id === pathwayId ? { ...sp, status } : sp);
        return { ...c, supportPathways: updatedPathways };
      }
      return c;
    }));

    if (activeCase && activeCase.id === caseId) {
      setActiveCase(prev => prev ? {
        ...prev,
        supportPathways: prev.supportPathways.map(sp => sp.id === pathwayId ? { ...sp, status } : sp)
      } : null);
    }
  };

  const loadPresetCase = (presetId: string): CaseData | null => {
    const found = cases.find(c => c.id === presetId);
    if (found) {
      setActiveCase(found);
      return found;
    }
    return null;
  };

  return (
    <CaseContext.Provider value={{
      cases,
      activeCase,
      setActiveCase,
      recordOfficerDecision,
      addTimelineEvent,
      updateSupportPathwayStatus,
      loadPresetCase
    }}>
      {children}
    </CaseContext.Provider>
  );
};

export const useCaseContext = () => {
  const context = useContext(CaseContext);
  if (!context) throw new Error('useCaseContext must be used within CaseProvider');
  return context;
};
