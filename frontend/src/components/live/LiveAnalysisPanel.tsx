import React from 'react';
import type { Indicator, IndicatorType } from '../../types';
import { ShieldAlert, AlertTriangle, RefreshCw, Flame, Clock, Heart, Users, ExternalLink } from 'lucide-react';

interface LiveAnalysisPanelProps {
  indicators: Indicator[];
  onSelectEvidence: (phrase: string) => void;
}

export const LiveAnalysisPanel: React.FC<LiveAnalysisPanelProps> = ({ indicators, onSelectEvidence }) => {
  const categoryConfig: Record<IndicatorType, { label: string; icon: any; defaultColor: string }> = {
    IMMEDIATE_SAFETY: { label: 'Immediate Safety', icon: ShieldAlert, defaultColor: 'text-rose-400 bg-rose-500/20 border-rose-500/40' },
    THREAT: { label: 'Threat & Harassment', icon: AlertTriangle, defaultColor: 'text-orange-400 bg-orange-500/20 border-orange-500/40' },
    FEAR_DISTRESS: { label: 'Fear & Distress', icon: Heart, defaultColor: 'text-amber-400 bg-amber-500/20 border-amber-500/40' },
    REPEATED_INCIDENT: { label: 'Repeated Incident', icon: RefreshCw, defaultColor: 'text-indigo-400 bg-indigo-500/20 border-indigo-500/40' },
    VIOLENCE: { label: 'Violence & Force', icon: Flame, defaultColor: 'text-red-400 bg-red-500/20 border-red-500/40' },
    URGENCY: { label: 'Incident Urgency', icon: Clock, defaultColor: 'text-sky-400 bg-sky-500/20 border-sky-500/40' },
    EMOTIONAL_INTENSITY: { label: 'Emotional Overwhelm', icon: Heart, defaultColor: 'text-purple-400 bg-purple-500/20 border-purple-500/40' },
    SOCIAL_ISOLATION: { label: 'Social Isolation', icon: Users, defaultColor: 'text-slate-400 bg-slate-500/20 border-slate-500/40' }
  };

  const allCategories: IndicatorType[] = [
    'IMMEDIATE_SAFETY',
    'THREAT',
    'FEAR_DISTRESS',
    'REPEATED_INCIDENT',
    'VIOLENCE',
    'URGENCY',
    'EMOTIONAL_INTENSITY',
    'SOCIAL_ISOLATION'
  ];

  return (
    <div className="glass-card p-4 rounded-xl border border-navy-700/80 space-y-3">
      <div className="flex items-center justify-between border-b border-navy-800 pb-2">
        <div>
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">Live AI Indicator Breakdown</h3>
          <p className="text-[11px] text-slate-400">Explainable indicators with grounded evidence text</p>
        </div>
        <span className="px-2 py-0.5 bg-indigo-950 text-indigo-300 text-[10px] font-mono border border-indigo-800 rounded">
          {indicators.length} DETECTED
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {allCategories.map((cat) => {
          const matched = indicators.find(i => i.type === cat);
          const cfg = categoryConfig[cat];
          const Icon = cfg.icon;

          if (matched) {
            return (
              <div
                key={cat}
                onClick={() => onSelectEvidence(matched.evidence)}
                className={`p-2.5 rounded-lg border cursor-pointer transition-all hover:scale-[1.02] shadow-sm ${cfg.defaultColor}`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold flex items-center gap-1.5">
                    <Icon className="w-4 h-4" /> {cfg.label}
                  </span>
                  <span className="px-1.5 py-0.5 text-[10px] font-extrabold rounded uppercase bg-navy-950/80">
                    {matched.severity}
                  </span>
                </div>

                <div className="text-[11px] mt-1 space-y-0.5 bg-navy-950/60 p-1.5 rounded border border-navy-800/80">
                  <div className="text-[10px] text-slate-400 flex items-center justify-between font-mono">
                    <span>DETECTED PHRASE:</span>
                    <span className="flex items-center gap-0.5 text-indigo-300 underline">
                      Highlight <ExternalLink className="w-2.5 h-2.5" />
                    </span>
                  </div>
                  <div className="font-semibold text-white">"{matched.evidence}"</div>
                  {matched.translatedEvidence && matched.translatedEvidence !== matched.evidence && (
                    <div className="text-[10px] text-indigo-300 italic">
                      → ({matched.translatedEvidence})
                    </div>
                  )}
                </div>
              </div>
            );
          }

          return (
            <div key={cat} className="p-2 rounded-lg border border-navy-800/60 bg-navy-950/40 text-slate-500 opacity-60 flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5 font-medium">
                <Icon className="w-3.5 h-3.5 text-slate-500" /> {cfg.label}
              </span>
              <span className="text-[10px] font-mono text-slate-600">Not Flagged</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
