import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import type { CaseData } from '../../types';
import { 
  ShieldAlert, 
  CheckCircle2, 
  HeartHandshake, 
  Scale, 
  UserCheck, 
  Plus, 
  Info
} from 'lucide-react';

interface CaseDetailsProps {
  caseData: CaseData;
  onBack: () => void;
  onAddTimelineNote: (caseId: string, note: string) => void;
}

export const CaseDetails: React.FC<CaseDetailsProps> = ({ caseData, onBack, onAddTimelineNote }) => {
  const { t } = useLanguage();
  const [noteText, setNoteText] = useState('');
  const [showNoteModal, setShowNoteModal] = useState(false);

  const indicatorsBreakdown = [
    { label: 'Fear Indicator', level: 'High', color: 'text-amber-400 bg-amber-500/10 border-amber-500/30' },
    { label: 'Threat & Harassment', level: 'High', color: 'text-orange-400 bg-orange-500/10 border-orange-500/30' },
    { label: 'Trauma & Distress', level: 'High', color: 'text-rose-400 bg-rose-500/10 border-rose-500/30' },
    { label: 'Anxiety Expression', level: 'Medium', color: 'text-amber-400 bg-amber-500/10 border-amber-500/30' },
    { label: 'Social Isolation', level: 'Medium', color: 'text-slate-400 bg-slate-800 border-slate-700' },
    { label: 'Immediate Safety Concern', level: caseData.immediateSafety ? 'High' : 'Low', color: caseData.immediateSafety ? 'text-rose-400 bg-rose-500/20 border-rose-500/50 animate-pulse' : 'text-slate-400 bg-slate-800 border-slate-700' }
  ];

  const explainabilityReasons = [
    'Threat-related statements detected in verbatim intake statement',
    'Strong fear-related expressions detected in local language phrasing',
    'Repeated intimidation and recurring harassment references',
    'Distress-related speech patterns (Elevated pause duration, hesitation)',
    'Possible immediate physical safety concern reported'
  ];

  const pathways = [
    { name: 'Human Officer Assessment', priority: 'CRITICAL', reason: 'Mandatory verification of physical safety', status: 'REQUIRED', assigned: 'Inspector S. Raman' },
    { name: 'Counselling Referral', priority: 'HIGH', reason: 'Fear and emotional distress indicators identified', status: 'SUGGESTED', assigned: 'Counsellor P. Menon' },
    { name: 'Legal Aid Referral', priority: 'HIGH', reason: 'Repeated threats & intimidation documented', status: 'SUGGESTED', assigned: 'Advocate V. Sharma' },
    { name: 'Medical Assistance', priority: 'MEDIUM', reason: 'Routine trauma welfare review', status: 'OPTIONAL', assigned: 'NHAA Medical Team' },
    { name: 'Safety / Police Assessment', priority: 'HIGH', reason: 'Complainant reported fear returning home', status: 'SUGGESTED', assigned: 'Local NHAA Liaison' },
    { name: 'Witness Protection Assessment', priority: 'MEDIUM', reason: 'Ongoing intimidation risks', status: 'OPTIONAL', assigned: 'Protection Officer' },
    { name: 'Emergency Support Route', priority: caseData.immediateSafety ? 'CRITICAL' : 'LOW', reason: 'Immediate danger indicator evaluation', status: 'SUGGESTED', assigned: 'Emergency Response' }
  ];

  const handleNoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (noteText.trim()) {
      onAddTimelineNote(caseData.id, noteText.trim());
      setNoteText('');
      setShowNoteModal(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Action Bar */}
      <div className="flex flex-wrap items-center justify-between border-b border-slate-800 pb-4 gap-4">
        <div>
          <button onClick={onBack} className="text-xs font-bold text-teal-400 hover:underline mb-1">
            ← Back to Priority Cases
          </button>
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-black text-white">{caseData.id}</h2>
            <span className="px-3 py-1 bg-slate-800 text-slate-300 rounded-full text-xs font-mono font-bold">
              {caseData.languageName}
            </span>
            <span className="px-3 py-1 bg-slate-900 border border-slate-700 text-slate-300 rounded-full text-xs font-semibold">
              Channel: 14566 Helpline
            </span>
          </div>
        </div>

        {/* Five Action Buttons specified by user */}
        <div className="flex flex-wrap items-center gap-2">
          <button onClick={() => onAddTimelineNote(caseData.id, 'Officer assigned for priority review.')} className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors border border-slate-700">
            <UserCheck className="w-3.5 h-3.5 text-teal-400" /> Assign Officer
          </button>
          <button onClick={() => onAddTimelineNote(caseData.id, 'Referred case file to NHAA Counsellor P. Menon.')} className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors border border-slate-700">
            <HeartHandshake className="w-3.5 h-3.5 text-amber-400" /> Refer to Counsellor
          </button>
          <button onClick={() => onAddTimelineNote(caseData.id, 'Referred case for official Legal Aid assistance.')} className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors border border-slate-700">
            <Scale className="w-3.5 h-3.5 text-indigo-400" /> Refer for Legal Aid
          </button>
          <button onClick={() => onAddTimelineNote(caseData.id, 'Safety review initiated with Local Protection Team.')} className="px-3.5 py-2 bg-rose-950 hover:bg-rose-900 text-rose-200 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors border border-rose-800">
            <ShieldAlert className="w-3.5 h-3.5 text-rose-400" /> Safety Review
          </button>
          <button onClick={() => setShowNoteModal(true)} className="px-3.5 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors shadow-md">
            <Plus className="w-3.5 h-3.5" /> Add Case Note
          </button>
        </div>
      </div>

      {/* SVI & Indicators Score Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left SVI Score Card */}
        <div className="lg:col-span-4 bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4 shadow-xl">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">{t('svi_title')}</div>
          
          <div className="flex items-baseline gap-2">
            <span className="text-5xl font-black text-white tracking-tight">{caseData.svi}</span>
            <span className="text-sm font-mono text-slate-400">/ 100</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Risk Assessment:</span>
            <span className={`px-3 py-1 rounded-md text-xs font-black uppercase ${
              caseData.band === 'CRITICAL' ? 'bg-rose-600/20 text-rose-400 border border-rose-500/40' :
              caseData.band === 'HIGH' ? 'bg-orange-600/20 text-orange-400 border border-orange-500/40' :
              caseData.band === 'MODERATE' ? 'bg-amber-600/20 text-amber-400 border border-amber-500/40' :
              'bg-emerald-600/20 text-emerald-400 border border-emerald-500/40'
            }`}>
              {caseData.band}
            </span>
          </div>

          <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
            <div
              className={`h-full transition-all rounded-full ${
                caseData.band === 'CRITICAL' ? 'bg-rose-500' :
                caseData.band === 'HIGH' ? 'bg-orange-500' :
                caseData.band === 'MODERATE' ? 'bg-amber-500' : 'bg-emerald-500'
              }`}
              style={{ width: `${caseData.svi}%` }}
            />
          </div>

          <p className="text-[11px] text-slate-400 italic leading-relaxed border-t border-slate-800 pt-3">
            "This is an AI-assisted vulnerability indicator, not a clinical score or diagnosis."
          </p>
        </div>

        {/* Right Indicators Grid */}
        <div className="lg:col-span-8 bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4 shadow-xl">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">Detected Indicator Dimensions</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {indicatorsBreakdown.map((ind, idx) => (
              <div key={idx} className={`p-3 rounded-xl border flex items-center justify-between ${ind.color}`}>
                <span className="text-xs font-bold text-slate-200">{ind.label}</span>
                <span className="text-xs font-black font-mono uppercase">{ind.level}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Explainability Section ("Why was this case prioritized?") */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-3 shadow-xl">
        <h3 className="text-sm font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
          <Info className="w-4 h-4 text-teal-400" /> {t('explainability_title')}
        </h3>
        
        <div className="space-y-2 text-xs text-slate-300">
          {explainabilityReasons.map((reason, idx) => (
            <div key={idx} className="flex items-center gap-2 p-2.5 bg-slate-950 rounded-xl border border-slate-800">
              <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
              <span>{reason}</span>
            </div>
          ))}
        </div>

        <p className="text-[11px] text-amber-300 italic pt-2">
          Note: These detected indicators support responder prioritization and do not constitute a medical or psychiatric diagnosis.
        </p>
      </div>

      {/* Recommended Support Pathway */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4 shadow-xl">
        <div className="flex flex-wrap items-center justify-between border-b border-slate-800 pb-3 gap-2">
          <h3 className="text-sm font-extrabold text-white uppercase tracking-wider">
            {t('recommended_pathways_title')}
          </h3>
          <span className="text-[11px] text-slate-400 font-mono">
            HUMAN VERIFICATION MANDATORY
          </span>
        </div>

        <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300 font-mono">
          Important: The AI system only recommends actions. Authorized NHAA personnel must verify and approve all interventions.
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {pathways.map((pw, idx) => (
            <div key={idx} className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-white">{pw.name}</span>
                <span className={`px-2 py-0.5 text-[10px] font-black rounded ${
                  pw.priority === 'CRITICAL' ? 'bg-rose-500/20 text-rose-400' :
                  pw.priority === 'HIGH' ? 'bg-orange-500/20 text-orange-400' : 'bg-slate-800 text-slate-300'
                }`}>
                  {pw.priority}
                </span>
              </div>
              <p className="text-xs text-slate-300">{pw.reason}</p>
              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                <span>Assigned: {pw.assigned}</span>
                <span className="text-teal-400 font-bold">{pw.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Note Modal */}
      {showNoteModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-lg p-6 space-y-4 shadow-2xl">
            <h3 className="text-base font-bold text-white">Add Official Case Note</h3>
            <form onSubmit={handleNoteSubmit} className="space-y-4">
              <textarea
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                rows={4}
                placeholder="Enter official officer assessment or action note..."
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-teal-500"
              />
              <div className="flex justify-end gap-2">
                <button type="button" onClick={() => setShowNoteModal(false)} className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl text-xs font-bold">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 bg-teal-600 text-white rounded-xl text-xs font-bold shadow-md">
                  Save Case Note
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
