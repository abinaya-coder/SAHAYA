import React from 'react';
import { useConsent } from '../../context/ConsentContext';
import { ShieldCheck, Lock } from 'lucide-react';

export const PrivacyConsentPage: React.FC = () => {
  const { hasConsented, setHasConsented } = useConsent();

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="border-b border-navy-800 pb-3">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-indigo-400" /> Privacy, Consent & Governance
        </h2>
        <p className="text-xs text-slate-400">System disclaimers, data minimization policies, and user consent tracking</p>
      </div>

      <div className="glass-card p-6 rounded-2xl border border-navy-700/80 space-y-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <Lock className="w-4 h-4 text-emerald-400" /> Non-Clinical Decision Support Disclaimer
        </h3>

        <div className="p-4 bg-navy-950 border border-navy-800 rounded-xl text-xs text-slate-300 leading-relaxed space-y-2 font-mono">
          <p className="font-bold text-indigo-300">SYSTEM MANDATE:</p>
          <p>
            SAHAYA is an intelligence layer designed exclusively for decision-support by authorized human responders.
            It DOES NOT provide medical or psychiatric diagnoses (PTSD, depression, anxiety).
            It DOES NOT execute autonomous legal, police, medical, or case-closure decisions.
          </p>
          <p className="text-amber-300">
            Every output must be interpreted with: "AI-assisted indicator — final assessment and action remain with the authorized human officer."
          </p>
        </div>

        <div className="pt-4 border-t border-navy-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="consent-check"
              checked={hasConsented}
              onChange={(e) => setHasConsented(e.target.checked)}
              className="w-4 h-4 rounded border-navy-700 bg-navy-900 text-indigo-600 focus:ring-indigo-500"
            />
            <label htmlFor="consent-check" className="text-xs font-medium text-slate-200 cursor-pointer">
              I understand that this system provides AI-assisted decision indicators and does not make clinical or legal decisions.
            </label>
          </div>

          <span className={`px-3 py-1 rounded-full text-xs font-bold ${hasConsented ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'bg-rose-950 text-rose-300 border border-rose-800'}`}>
            {hasConsented ? 'CONSENT ACTIVE' : 'CONSENT PENDING'}
          </span>
        </div>
      </div>

      <div className="glass-card p-6 rounded-2xl border border-navy-700/80 space-y-3">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider">Synthetic Data Disclosure</h3>
        <p className="text-xs text-slate-300 leading-relaxed">
          All case files, names, locations, and transcripts presented within this prototype are 100% synthetic demonstration data created for the Smart India Hackathon. Microphone audio streams are processed locally in-memory and are never stored or transmitted.
        </p>
      </div>
    </div>
  );
};
