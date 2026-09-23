import React from 'react';
import { AlertTriangle, Info } from 'lucide-react';

export const DisclaimerBanner: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-navy-900 via-indigo-950 to-navy-900 border-b border-indigo-900/60 px-4 py-2 text-xs text-indigo-200 flex flex-wrap items-center justify-between gap-2 shadow-sm">
      <div className="flex items-center gap-2">
        <Info className="w-4 h-4 text-indigo-400 shrink-0" />
        <span className="font-semibold text-slate-200">
          DECISION-SUPPORT NOTICE:
        </span>
        <span className="text-slate-300">
          AI-assisted indicator — final assessment and action remain with the authorized human officer.
        </span>
      </div>

      <div className="flex items-center gap-3 text-[11px] text-slate-400 font-mono">
        <span className="flex items-center gap-1 text-amber-400 font-sans font-medium">
          <AlertTriangle className="w-3.5 h-3.5" /> Non-Clinical System
        </span>
        <span className="hidden sm:inline">|</span>
        <span className="hidden sm:inline">Synthetic Demo Dataset</span>
      </div>
    </div>
  );
};
