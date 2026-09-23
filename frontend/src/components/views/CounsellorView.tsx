import React from 'react';
import type { CaseData } from '../../types';
import { Heart, Volume2 } from 'lucide-react';

interface CounsellorViewProps {
  cases: CaseData[];
  onSelectCase: (c: CaseData) => void;
}

export const CounsellorView: React.FC<CounsellorViewProps> = ({ cases, onSelectCase }) => {
  const counsellingCases = cases.filter(c => c.svi >= 40 || c.distressStatus.includes('HIGH') || c.indicators.some(i => i.type === 'FEAR_DISTRESS' || i.type === 'EMOTIONAL_INTENSITY'));

  return (
    <div className="space-y-4">
      <div className="glass-card p-4 rounded-xl border border-navy-700/80 bg-gradient-to-r from-navy-900 via-violet-950/40 to-navy-900">
        <div className="flex items-center gap-2">
          <Heart className="w-5 h-5 text-violet-400" />
          <div>
            <h2 className="text-base font-bold text-white">Counsellor Support Console</h2>
            <p className="text-xs text-slate-300">Focused on emotional indicators, speech hesitation, communication preferences, and trauma care notes.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {counsellingCases.map((c) => (
          <div
            key={c.id}
            onClick={() => onSelectCase(c)}
            className="glass-card p-4 rounded-xl border border-navy-700/80 space-y-3 cursor-pointer hover:border-violet-500/60 transition-all"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono font-bold text-violet-300 text-xs">{c.id}</span>
              <span className="px-2 py-0.5 bg-violet-950 text-violet-300 border border-violet-800 text-[10px] rounded font-semibold">
                {c.languageName}
              </span>
            </div>

            <div>
              <h4 className="font-bold text-white text-sm">{c.title}</h4>
              <p className="text-xs text-slate-300 italic mt-1 font-serif">"{c.translatedText || c.originalText}"</p>
            </div>

            <div className="p-2.5 bg-navy-950/80 rounded border border-navy-800 text-xs space-y-1">
              <div className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
                <Volume2 className="w-3 h-3 text-violet-400" /> SPEECH ACOUSTIC METRICS:
              </div>
              <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300">
                <div>Hesitation: <span className="font-semibold text-amber-300">{c.audioMeta.hesitation}</span></div>
                <div>Pitch: <span className="font-semibold text-slate-200">{c.audioMeta.pitch_variation}</span></div>
              </div>
            </div>

            <div className="text-right">
              <button className="px-3 py-1.5 bg-violet-600 hover:bg-violet-500 text-white rounded-lg text-xs font-bold transition-colors">
                Open Counsellor File →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
