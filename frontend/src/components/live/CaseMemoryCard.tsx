import React from 'react';
import type { CaseMemory } from '../../types';
import { Database, ShieldCheck } from 'lucide-react';

interface CaseMemoryCardProps {
  memory: CaseMemory;
}

export const CaseMemoryCard: React.FC<CaseMemoryCardProps> = ({ memory }) => {
  return (
    <div className="glass-card p-4 rounded-xl border border-navy-700/80 space-y-3">
      <div className="flex items-center justify-between border-b border-navy-800 pb-2">
        <div className="flex items-center gap-2">
          <Database className="w-4 h-4 text-indigo-400" />
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">
            Trauma-Sensitive Case Memory ("Never Make Me Repeat")
          </h3>
        </div>
        <span className="px-2 py-0.5 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded text-[10px] font-mono font-semibold">
          AUTO-STRUCTURED
        </span>
      </div>

      <div className="p-2 bg-indigo-950/40 border border-indigo-800/40 rounded text-[11px] text-indigo-200 flex items-center gap-2">
        <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
        <span>Previously provided information is already recorded. Do not ask complainant to repeat unless necessary.</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
        <div className="bg-navy-950/80 p-2.5 rounded border border-navy-800">
          <span className="text-[10px] text-slate-400 font-mono block">INCIDENT REPORTED:</span>
          <span className="font-medium text-slate-200">{memory.incident || 'Not yet stated'}</span>
        </div>
        <div className="bg-navy-950/80 p-2.5 rounded border border-navy-800">
          <span className="text-[10px] text-slate-400 font-mono block">THREAT & INTIMIDATION:</span>
          <span className="font-medium text-slate-200">{memory.threat || 'Not specified'}</span>
        </div>
        <div className="bg-navy-950/80 p-2.5 rounded border border-navy-800">
          <span className="text-[10px] text-slate-400 font-mono block">PEOPLE INVOLVED:</span>
          <span className="font-medium text-slate-200">{memory.people_involved || 'Unknown / Unspecified'}</span>
        </div>
        <div className="bg-navy-950/80 p-2.5 rounded border border-navy-800">
          <span className="text-[10px] text-slate-400 font-mono block">LOCATION / AREA:</span>
          <span className="font-medium text-slate-200">{memory.location || 'Location unconfirmed'}</span>
        </div>
        <div className="bg-navy-950/80 p-2.5 rounded border border-navy-800">
          <span className="text-[10px] text-slate-400 font-mono block">TIMELINE / RECURRENCE:</span>
          <span className="font-medium text-slate-200">{memory.time || 'Recent'} ({memory.previous_occurrence || 'Unconfirmed'})</span>
        </div>
        <div className="bg-navy-950/80 p-2.5 rounded border border-navy-800">
          <span className="text-[10px] text-slate-400 font-mono block">SUPPORT REQUESTED:</span>
          <span className="font-medium text-indigo-300">{memory.support_requested || 'Initial Contact'}</span>
        </div>
      </div>
    </div>
  );
};
