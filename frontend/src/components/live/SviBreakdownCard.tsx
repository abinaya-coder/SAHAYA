import React, { useState } from 'react';
import type { Indicator } from '../../types';
import { Shield, ChevronDown, ChevronUp, CheckCircle, Info } from 'lucide-react';

interface SviBreakdownCardProps {
  svi: number;
  band: 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';
  confidence: number;
  indicators: Indicator[];
  onSelectEvidence: (phrase: string) => void;
}

export const SviBreakdownCard: React.FC<SviBreakdownCardProps> = ({
  svi,
  band,
  confidence,
  indicators,
  onSelectEvidence
}) => {
  const [expanded, setExpanded] = useState(true);

  const getBandStyles = (b: string) => {
    switch (b) {
      case 'CRITICAL':
        return { bg: 'bg-rose-500/20 text-rose-400 border-rose-500/40', bar: 'bg-rose-500' };
      case 'HIGH':
        return { bg: 'bg-orange-500/20 text-orange-400 border-orange-500/40', bar: 'bg-orange-500' };
      case 'MODERATE':
        return { bg: 'bg-amber-500/20 text-amber-400 border-amber-500/40', bar: 'bg-amber-500' };
      default:
        return { bg: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40', bar: 'bg-emerald-500' };
    }
  };

  const style = getBandStyles(band);

  return (
    <div className="glass-card p-4 rounded-xl border border-navy-700/80 space-y-3">
      {/* SVI Header Gauge */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-indigo-400" />
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">Stress Vulnerability Index (SVI)</h3>
          </div>
          <p className="text-[11px] text-slate-400">Explainable composite vulnerability metric</p>
        </div>

        <div className="flex items-center gap-2">
          <div className="text-right">
            <div className="text-2xl font-black text-white leading-none">{svi}<span className="text-xs text-slate-400 font-mono">/100</span></div>
            <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase inline-block mt-1 border ${style.bg}`}>
              BAND: {band}
            </span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-navy-950 rounded-full h-2 overflow-hidden border border-navy-800">
        <div 
          className={`h-full transition-all duration-500 rounded-full ${style.bar}`}
          style={{ width: `${svi}%` }}
        />
      </div>

      {/* Confidence Indicator */}
      <div className="flex items-center justify-between text-[11px] text-slate-400 bg-navy-950/60 p-2 rounded border border-navy-800">
        <span className="flex items-center gap-1 font-mono">
          <Info className="w-3.5 h-3.5 text-indigo-400" /> Confidence Score:
        </span>
        <span className="font-extrabold text-white">{(confidence * 100).toFixed(0)}%</span>
      </div>

      {/* WHY WAS THIS FLAGGED? Expandable Evidence Panel */}
      <div className="border border-navy-800 rounded-lg overflow-hidden bg-navy-950/40">
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full p-2.5 bg-navy-900/80 flex items-center justify-between text-xs font-bold text-slate-200 hover:bg-navy-800 transition-colors"
        >
          <span className="flex items-center gap-1.5 text-indigo-300">
            <span>WHY WAS THIS FLAGGED?</span>
            <span className="text-[10px] font-mono text-slate-400 font-normal">({indicators.length} ground evidence items)</span>
          </span>
          {expanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </button>

        {expanded && (
          <div className="p-3 space-y-2 text-xs divide-y divide-navy-800/60">
            {indicators.length === 0 ? (
              <div className="text-slate-500 text-[11px] italic">No evidence phrases detected yet.</div>
            ) : (
              indicators.map((ind, idx) => (
                <div key={idx} className="pt-2 first:pt-0 flex items-start gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <div className="space-y-0.5 flex-1">
                    <div className="font-semibold text-slate-200 flex items-center justify-between">
                      <span>{ind.type.replace('_', ' ')} Indicator</span>
                      <span className="text-[10px] font-mono text-indigo-400">{ind.severity}</span>
                    </div>
                    <div 
                      onClick={() => onSelectEvidence(ind.evidence)}
                      className="text-[11px] text-amber-300 font-mono bg-navy-900 p-1.5 rounded border border-navy-800 cursor-pointer hover:border-indigo-500 transition-colors"
                    >
                      Evidence: "{ind.evidence}"
                      {ind.translatedEvidence && ind.translatedEvidence !== ind.evidence && (
                        <span className="text-slate-400 block text-[10px] font-sans">
                          Translation: "{ind.translatedEvidence}"
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      <p className="text-[10px] text-slate-500 italic">
        "This is an AI-assisted vulnerability indicator, not a clinical score or diagnosis."
      </p>
    </div>
  );
};
