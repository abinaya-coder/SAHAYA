import React, { useState } from 'react';
import type { TimelineEvent } from '../../types';
import { History, Plus, User, Bot } from 'lucide-react';

interface CaseTimelineViewProps {
  timeline: TimelineEvent[];
  onAddEvent: (eventText: string) => void;
}

export const CaseTimelineView: React.FC<CaseTimelineViewProps> = ({ timeline, onAddEvent }) => {
  const [newEvent, setNewEvent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newEvent.trim()) {
      onAddEvent(newEvent.trim());
      setNewEvent('');
    }
  };

  const getActorBadge = (actor: string) => {
    switch (actor) {
      case 'Human Officer':
        return <span className="px-2 py-0.5 bg-indigo-950 text-indigo-300 border border-indigo-700 text-[10px] font-bold rounded flex items-center gap-1"><User className="w-3 h-3" /> Human Officer</span>;
      case 'AI Layer':
        return <span className="px-2 py-0.5 bg-purple-950 text-purple-300 border border-purple-700 text-[10px] font-bold rounded flex items-center gap-1"><Bot className="w-3 h-3" /> AI Indicator</span>;
      default:
        return <span className="px-2 py-0.5 bg-slate-800 text-slate-300 border border-slate-700 text-[10px] font-bold rounded">{actor}</span>;
    }
  };

  return (
    <div className="glass-card p-5 rounded-xl border border-navy-700/80 space-y-4">
      <div className="flex items-center justify-between border-b border-navy-800 pb-3">
        <div className="flex items-center gap-2">
          <History className="w-5 h-5 text-indigo-400" />
          <div>
            <h3 className="text-sm font-bold text-white">Case Audit Timeline</h3>
            <p className="text-xs text-slate-400">Complete chronological record of AI events & human officer actions</p>
          </div>
        </div>
      </div>

      {/* Timeline Stream */}
      <div className="relative pl-6 space-y-4 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-navy-700">
        {timeline.map((item, idx) => (
          <div key={idx} className="relative group">
            <div className="absolute -left-6 top-1.5 w-3 h-3 rounded-full bg-indigo-500 ring-4 ring-navy-900" />
            <div className="bg-navy-900/80 p-3 rounded-xl border border-navy-800 space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-slate-400 font-semibold">{item.timestamp}</span>
                {getActorBadge(item.actor)}
              </div>
              <p className="text-xs font-medium text-slate-200">{item.event}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Manual Timeline Entry Form */}
      <form onSubmit={handleSubmit} className="pt-3 border-t border-navy-800 flex gap-2">
        <input
          type="text"
          value={newEvent}
          onChange={(e) => setNewEvent(e.target.value)}
          placeholder="Add official officer timeline note (e.g. Contacted helpline counsellor, dispatch requested)..."
          className="flex-1 bg-navy-900 border border-navy-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold flex items-center gap-1 transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Event
        </button>
      </form>
    </div>
  );
};
