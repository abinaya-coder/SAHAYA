import React, { useState } from 'react';
import { ShieldCheck, Check, Edit3, X, Save } from 'lucide-react';

interface HumanReviewModalProps {
  caseId: string;
  isOpen: boolean;
  onClose: () => void;
  onSubmitDecision: (action: string, note?: string) => void;
}

export const HumanReviewModal: React.FC<HumanReviewModalProps> = ({
  caseId,
  isOpen,
  onClose,
  onSubmitDecision
}) => {
  const [selectedAction, setSelectedAction] = useState<string>('Confirm');
  const [note, setNote] = useState<string>('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitDecision(selectedAction, note);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-navy-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-navy-900 border border-navy-700 rounded-2xl w-full max-w-lg p-6 space-y-4 shadow-2xl">
        <div className="flex items-center justify-between border-b border-navy-800 pb-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-indigo-400" />
            <h3 className="text-base font-bold text-white">Record Human Officer Assessment</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-3 bg-indigo-950/50 border border-indigo-800/60 rounded-lg text-xs text-indigo-200 font-medium">
          "AI-assisted indicator — final assessment and action remain with the authorized human officer."
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              Officer Decision ({caseId}):
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'Confirm', label: 'Confirm AI Indicators', icon: Check, color: 'bg-emerald-600 hover:bg-emerald-500' },
                { id: 'Modify', label: 'Modify Priority', icon: Edit3, color: 'bg-amber-600 hover:bg-amber-500' },
                { id: 'Dismiss', label: 'Dismiss Indicator', icon: X, color: 'bg-rose-600 hover:bg-rose-500' }
              ].map((opt) => {
                const Icon = opt.icon;
                const isSelected = selectedAction === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setSelectedAction(opt.id)}
                    className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all ${
                      isSelected 
                        ? `${opt.color} text-white border-white shadow-lg` 
                        : 'bg-navy-800 text-slate-300 border-navy-700 hover:bg-navy-700'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{opt.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
              Officer Note / Rationale (Optional):
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={3}
              placeholder="Record official human assessment rationale for case file..."
              className="w-full bg-navy-950 border border-navy-700 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="flex items-center justify-end gap-2 border-t border-navy-800 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-navy-800 hover:bg-navy-700 text-slate-300 rounded-lg text-xs font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-md"
            >
              <Save className="w-4 h-4" /> Record Official Action
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
