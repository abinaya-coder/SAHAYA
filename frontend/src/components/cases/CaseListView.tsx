import React, { useState } from 'react';
import type { CaseData } from '../../types';
import { Search, Filter, ShieldAlert, Eye } from 'lucide-react';

interface CaseListViewProps {
  cases: CaseData[];
  onSelectCase: (c: CaseData) => void;
}

export const CaseListView: React.FC<CaseListViewProps> = ({ cases, onSelectCase }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterFilter, setFilterFilter] = useState<string>('ALL');

  const filteredCases = cases.filter(c => {
    const matchesSearch = c.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          c.originalText.toLowerCase().includes(searchTerm.toLowerCase());
    if (!matchesSearch) return false;

    switch (filterFilter) {
      case 'SAFETY':
        return c.immediateSafety;
      case 'HIGH':
        return c.band === 'HIGH' || c.band === 'CRITICAL';
      case 'MODERATE':
        return c.band === 'MODERATE';
      case 'LOW':
        return c.band === 'LOW';
      case 'PENDING':
        return c.humanReviewStatus === 'Pending Review';
      default:
        return true;
    }
  });

  return (
    <div className="space-y-4">
      {/* Search & Filter Header */}
      <div className="glass-card p-4 rounded-xl border border-navy-700/80 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-1 min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search cases by ID (NHAA-10482), keywords, language..."
            className="w-full bg-navy-900 border border-navy-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          <Filter className="w-4 h-4 text-indigo-400 shrink-0" />
          {[
            { id: 'ALL', label: 'All Cases' },
            { id: 'SAFETY', label: '🚨 Safety Concerns' },
            { id: 'HIGH', label: 'High / Critical SVI' },
            { id: 'MODERATE', label: 'Moderate' },
            { id: 'LOW', label: 'Low' },
            { id: 'PENDING', label: 'Pending Officer Review' }
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setFilterFilter(f.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                filterFilter === f.id
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-navy-900 text-slate-300 border border-navy-700 hover:bg-navy-800'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Case Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCases.map((c) => (
          <div
            key={c.id}
            onClick={() => onSelectCase(c)}
            className="glass-card p-4 rounded-xl border border-navy-700/80 space-y-3 cursor-pointer transition-all hover:border-indigo-500/80 hover:translate-y-[-2px]"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono font-bold text-indigo-300 text-sm">{c.id}</span>
              <span className="px-2 py-0.5 bg-navy-800 border border-navy-700 text-slate-300 text-[10px] rounded">
                {c.languageName}
              </span>
            </div>

            <div>
              <h4 className="font-bold text-white text-sm line-clamp-1">{c.title}</h4>
              <p className="text-xs text-slate-400 line-clamp-2 mt-1 italic">"{c.originalText}"</p>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-navy-800 text-xs">
              <div>
                <span className="text-[10px] text-slate-400 font-mono block">SVI VULNERABILITY</span>
                <span className="font-black text-white">{c.svi}/100</span>
                <span className={`ml-1.5 px-1.5 py-0.5 text-[10px] font-extrabold rounded ${
                  c.band === 'CRITICAL' ? 'bg-rose-500/20 text-rose-400' :
                  c.band === 'HIGH' ? 'bg-orange-500/20 text-orange-400' :
                  c.band === 'MODERATE' ? 'bg-amber-500/20 text-amber-400' :
                  'bg-emerald-500/20 text-emerald-400'
                }`}>
                  {c.band}
                </span>
              </div>

              {c.immediateSafety && (
                <span className="px-2 py-1 bg-rose-500/20 border border-rose-500/40 text-rose-300 text-[10px] font-bold rounded flex items-center gap-1">
                  <ShieldAlert className="w-3 h-3 text-rose-400" /> SAFETY CONCERN
                </span>
              )}
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onSelectCase(c);
              }}
              className="w-full py-2 bg-navy-900 hover:bg-indigo-600 text-indigo-300 hover:text-white rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-1 border border-navy-700"
            >
              <Eye className="w-3.5 h-3.5" /> View Case File 360°
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
