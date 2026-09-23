import React from 'react';
import { AlertOctagon, Lightbulb } from 'lucide-react';

interface NextQuestionCardProps {
  question: string;
  rationale?: string;
  warning?: string;
}

export const NextQuestionCard: React.FC<NextQuestionCardProps> = ({ question, rationale, warning }) => {
  return (
    <div className="p-4 bg-indigo-950/60 border border-indigo-700/60 rounded-xl text-indigo-100 space-y-2.5 shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Lightbulb className="w-4 h-4 text-amber-400" />
          <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-200">
            Suggested Next Trauma-Sensitive Question
          </h4>
        </div>
        <span className="px-2 py-0.5 bg-indigo-900 border border-indigo-700 text-indigo-300 text-[10px] font-semibold rounded">
          HUMAN RESPONDER SUPPORT
        </span>
      </div>

      <div className="p-3 bg-navy-950/90 border border-indigo-800/80 rounded-lg text-sm font-bold text-white shadow-inner">
        "{question}"
      </div>

      {rationale && (
        <div className="text-[11px] text-indigo-300 font-medium">
          <span className="text-slate-400">Rationale:</span> {rationale}
        </div>
      )}

      {warning && (
        <div className="flex items-center gap-2 p-2 bg-amber-950/80 border border-amber-700/80 rounded text-[11px] text-amber-200">
          <AlertOctagon className="w-4 h-4 text-amber-400 shrink-0" />
          <span className="font-semibold">{warning}</span>
        </div>
      )}
    </div>
  );
};
