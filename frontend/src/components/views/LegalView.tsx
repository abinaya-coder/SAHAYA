import React from 'react';
import type { CaseData } from '../../types';
import { Scale, Calendar, MapPin, FileText } from 'lucide-react';

interface LegalViewProps {
  cases: CaseData[];
  onSelectCase: (c: CaseData) => void;
}

export const LegalView: React.FC<LegalViewProps> = ({ cases, onSelectCase }) => {
  const legalCases = cases.filter(c => c.indicators.some(i => i.type === 'THREAT' || i.type === 'VIOLENCE' || i.type === 'REPEATED_INCIDENT'));

  return (
    <div className="space-y-4">
      <div className="glass-card p-4 rounded-xl border border-navy-700/80 bg-gradient-to-r from-navy-900 via-amber-950/40 to-navy-900">
        <div className="flex items-center gap-2">
          <Scale className="w-5 h-5 text-amber-400" />
          <div>
            <h2 className="text-base font-bold text-white">Legal & Support Officer Console</h2>
            <p className="text-xs text-slate-300">Structured chronological documentation of reported threats, dates, locations, and verbatim statements.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {legalCases.map((c) => (
          <div
            key={c.id}
            onClick={() => onSelectCase(c)}
            className="glass-card p-4 rounded-xl border border-navy-700/80 space-y-3 cursor-pointer hover:border-amber-500/60 transition-all"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono font-bold text-amber-300 text-xs">{c.id}</span>
              <span className="px-2 py-0.5 bg-amber-950 text-amber-300 border border-amber-800 text-[10px] rounded font-semibold">
                LEGAL PATHWAY
              </span>
            </div>

            <h4 className="font-bold text-white text-sm">{c.title}</h4>

            <div className="space-y-1.5 text-xs text-slate-300 bg-navy-950/80 p-3 rounded border border-navy-800">
              <div className="flex items-center gap-1 text-[11px]"><MapPin className="w-3.5 h-3.5 text-amber-400" /> <span className="font-semibold text-slate-200">{c.caseMemory.location || 'Location Pending'}</span></div>
              <div className="flex items-center gap-1 text-[11px]"><Calendar className="w-3.5 h-3.5 text-amber-400" /> <span className="font-semibold text-slate-200">{c.caseMemory.time || 'Timestamp recorded'}</span></div>
              <div className="flex items-center gap-1 text-[11px]"><FileText className="w-3.5 h-3.5 text-amber-400" /> <span className="font-semibold text-slate-200">{c.caseMemory.threat || 'Threat documented'}</span></div>
            </div>

            <div className="text-right">
              <button className="px-3 py-1.5 bg-amber-600 hover:bg-amber-500 text-white rounded-lg text-xs font-bold transition-colors">
                Open Legal Documentation →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
