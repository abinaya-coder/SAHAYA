import React from 'react';
import type { CaseData } from '../../types';
import { ShieldAlert, ArrowUpRight, CheckCircle2 } from 'lucide-react';

interface PriorityTableProps {
  cases: CaseData[];
  onSelectCase: (c: CaseData) => void;
}

export const PriorityTable: React.FC<PriorityTableProps> = ({ cases, onSelectCase }) => {
  const getBandBadge = (band: string) => {
    switch (band) {
      case 'CRITICAL':
        return <span className="px-2 py-0.5 rounded text-[11px] font-extrabold bg-rose-500/20 text-rose-400 border border-rose-500/40">CRITICAL</span>;
      case 'HIGH':
        return <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-orange-500/20 text-orange-400 border border-orange-500/40">HIGH</span>;
      case 'MODERATE':
        return <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/40">MODERATE</span>;
      default:
        return <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">LOW</span>;
    }
  };

  return (
    <div className="glass-card rounded-xl border border-navy-700/80 overflow-hidden shadow-xl">
      <div className="p-4 border-b border-navy-700/60 bg-navy-900/60 flex flex-wrap items-center justify-between gap-2">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <span>LIVE CASE PRIORITY CONSOLE</span>
            <span className="px-2 py-0.5 bg-indigo-950 text-indigo-300 border border-indigo-700 rounded text-[10px] font-mono">
              AI-assisted priority indicators
            </span>
          </h3>
          <p className="text-xs text-slate-400">
            Real-time queue prioritized by explainable Stress Vulnerability Index (SVI)
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-navy-950/80 text-slate-400 border-b border-navy-700/60 font-semibold uppercase tracking-wider text-[11px]">
              <th className="p-3.5">Case ID</th>
              <th className="p-3.5">Language</th>
              <th className="p-3.5">Time</th>
              <th className="p-3.5">SVI Index</th>
              <th className="p-3.5">Immediate Safety</th>
              <th className="p-3.5">Distress Status</th>
              <th className="p-3.5">Review Status</th>
              <th className="p-3.5 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-navy-800/60 text-slate-200">
            {cases.map((c) => (
              <tr 
                key={c.id} 
                className="hover:bg-navy-800/50 transition-colors cursor-pointer group"
                onClick={() => onSelectCase(c)}
              >
                <td className="p-3.5 font-mono font-bold text-indigo-300 group-hover:text-indigo-200">
                  {c.id}
                </td>
                <td className="p-3.5">
                  <span className="px-2 py-0.5 bg-navy-800 border border-navy-700 rounded text-slate-300 text-[11px]">
                    {c.languageName}
                  </span>
                </td>
                <td className="p-3.5 text-slate-400 font-mono text-[11px]">
                  {new Date(c.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </td>
                <td className="p-3.5">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-sm text-white">{c.svi}</span>
                    <span className="text-[10px] text-slate-400 font-mono">/100</span>
                    {getBandBadge(c.band)}
                  </div>
                </td>
                <td className="p-3.5">
                  {c.immediateSafety ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40 animate-pulse">
                      <ShieldAlert className="w-3.5 h-3.5 text-rose-400" /> SAFETY CONCERN
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-slate-800 text-slate-400 border border-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-slate-400" /> Standard
                    </span>
                  )}
                </td>
                <td className="p-3.5 font-medium text-slate-300">
                  {c.distressStatus}
                </td>
                <td className="p-3.5">
                  <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                    c.humanReviewStatus === 'Reviewed' 
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' 
                      : 'bg-amber-950 text-amber-300 border border-amber-800'
                  }`}>
                    {c.humanReviewStatus}
                  </span>
                </td>
                <td className="p-3.5 text-right">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectCase(c);
                    }}
                    className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-semibold text-xs transition-colors flex items-center gap-1 ml-auto shadow-sm"
                  >
                    Console <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
