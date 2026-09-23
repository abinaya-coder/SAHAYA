import React from 'react';
import type { SupportedLanguage } from '../../types';
import { Languages, Zap, MessageSquare } from 'lucide-react';

interface TranscriptViewProps {
  originalText: string;
  translatedText: string;
  language: SupportedLanguage;
  highlightPhrase?: string | null;
  onTextChange: (newText: string) => void;
  onLoadPreset: (caseId: string) => void;
}

export const TranscriptView: React.FC<TranscriptViewProps> = ({
  originalText,
  translatedText,
  language,
  highlightPhrase,
  onTextChange,
  onLoadPreset
}) => {
  const presets = [
    { id: 'NHAA-10482', label: 'Tamil — Judge Demo Case (Safety & Threat)', lang: 'ta' },
    { id: 'NHAA-10483', label: 'Hindi — Critical Threat & Fear', lang: 'hi' },
    { id: 'NHAA-10484', label: 'English — Stalking / Repeated Incident', lang: 'en' },
    { id: 'NHAA-10485', label: 'Bengali — Cyber Intimidation', lang: 'bn' },
    { id: 'NHAA-10486', label: 'Telugu — Vague Statement (Low Confidence)', lang: 'te' },
    { id: 'NHAA-10487', label: 'English — Flat Monotone + Knife Threat Mismatch', lang: 'en' }
  ];

  const renderHighlightedText = (text: string) => {
    if (!highlightPhrase || !text) return text;
    const parts = text.split(new RegExp(`(${highlightPhrase})`, 'gi'));
    return (
      <>
        {parts.map((part, i) =>
          part.toLowerCase() === highlightPhrase.toLowerCase() ? (
            <mark key={i} className="bg-amber-400 text-navy-950 font-bold px-1 rounded animate-pulse">
              {part}
            </mark>
          ) : (
            part
          )
        )}
      </>
    );
  };

  return (
    <div className="glass-card p-4 rounded-xl border border-navy-700/80 space-y-4 flex flex-col justify-between h-full">
      <div className="space-y-3">
        {/* Header & Preset Selector */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-navy-800 pb-3">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-indigo-400" />
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">Live Intake Transcript</h3>
          </div>

          <div className="flex items-center gap-2">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-[11px] font-medium text-slate-400">Load Quick Preset:</span>
            <select
              onChange={(e) => e.target.value && onLoadPreset(e.target.value)}
              className="bg-navy-900 border border-indigo-700/60 text-indigo-300 text-xs rounded-lg px-2 py-1 font-semibold focus:outline-none cursor-pointer"
              defaultValue=""
            >
              <option value="" disabled>-- Select Demo Scenario --</option>
              {presets.map(p => (
                <option key={p.id} value={p.id} className="bg-navy-900 text-slate-200">
                  {p.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Live Editable Transcript Area */}
        <div className="space-y-3">
          <div>
            <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400 mb-1">
              <span>ORIGINAL COMPLAINANT STATEMENT ({language.toUpperCase()})</span>
              <span className="text-[10px] text-slate-500 font-mono">PRESERVED UNALTERED</span>
            </div>
            <div className="p-3 bg-navy-950/90 border border-navy-800 rounded-lg text-sm text-slate-100 font-sans leading-relaxed min-h-[70px]">
              {renderHighlightedText(originalText)}
            </div>
          </div>

          {language !== 'en' && (
            <div>
              <div className="flex items-center justify-between text-[11px] font-semibold text-indigo-300 mb-1">
                <span className="flex items-center gap-1">
                  <Languages className="w-3.5 h-3.5" /> ENGLISH TRANSLATION
                </span>
                <span className="text-[10px] text-slate-500 font-mono">AUTOMATIC TRANSLATION</span>
              </div>
              <div className="p-3 bg-navy-900/60 border border-indigo-900/40 rounded-lg text-xs text-indigo-200 font-sans italic leading-relaxed min-h-[50px]">
                "{renderHighlightedText(translatedText)}"
              </div>
            </div>
          )}

          {/* Quick Manual Input Editor */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-400 mb-1">
              TYPE / EDIT LIVE TRANSCRIPT:
            </label>
            <textarea
              value={originalText}
              onChange={(e) => onTextChange(e.target.value)}
              rows={3}
              placeholder="Type complaint in English, Tamil, Hindi, Bengali, or Telugu..."
              className="w-full bg-navy-900 border border-navy-700 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 font-sans"
            />
          </div>
        </div>
      </div>

      <div className="text-[10px] text-slate-500 border-t border-navy-800 pt-2 flex items-center justify-between font-mono">
        <span>Clicking evidence items on the right highlights phrases in transcript.</span>
        <span>NHAA 14566 Intake Layer</span>
      </div>
    </div>
  );
};
