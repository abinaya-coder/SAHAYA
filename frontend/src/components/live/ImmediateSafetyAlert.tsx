import React from 'react';
import { ShieldAlert, CheckCircle2, UserCheck } from 'lucide-react';

interface ImmediateSafetyAlertProps {
  onReview: () => void;
  onAcknowledge: () => void;
  onRecordAction: () => void;
}

export const ImmediateSafetyAlert: React.FC<ImmediateSafetyAlertProps> = ({
  onReview,
  onAcknowledge,
  onRecordAction
}) => {
  return (
    <div className="p-4 bg-gradient-to-r from-rose-950 via-rose-900 to-rose-950 border-2 border-rose-500 rounded-xl text-white space-y-3 shadow-2xl animate-alert-pulse">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-rose-600 rounded-lg text-white">
            <ShieldAlert className="w-6 h-6 animate-bounce" />
          </div>
          <div>
            <h3 className="text-sm font-black tracking-wider text-rose-200 uppercase flex items-center gap-2">
              🚨 IMMEDIATE SAFETY CONCERN DETECTED
            </h3>
            <p className="text-xs text-rose-100 font-medium">
              Current safety-related language detected in complainant statement.
            </p>
          </div>
        </div>

        <span className="px-3 py-1 bg-rose-600 font-black text-xs rounded-full uppercase tracking-wider text-white shadow">
          PRIORITY REVIEW REQUIRED
        </span>
      </div>

      <div className="p-2.5 bg-navy-950/80 border border-rose-700/60 rounded-lg text-xs text-slate-200">
        <span className="font-bold text-rose-400">HUMAN RESPONDER DIRECTIVE:</span>
        <span className="ml-1">Human responder attention recommended immediately. AI system does not invoke automated emergency dispatches.</span>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center gap-2 pt-1">
        <button
          onClick={onReview}
          className="px-4 py-2 bg-white text-rose-950 hover:bg-slate-100 font-extrabold text-xs rounded-lg shadow-md transition-colors flex items-center gap-1.5"
        >
          <ShieldAlert className="w-4 h-4 text-rose-600" />
          REVIEW CASE NOW
        </button>
        <button
          onClick={onAcknowledge}
          className="px-4 py-2 bg-rose-800/80 hover:bg-rose-700 text-white font-bold text-xs rounded-lg border border-rose-600 transition-colors flex items-center gap-1.5"
        >
          <CheckCircle2 className="w-4 h-4" />
          ACKNOWLEDGE
        </button>
        <button
          onClick={onRecordAction}
          className="px-4 py-2 bg-rose-950 hover:bg-rose-900 text-rose-200 font-bold text-xs rounded-lg border border-rose-700 transition-colors flex items-center gap-1.5"
        >
          <UserCheck className="w-4 h-4" />
          RECORD HUMAN ACTION
        </button>
      </div>
    </div>
  );
};
