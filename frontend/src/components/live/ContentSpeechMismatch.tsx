import React from 'react';
import type { SpeechMismatch } from '../../types';
import { AlertCircle } from 'lucide-react';

interface ContentSpeechMismatchProps {
  mismatch: SpeechMismatch;
}

export const ContentSpeechMismatch: React.FC<ContentSpeechMismatchProps> = ({ mismatch }) => {
  if (!mismatch.detected) {
    return null;
  }

  return (
    <div className="p-3.5 bg-gradient-to-r from-amber-950/80 via-rose-950/80 to-amber-950/80 border border-amber-500/50 rounded-xl text-amber-200 space-y-2 shadow-lg animate-pulse">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
          <h4 className="text-xs font-extrabold uppercase tracking-wider text-amber-300">
            {mismatch.title}
          </h4>
        </div>
        <span className="px-2 py-0.5 bg-amber-500 text-navy-950 font-extrabold text-[10px] rounded">
          HUMAN REVIEW REQUIRED
        </span>
      </div>

      <p className="text-xs text-amber-100 font-medium leading-relaxed">
        {mismatch.explanation}
      </p>

      <div className="pt-2 border-t border-amber-800/60 flex items-center justify-between text-[11px] text-amber-300">
        <span className="font-semibold">{mismatch.recommendation}</span>
        <span className="text-[10px] text-amber-400 font-mono italic">Non-clinical acoustic incongruence</span>
      </div>
    </div>
  );
};
