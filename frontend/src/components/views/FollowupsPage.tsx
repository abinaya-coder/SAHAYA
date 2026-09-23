import React, { useState } from 'react';
import type { CaseData } from '../../types';
import { CalendarCheck } from 'lucide-react';

interface FollowupsPageProps {
  cases: CaseData[];
  onAddTimelineEvent: (caseId: string, eventText: string) => void;
}

export const FollowupsPage: React.FC<FollowupsPageProps> = ({ cases, onAddTimelineEvent }) => {
  const [selectedStates, setSelectedStates] = useState<Record<string, string>>({
    'NHAA-10482': 'Needs assistance',
    'NHAA-10483': 'Scheduled',
    'NHAA-10484': 'Safe'
  });

  const handleUpdateFollowup = (caseId: string, state: string) => {
    setSelectedStates(prev => ({ ...prev, [caseId]: state }));
    onAddTimelineEvent(caseId, `Trauma Welfare Follow-up status updated to: [${state.toUpperCase()}].`);
  };

  return (
    <div className="space-y-4">
      <div className="border-b border-navy-800 pb-3 flex flex-wrap items-center justify-between gap-2">
        <div>
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <CalendarCheck className="w-5 h-5 text-indigo-400" /> Post-Contact Trauma Follow-up System
          </h2>
          <p className="text-xs text-slate-400">Scheduled 24-hour, 72-hour, and 7-day post-intake welfare check-ins</p>
        </div>

        <span className="px-2.5 py-1 bg-indigo-950 text-indigo-300 border border-indigo-700 text-[10px] font-mono rounded">
          DEMO TRACKER ONLY — NO REAL MESSAGING
        </span>
      </div>

      <div className="space-y-3">
        {cases.slice(0, 5).map((c) => {
          const currentState = selectedStates[c.id] || 'Pending Check-in';
          return (
            <div key={c.id} className="glass-card p-4 rounded-xl border border-navy-700/80 flex flex-wrap items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-indigo-300 text-xs">{c.id}</span>
                  <span className="font-bold text-white text-sm">{c.title}</span>
                  <span className="px-2 py-0.5 bg-navy-800 border border-navy-700 text-slate-300 text-[10px] rounded">
                    {c.languageName}
                  </span>
                </div>
                <p className="text-xs text-slate-400">Assigned Officer: {c.assignedOfficer}</p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold text-slate-300">Set Welfare State:</span>
                {[
                  { id: 'Safe', color: 'bg-emerald-600' },
                  { id: 'Needs assistance', color: 'bg-amber-600' },
                  { id: 'Immediate concern', color: 'bg-rose-600' },
                  { id: 'Unable to reach', color: 'bg-slate-700' }
                ].map((st) => (
                  <button
                    key={st.id}
                    onClick={() => handleUpdateFollowup(c.id, st.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      currentState === st.id
                        ? `${st.color} text-white shadow-md border border-white`
                        : 'bg-navy-900 text-slate-300 border border-navy-700 hover:bg-navy-800'
                    }`}
                  >
                    {st.id}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
