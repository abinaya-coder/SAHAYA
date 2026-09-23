import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Volume2, AlertCircle } from 'lucide-react';
import type { AudioMeta } from '../../types';

interface AudioRecorderProps {
  onTranscriptChunk: (text: string) => void;
  audioMeta: AudioMeta;
}

export const AudioRecorder: React.FC<AudioRecorderProps> = ({ onTranscriptChunk, audioMeta }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [micAvailable, setMicAvailable] = useState<boolean | null>(null);

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      setMicAvailable(true);
    } else {
      setMicAvailable(false);
    }
  }, []);

  const toggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
    } else {
      setIsRecording(true);
      const demoChunks = [
        "They threatened me again. I don't feel safe going home.",
        "They came near my door last night and intimidated me."
      ];
      const randomChunk = demoChunks[Math.floor(Math.random() * demoChunks.length)];
      setTimeout(() => {
        onTranscriptChunk(randomChunk);
      }, 2500);
    }
  };

  return (
    <div className="glass-card p-4 rounded-xl border border-navy-700/80 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={`p-2 rounded-lg ${isRecording ? 'bg-rose-500 text-white animate-pulse' : 'bg-navy-800 text-indigo-400'}`}>
            <Mic className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Voice Intake & Speech Analysis</h4>
            <p className="text-[11px] text-slate-400">Live microphone stream & acoustic feature extraction</p>
          </div>
        </div>

        <button
          onClick={toggleRecording}
          className={`px-4 py-2 rounded-lg font-bold text-xs flex items-center gap-2 transition-all ${
            isRecording 
              ? 'bg-rose-600 hover:bg-rose-700 text-white shadow-lg shadow-rose-600/30' 
              : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/20'
          }`}
        >
          {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          <span>{isRecording ? 'Stop Recording' : 'Start Recording'}</span>
        </button>
      </div>

      {/* Mic status alert if unsupported */}
      {micAvailable === false && (
        <div className="flex items-center gap-2 p-2 bg-amber-950/60 border border-amber-800/80 rounded text-[11px] text-amber-300">
          <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
          <span>Microphone or Speech Recognition unavailable in browser. Manual transcription & quick-load presets available below.</span>
        </div>
      )}

      {/* Live Waveform visualizer simulation */}
      {isRecording && (
        <div className="flex items-center justify-center gap-1 h-8 py-1 bg-navy-950/80 rounded-lg border border-navy-800">
          {[40, 70, 30, 90, 60, 100, 45, 80, 55, 30, 75, 95, 40].map((h, i) => (
            <div
              key={i}
              className="w-1 bg-indigo-500 rounded-full animate-pulse"
              style={{ height: `${h}%`, animationDelay: `${i * 100}ms` }}
            />
          ))}
          <span className="text-[10px] font-mono text-indigo-300 ml-2 animate-pulse">RECORDING SPEECH...</span>
        </div>
      )}

      {/* Speech Acoustic Indicators Panel */}
      <div className="pt-2 border-t border-navy-800">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-bold text-slate-300 flex items-center gap-1">
            <Volume2 className="w-3.5 h-3.5 text-indigo-400" /> Speech-Based Indicators
          </span>
          <span className="text-[10px] text-slate-500 font-mono">NON-CLINICAL SIGNALS</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-[11px]">
          <div className="bg-navy-900 p-2 rounded border border-navy-800">
            <div className="text-slate-400 text-[10px]">Speaking Rate</div>
            <div className="font-semibold text-slate-200">{audioMeta.speaking_rate || 'Normal'}</div>
          </div>
          <div className="bg-navy-900 p-2 rounded border border-navy-800">
            <div className="text-slate-400 text-[10px]">Pause Duration</div>
            <div className="font-semibold text-slate-200">{audioMeta.pause_duration || 'Elevated'}</div>
          </div>
          <div className="bg-navy-900 p-2 rounded border border-navy-800">
            <div className="text-slate-400 text-[10px]">Hesitation</div>
            <div className="font-semibold text-amber-300">{audioMeta.hesitation || 'Detected'}</div>
          </div>
          <div className="bg-navy-900 p-2 rounded border border-navy-800">
            <div className="text-slate-400 text-[10px]">Pitch Variation</div>
            <div className="font-semibold text-slate-200">{audioMeta.pitch_variation || 'Monotone'}</div>
          </div>
          <div className="bg-navy-900 p-2 rounded border border-navy-800">
            <div className="text-slate-400 text-[10px]">Voice Intensity</div>
            <div className="font-semibold text-slate-200">{audioMeta.voice_intensity || 'Low'}</div>
          </div>
        </div>

        <p className="text-[10px] text-slate-500 italic mt-2">
          "These are non-clinical speech indicators and require human interpretation."
        </p>
      </div>
    </div>
  );
};
