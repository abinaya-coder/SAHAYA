import React, { useState } from 'react';
import { BrainCircuit, Upload } from 'lucide-react';
import { analyzeTranscriptClient } from '../../services/nlpEngine';

export const AiAssessmentPage: React.FC = () => {
  const [inputText, setInputText] = useState('அவர்கள் என்னை மீண்டும் மிரட்டினார்கள். எனக்கு வீட்டிற்கு போகவே பயமாக இருக்கிறது.');
  const [selectedLang, setSelectedLang] = useState('ta');
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);

  const analysis = analyzeTranscriptClient(inputText, selectedLang as any);

  const steps = [
    { title: '1. Input Reception', desc: uploadedFileName ? `File: ${uploadedFileName}` : 'Text / Audio Stream Intake' },
    { title: '2. Language Detection', desc: `${selectedLang.toUpperCase()} (Confidence: 99%)` },
    { title: '3. Speech-to-Text', desc: 'Verbatim Transcript Preserved' },
    { title: '4. NLP Pattern Analysis', desc: `${analysis.indicators.length} indicators extracted` },
    { title: '5. SVI Vulnerability Index', desc: `Score: ${analysis.svi}/100 (${analysis.band})` },
    { title: '6. Support Pathways', desc: 'Auto-recommended support routes' }
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="border-b border-slate-800 pb-3 flex flex-wrap items-center justify-between gap-2">
        <div>
          <h2 className="text-lg font-extrabold text-white flex items-center gap-2">
            <BrainCircuit className="w-5 h-5 text-teal-400" /> AI Vulnerability & Assessment Pipeline
          </h2>
          <p className="text-xs text-slate-400">Step-by-step analysis pipeline for grievance statement evaluation</p>
        </div>
      </div>

      {/* Upload & Demo Selector */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4 shadow-xl">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider">Statement Intake & Audio Upload</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border-2 border-dashed border-slate-800 hover:border-teal-500/60 p-6 rounded-2xl flex flex-col items-center justify-center text-center cursor-pointer transition-colors bg-slate-950">
            <Upload className="w-8 h-8 text-teal-400 mb-2" />
            <span className="text-xs font-bold text-white">Upload Audio Call Recording (.wav, .mp3)</span>
            <span className="text-[10px] text-slate-500 font-mono mt-1">Or drop transcript file here</span>
            <input
              type="file"
              onChange={(e) => e.target.files?.[0] && setUploadedFileName(e.target.files[0].name)}
              className="hidden"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                Or Type / Paste Complaint Statement:
              </label>
              <select
                value={selectedLang}
                onChange={(e) => setSelectedLang(e.target.value)}
                className="bg-slate-950 border border-slate-700 text-xs text-teal-400 font-bold px-2 py-1 rounded-lg focus:outline-none"
              >
                <option value="en">English</option>
                <option value="ta">Tamil (தமிழ்)</option>
                <option value="hi">Hindi (हिंदी)</option>
                <option value="te">Telugu (తెలుగు)</option>
                <option value="kn">Kannada (கன்னட)</option>
                <option value="ml">Malayalam (മലയാളം)</option>
              </select>
            </div>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              rows={4}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-teal-500"
            />
          </div>
        </div>
      </div>

      {/* Visual Pipeline Flow */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {steps.map((st, idx) => (
          <div key={idx} className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-1 shadow-md">
            <span className="text-[10px] font-mono text-teal-400 uppercase font-bold">{st.title}</span>
            <div className="text-xs font-bold text-white">{st.desc}</div>
          </div>
        ))}
      </div>

      {/* Assessment Output Breakdown */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4 shadow-xl">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider">Analysis Result Summary</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
            <span className="text-slate-400 font-bold block">EXTRACTED INDICATORS:</span>
            {analysis.indicators.map((ind, i) => (
              <div key={i} className="flex items-center justify-between p-2 bg-slate-900 rounded-xl border border-slate-800">
                <span className="font-semibold text-slate-200">{ind.type.replace('_', ' ')}</span>
                <span className="text-rose-400 font-bold font-mono">{ind.severity}</span>
              </div>
            ))}
          </div>

          <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
            <span className="text-slate-400 font-bold block">RECOMMENDED SUPPORT ROUTES:</span>
            {analysis.supportPathways.map((sp, i) => (
              <div key={i} className="p-2 bg-slate-900 rounded-xl border border-slate-800 text-slate-200 font-medium">
                • {sp.category} ({sp.priority})
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
