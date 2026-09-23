import React from 'react';
import type { SupportPathwayItem } from '../../types';
import { GitBranch, Check, X } from 'lucide-react';

interface SupportPathwayWidgetProps {
  pathways: SupportPathwayItem[];
  onUpdateStatus: (pathwayId: string, status: SupportPathwayItem['status']) => void;
}

export const SupportPathwayWidget: React.FC<SupportPathwayWidgetProps> = ({ pathways, onUpdateStatus }) => {
  return (
    <div className="glass-card p-5 rounded-xl border border-navy-700/80 space-y-4">
      <div className="flex flex-wrap items-center justify-between border-b border-navy-800 pb-3 gap-2">
        <div className="flex items-center gap-2">
          <GitBranch className="w-5 h-5 text-indigo-400" />
          <div>
            <h3 className="text-sm font-bold text-white">Suggested Support Pathways</h3>
            <p className="text-xs text-slate-400">AI-suggested support routes requiring human officer confirmation</p>
          </div>
        </div>

        <span className="px-2.5 py-1 bg-indigo-950 text-indigo-300 border border-indigo-700 text-[10px] font-mono font-semibold rounded">
          HUMAN CONFIRMATION REQUIRED
        </span>
      </div>

      <div className="space-y-3">
        {pathways.map((sp) => (
          <div
            key={sp.id}
            className="p-3.5 bg-navy-900/80 rounded-xl border border-navy-800 flex flex-wrap items-center justify-between gap-3"
          >
            <div className="space-y-1 max-w-lg">
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-white">{sp.category}</span>
                <span className={`px-2 py-0.5 text-[10px] font-extrabold rounded ${
                  sp.priority === 'CRITICAL' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40' :
                  sp.priority === 'HIGH' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/40' :
                  'bg-indigo-500/20 text-indigo-400 border border-indigo-500/40'
                }`}>
                  {sp.priority}
                </span>
                <span className={`px-2 py-0.5 text-[10px] font-bold rounded ${
                  sp.status === 'CONFIRMED' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' :
                  sp.status === 'DISMISSED' ? 'bg-slate-800 text-slate-400 border border-slate-700' :
                  'bg-amber-950 text-amber-300 border border-amber-800'
                }`}>
                  STATUS: {sp.status}
                </span>
              </div>
              <p className="text-xs text-slate-300">{sp.reason || 'Recommended based on extracted vulnerability indicators.'}</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onUpdateStatus(sp.id, 'CONFIRMED')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1 ${
                  sp.status === 'CONFIRMED' 
                    ? 'bg-emerald-600 text-white' 
                    : 'bg-navy-800 hover:bg-emerald-900/60 text-emerald-300 border border-emerald-800'
                }`}
              >
                <Check className="w-3.5 h-3.5" /> Confirm
              </button>
              <button
                onClick={() => onUpdateStatus(sp.id, 'DISMISSED')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1 ${
                  sp.status === 'DISMISSED' 
                    ? 'bg-slate-700 text-slate-300' 
                    : 'bg-navy-800 hover:bg-rose-900/60 text-rose-300 border border-rose-900/60'
                }`}
              >
                <X className="w-3.5 h-3.5" /> Dismiss
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
