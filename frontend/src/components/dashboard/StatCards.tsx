import React from 'react';
import type { CaseData } from '../../types';
import { ShieldAlert, Activity, HeartHandshake, Clock, CalendarCheck } from 'lucide-react';

interface StatCardsProps {
  cases: CaseData[];
}

export const StatCards: React.FC<StatCardsProps> = ({ cases }) => {
  const activeCount = cases.filter(c => c.caseStatus === 'Active').length;
  const safetyCount = cases.filter(c => c.immediateSafety).length;
  const highSupportCount = cases.filter(c => c.svi >= 60).length;
  const pendingReviewCount = cases.filter(c => c.humanReviewStatus === 'Pending Review').length;
  const followupsDueCount = 2;

  const stats = [
    {
      title: 'Active Cases',
      value: activeCount,
      subtitle: 'Open NHAA 14566 Sessions',
      icon: Activity,
      color: 'border-indigo-500/40 text-indigo-400 bg-indigo-500/10'
    },
    {
      title: 'Immediate Safety Concerns',
      value: safetyCount,
      subtitle: 'Current safety language flagged',
      icon: ShieldAlert,
      color: 'border-rose-500/50 text-rose-400 bg-rose-500/10 animate-alert-pulse'
    },
    {
      title: 'High Support Need',
      value: highSupportCount,
      subtitle: 'SVI > 60 Vulnerability score',
      icon: HeartHandshake,
      color: 'border-amber-500/40 text-amber-400 bg-amber-500/10'
    },
    {
      title: 'Pending Human Review',
      value: pendingReviewCount,
      subtitle: 'Awaiting officer action',
      icon: Clock,
      color: 'border-sky-500/40 text-sky-400 bg-sky-500/10'
    },
    {
      title: 'Follow-ups Due',
      value: followupsDueCount,
      subtitle: '24h / 72h check-in required',
      icon: CalendarCheck,
      color: 'border-emerald-500/40 text-emerald-400 bg-emerald-500/10'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {stats.map((s, idx) => {
        const Icon = s.icon;
        return (
          <div
            key={idx}
            className={`glass-card p-4 rounded-xl border ${s.color} transition-all duration-200 hover:scale-[1.02]`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-300">{s.title}</span>
              <Icon className="w-5 h-5 shrink-0" />
            </div>
            <div className="text-3xl font-extrabold text-white tracking-tight">{s.value}</div>
            <p className="text-[11px] text-slate-400 mt-1">{s.subtitle}</p>
          </div>
        );
      })}
    </div>
  );
};
