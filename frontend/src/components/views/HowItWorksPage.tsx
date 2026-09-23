import React from 'react';
import { HelpCircle } from 'lucide-react';

export const HowItWorksPage: React.FC = () => {
  const steps = [
    { num: '01', title: 'Consent & Privacy Filter', desc: 'Complies with privacy guidelines and explicitly requires non-clinical disclaimer consent.' },
    { num: '02', title: 'Voice / Text Intake', desc: 'Captures live speech audio stream or typed text input from NHAA 14566 portal.' },
    { num: '03', title: 'Multilingual Processing', desc: 'Processes Tamil, Hindi, English, Bengali, Telugu while preserving original transcript text.' },
    { num: '04', title: 'Speech + Text Indicators', desc: 'Extracts Threat, Fear, Safety, Violence, Urgency, Isolation, and speech acoustic features.' },
    { num: '05', title: 'Explainable SVI Index', desc: 'Computes Stress Vulnerability Index (0-100) using configurable multi-dimensional weights.' },
    { num: '06', title: 'Ground Evidence Extraction', desc: 'Highlights exact verbatim phrase evidence for every detected indicator category.' },
    { num: '07', title: 'Trauma-Aware Next Question', desc: 'Suggests the single least-traumatizing question and prevents unnecessary repetition.' },
    { num: '08', title: 'Human Officer Review', desc: 'Keeps an authorized human responder in total control of every decision (Confirm/Modify/Dismiss).' },
    { num: '09', title: 'Support Pathway Routing', desc: 'Recommends multi-disciplinary support (Safety, Legal, Counselling, Protection).' },
    { num: '10', title: 'Scheduled Follow-up System', desc: 'Tracks 24h, 72h, and 7-day post-contact welfare check-ins.' }
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="border-b border-navy-800 pb-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <HelpCircle className="w-6 h-6 text-indigo-400" /> How SAHAYA Works
        </h2>
        <p className="text-xs text-slate-400">10-Step Trauma-Sensitive Decision Support Pipeline</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {steps.map((s) => (
          <div key={s.num} className="glass-card p-4 rounded-xl border border-navy-700/80 flex items-start gap-4">
            <span className="text-2xl font-black text-indigo-400 font-mono shrink-0">{s.num}</span>
            <div className="space-y-1">
              <h4 className="font-bold text-sm text-white">{s.title}</h4>
              <p className="text-xs text-slate-300 leading-relaxed">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
