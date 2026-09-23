import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import type { CaseData } from '../../types';
import { ArrowUpRight, Search } from 'lucide-react';

interface DashboardProps {
  cases: CaseData[];
  onSelectCase: (c: CaseData) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ cases, onSelectCase }) => {
  const { t } = useLanguage();
  const [filterRisk, setFilterRisk] = useState<string>('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  // Explicit aggregate summary stats requested by prompt
  const summaryStats = [
    { title: t('stats_total_cases'), value: '1,284', subtitle: 'Grievance Sessions', color: 'border-slate-700 text-slate-200 bg-slate-900' },
    { title: t('stats_critical'), value: '18', subtitle: 'Emergency Safety Flag', color: 'border-rose-500/50 text-rose-400 bg-rose-950/20' },
    { title: t('stats_high'), value: '94', subtitle: 'SVI > 60 Score', color: 'border-orange-500/50 text-orange-400 bg-orange-950/20' },
    { title: t('stats_moderate'), value: '321', subtitle: 'Support Required', color: 'border-amber-500/50 text-amber-400 bg-amber-950/20' },
    { title: t('stats_low'), value: '851', subtitle: 'Standard Queue', color: 'border-emerald-500/50 text-emerald-400 bg-emerald-950/20' }
  ];

  // Combine demo cases with specific prompt examples
  const allDashboardCases = [
    {
      id: 'NHAA-1042',
      title: 'Intimidation & Stalking Complaint',
      date: '23 Sep',
      channel: '14566',
      language: 'Tamil',
      svi: 87,
      risk: 'Critical',
      indicators: 'Threat, Fear',
      assigned: 'Unassigned',
      status: 'Needs Review',
      rawCase: cases[0]
    },
    {
      id: 'NHAA-1088',
      title: 'Digital Blackmail & Extortion',
      date: '23 Sep',
      channel: 'Chatbot',
      language: 'Hindi',
      svi: 73,
      risk: 'High',
      indicators: 'Threats, Blackmail',
      assigned: 'Officer K. Sharma',
      status: 'Under Review',
      rawCase: cases[1]
    },
    {
      id: 'NHAA-1102',
      title: 'Academic Overwhelm Call',
      date: '23 Sep',
      channel: 'Mobile App',
      language: 'English',
      svi: 44,
      risk: 'Moderate',
      indicators: 'Academic Distress',
      assigned: 'Counsellor P. Menon',
      status: 'Referred',
      rawCase: cases[7] || cases[0]
    },
    ...cases.map(c => ({
      id: c.id,
      title: c.title,
      date: '23 Sep',
      channel: '14566',
      language: c.languageName,
      svi: c.svi,
      risk: c.band === 'CRITICAL' ? 'Critical' : c.band === 'HIGH' ? 'High' : c.band === 'MODERATE' ? 'Moderate' : 'Low',
      indicators: c.indicators.map(i => i.type.replace('_', ' ')).join(', ') || 'Help Request',
      assigned: c.assignedOfficer,
      status: c.humanReviewStatus === 'Pending Review' ? 'Needs Review' : 'Under Review',
      rawCase: c
    }))
  ];

  const filteredCases = allDashboardCases.filter(c => {
    const matchesSearch = c.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          c.indicators.toLowerCase().includes(searchTerm.toLowerCase());
    if (!matchesSearch) return false;

    if (filterRisk === 'ALL') return true;
    return c.risk.toUpperCase() === filterRisk;
  });

  const getRiskBadge = (risk: string) => {
    switch (risk.toUpperCase()) {
      case 'CRITICAL':
        return <span className="px-2.5 py-1 rounded-md text-[11px] font-black bg-rose-600/20 text-rose-400 border border-rose-500/40 uppercase">{t('risk_critical')}</span>;
      case 'HIGH':
        return <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-orange-600/20 text-orange-400 border border-orange-500/40 uppercase">{t('risk_high')}</span>;
      case 'MODERATE':
        return <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-amber-600/20 text-amber-400 border border-amber-500/40 uppercase">{t('risk_moderate')}</span>;
      default:
        return <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-emerald-600/20 text-emerald-400 border border-emerald-500/40 uppercase">{t('risk_low')}</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Non-clinical banner */}
      <div className="p-3 bg-slate-900 border border-slate-800 rounded-2xl text-xs text-slate-300 flex items-center justify-between font-mono">
        <span className="font-semibold text-teal-400">DECISION SUPPORT MANDATE:</span>
        <span>{t('non_clinical_disclaimer')}</span>
      </div>

      {/* Summary Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {summaryStats.map((st, idx) => (
          <div key={idx} className={`p-4 rounded-2xl border ${st.color} shadow-sm transition-all hover:scale-[1.01]`}>
            <div className="text-xs font-bold text-slate-400">{st.title}</div>
            <div className="text-3xl font-black tracking-tight mt-1 text-white">{st.value}</div>
            <div className="text-[11px] font-mono text-slate-400 mt-1">{st.subtitle}</div>
          </div>
        ))}
      </div>

      {/* Priority Cases Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl space-y-4">
        <div className="p-5 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-extrabold text-white tracking-tight flex items-center gap-2">
              <span>{t('priority_cases_title')}</span>
              <span className="px-2.5 py-0.5 bg-teal-950 text-teal-300 border border-teal-800 rounded text-[10px] font-mono">
                AI-Assisted Assessment
              </span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Prioritized according to Stress Vulnerability Index (SVI) score
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-300">
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search case ID, keyword..."
                className="bg-transparent text-white focus:outline-none w-36"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto">
              {['ALL', 'CRITICAL', 'HIGH', 'MODERATE', 'LOW'].map(r => (
                <button
                  key={r}
                  onClick={() => setFilterRisk(r)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    filterRisk === r 
                      ? 'bg-teal-600 text-white shadow-md' 
                      : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-950 text-slate-400 border-b border-slate-800 font-bold uppercase tracking-wider text-[11px]">
                <th className="p-4">{t('col_case_id')}</th>
                <th className="p-4">{t('col_date')}</th>
                <th className="p-4">{t('col_channel')}</th>
                <th className="p-4">{t('col_language')}</th>
                <th className="p-4">{t('col_svi')}</th>
                <th className="p-4">{t('col_risk')}</th>
                <th className="p-4">{t('col_indicators')}</th>
                <th className="p-4">{t('col_assigned')}</th>
                <th className="p-4">{t('col_status')}</th>
                <th className="p-4 text-right">{t('col_action')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-slate-200">
              {filteredCases.map((c, idx) => (
                <tr
                  key={idx}
                  onClick={() => onSelectCase(c.rawCase)}
                  className="hover:bg-slate-800/50 transition-colors cursor-pointer group"
                >
                  <td className="p-4 font-mono font-bold text-teal-300 group-hover:text-teal-200">
                    {c.id}
                  </td>
                  <td className="p-4 text-slate-400 font-mono">{c.date}</td>
                  <td className="p-4 font-semibold text-slate-300">{c.channel}</td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 bg-slate-950 border border-slate-800 rounded text-slate-300">
                      {c.language}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="font-extrabold text-sm text-white">{c.svi}</span>
                    <span className="text-[10px] text-slate-500 font-mono">/100</span>
                  </td>
                  <td className="p-4">{getRiskBadge(c.risk)}</td>
                  <td className="p-4 text-slate-300 font-medium max-w-xs truncate">{c.indicators}</td>
                  <td className="p-4 text-slate-400">{c.assigned}</td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-950 border border-slate-800 text-slate-300">
                      {c.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectCase(c.rawCase);
                      }}
                      className="px-3 py-1.5 bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs rounded-lg transition-all shadow-sm inline-flex items-center gap-1"
                    >
                      Review <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
