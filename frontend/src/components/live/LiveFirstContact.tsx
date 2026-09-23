import React, { useState, useEffect } from 'react';
import type { CaseData, AnalysisResponse, SupportedLanguage } from '../../types';
import { AudioRecorder } from './AudioRecorder';
import { TranscriptView } from './TranscriptView';
import { LiveAnalysisPanel } from './LiveAnalysisPanel';
import { ContentSpeechMismatch } from './ContentSpeechMismatch';
import { SviBreakdownCard } from './SviBreakdownCard';
import { NextQuestionCard } from './NextQuestionCard';
import { CaseMemoryCard } from './CaseMemoryCard';
import { ImmediateSafetyAlert } from './ImmediateSafetyAlert';
import { HumanReviewModal } from './HumanReviewModal';
import { analyzeTranscriptClient } from '../../services/nlpEngine';
import { ShieldCheck, UserCheck } from 'lucide-react';

interface LiveFirstContactProps {
  activeCase: CaseData | null;
  onRecordOfficerDecision: (caseId: string, action: string, note?: string) => void;
  onLoadPreset: (caseId: string) => void;
  currentLanguage: SupportedLanguage;
}

export const LiveFirstContact: React.FC<LiveFirstContactProps> = ({
  activeCase,
  onRecordOfficerDecision,
  onLoadPreset,
  currentLanguage
}) => {
  const [originalText, setOriginalText] = useState(activeCase?.originalText || '');
  const [translatedText, setTranslatedText] = useState(activeCase?.translatedText || '');
  const [language, setLanguage] = useState<SupportedLanguage>(activeCase?.language || currentLanguage);
  const [highlightPhrase, setHighlightPhrase] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Sync state when active case changes
  useEffect(() => {
    if (activeCase) {
      setOriginalText(activeCase.originalText);
      setTranslatedText(activeCase.translatedText);
      setLanguage(activeCase.language);
      setHighlightPhrase(null);
    }
  }, [activeCase]);

  // Live Analysis Engine state derived from current transcript
  const analysis: AnalysisResponse = analyzeTranscriptClient(
    originalText,
    language,
    activeCase?.audioMeta,
    activeCase?.caseMemory
  );

  const handleTextChange = (newText: string) => {
    setOriginalText(newText);
    setTranslatedText(newText);
  };

  const handleTranscriptChunk = (chunk: string) => {
    const updated = originalText ? `${originalText} ${chunk}` : chunk;
    setOriginalText(updated);
    setTranslatedText(updated);
  };

  return (
    <div className="space-y-4">
      {/* Top Banner Alert if Immediate Safety Concern Detected */}
      {analysis.immediateSafety && (
        <ImmediateSafetyAlert
          onReview={() => setIsModalOpen(true)}
          onAcknowledge={() => {}}
          onRecordAction={() => setIsModalOpen(true)}
        />
      )}

      {/* Main Split Screen Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* LEFT COLUMN: Intake, Recorder & Transcript (5 cols on lg) */}
        <div className="lg:col-span-5 space-y-4">
          <AudioRecorder
            onTranscriptChunk={handleTranscriptChunk}
            audioMeta={analysis.speechMetrics}
          />

          <TranscriptView
            originalText={originalText}
            translatedText={translatedText}
            language={language}
            highlightPhrase={highlightPhrase}
            onTextChange={handleTextChange}
            onLoadPreset={onLoadPreset}
          />
        </div>

        {/* RIGHT COLUMN: Live AI Intelligence Panel (7 cols on lg) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Content-Speech Incongruence Alert */}
          <ContentSpeechMismatch mismatch={analysis.mismatch} />

          {/* SVI Gauge Card */}
          <SviBreakdownCard
            svi={analysis.svi}
            band={analysis.band}
            confidence={analysis.confidence}
            indicators={analysis.indicators}
            onSelectEvidence={(phrase) => setHighlightPhrase(phrase)}
          />

          {/* Live Indicator Breakdown Matrix */}
          <LiveAnalysisPanel
            indicators={analysis.indicators}
            onSelectEvidence={(phrase) => setHighlightPhrase(phrase)}
          />

          {/* Suggested Next Trauma-Sensitive Question Engine */}
          <NextQuestionCard
            question={analysis.suggestedNextQuestion}
            rationale={analysis.nextQuestionRationale}
            warning={analysis.avoidRepetitionWarning}
          />

          {/* Trauma-Sensitive Case Memory ("Never Make Me Repeat") */}
          <CaseMemoryCard memory={activeCase?.caseMemory || {}} />

          {/* Human Review Action Trigger */}
          <div className="glass-card p-4 rounded-xl border border-indigo-700/60 flex items-center justify-between bg-gradient-to-r from-navy-900 to-indigo-950">
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> Human Officer Decision Panel
              </h4>
              <p className="text-[11px] text-slate-300">
                Final assessment status: <span className="font-bold text-indigo-300">{activeCase?.humanReviewStatus || 'Pending Review'}</span>
              </p>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-xs shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-2"
            >
              <UserCheck className="w-4 h-4" /> Record Officer Action
            </button>
          </div>
        </div>
      </div>

      {/* Human Review Modal */}
      {activeCase && (
        <HumanReviewModal
          caseId={activeCase.id}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmitDecision={(action, note) => onRecordOfficerDecision(activeCase.id, action, note)}
        />
      )}
    </div>
  );
};
