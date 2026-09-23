import React from 'react';
import { Mic, BrainCircuit, HeartHandshake, ShieldCheck, ArrowRight, Layers } from 'lucide-react';

interface LandingPageProps {
  onEnterConsole: () => void;
  onViewHowItWorks: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onEnterConsole, onViewHowItWorks }) => {
  return (
    <div className="space-y-10 py-6 max-w-6xl mx-auto">
      {/* Hero Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-950/80 border border-indigo-700/60 rounded-full text-xs font-semibold text-indigo-300">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Smart India Hackathon Prototype — NHAA 14566 & Integrated Portal</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          SAHAYA
        </h1>

        <h2 className="text-xl sm:text-2xl font-bold text-indigo-300">
          AI Co-Pilot for Trauma-Sensitive Response
        </h2>

        <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
          Helping authorized human responders identify urgency, reduce repeated victim questioning, 
          and connect vulnerable complainants with appropriate multidisciplinary support.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <button
            onClick={onEnterConsole}
            className="px-6 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-extrabold text-sm shadow-xl shadow-indigo-600/30 transition-all flex items-center gap-2 hover:scale-105"
          >
            ENTER DEMO CONSOLE <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={onViewHowItWorks}
            className="px-6 py-3.5 bg-navy-800 hover:bg-navy-700 text-slate-200 border border-navy-700 rounded-xl font-bold text-sm transition-all"
          >
            VIEW HOW IT WORKS
          </button>
        </div>
      </div>

      {/* Feature Cards Grid (LISTEN, UNDERSTAND, SUPPORT) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6 rounded-2xl border border-navy-700/80 space-y-3 hover:border-indigo-500/50 transition-all">
          <div className="w-12 h-12 rounded-xl bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
            <Mic className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white uppercase tracking-wider">1. LISTEN</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Multilingual voice & text intake supporting Tamil, Hindi, English, Bengali, and Telugu with browser acoustic feature extraction.
          </p>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-navy-700/80 space-y-3 hover:border-indigo-500/50 transition-all">
          <div className="w-12 h-12 rounded-xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-purple-400">
            <BrainCircuit className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white uppercase tracking-wider">2. UNDERSTAND</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Explainable AI-assisted indicators, ground evidence extraction, content-speech mismatch detection, and Stress Vulnerability Index (SVI).
          </p>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-navy-700/80 space-y-3 hover:border-indigo-500/50 transition-all">
          <div className="w-12 h-12 rounded-xl bg-emerald-600/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
            <HeartHandshake className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white uppercase tracking-wider">3. SUPPORT</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Trauma-sensitive next question recommendation, "Never Make Me Repeat" case memory, and officer-confirmed support pathways.
          </p>
        </div>
      </div>

      {/* Conceptual Architecture Banner */}
      <div className="glass-card p-6 rounded-2xl border border-indigo-800/60 bg-gradient-to-r from-navy-900 via-indigo-950 to-navy-900 text-center space-y-3">
        <h4 className="text-xs font-bold text-indigo-300 uppercase tracking-widest flex items-center justify-center gap-2">
          <Layers className="w-4 h-4" /> CONCEPTUAL ARCHITECTURE LAYER
        </h4>
        <div className="text-xs font-mono text-slate-300 flex flex-wrap items-center justify-center gap-2">
          <span className="px-3 py-1 bg-navy-900 border border-navy-700 rounded">Existing Helpline (NHAA 14566)</span>
          <span>→</span>
          <span className="px-3 py-1 bg-indigo-600 text-white font-bold rounded">SAHAYA AI Layer</span>
          <span>→</span>
          <span className="px-3 py-1 bg-navy-900 border border-navy-700 rounded">Explainable Vulnerability Analysis</span>
          <span>→</span>
          <span className="px-3 py-1 bg-navy-900 border border-navy-700 rounded">Human Officer Dashboard</span>
        </div>
      </div>
    </div>
  );
};
