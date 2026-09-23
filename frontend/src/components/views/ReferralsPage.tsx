import React from 'react';
import { GitBranch } from 'lucide-react';

export const ReferralsPage: React.FC = () => {

  const referrals = [
    { id: 'REF-801', caseId: 'NHAA-1042', type: 'Counselling Referral', target: 'Counsellor P. Menon', status: 'In Progress', date: '23 Sep 2026' },
    { id: 'REF-802', caseId: 'NHAA-1088', type: 'Legal Aid Referral', target: 'Advocate V. Sharma', status: 'Assigned', date: '23 Sep 2026' },
    { id: 'REF-803', caseId: 'NHAA-10482', type: 'Safety Assessment', target: 'NHAA Protection Cell', status: 'Pending Review', date: '23 Sep 2026' },
    { id: 'REF-804', caseId: 'NHAA-10487', type: 'Police Liaison', target: 'Emergency Response Unit', status: 'Completed', date: '23 Sep 2026' }
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-extrabold text-white flex items-center gap-2">
            <GitBranch className="w-5 h-5 text-teal-400" /> Multi-Disciplinary Referral System
          </h2>
          <p className="text-xs text-slate-400">Track counselling, legal aid, medical, and protection referrals</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {referrals.map((r) => (
          <div key={r.id} className="bg-slate-900 border border-slate-800 p-5 rounded-3xl space-y-3 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="font-mono font-bold text-teal-300 text-xs">{r.id}</span>
              <span className="px-2.5 py-1 bg-slate-950 border border-slate-800 text-slate-300 text-[10px] font-bold rounded-full">
                {r.status}
              </span>
            </div>

            <div>
              <h4 className="font-bold text-white text-sm">{r.type}</h4>
              <p className="text-xs text-slate-400">Case Reference: <span className="font-mono text-teal-300">{r.caseId}</span></p>
            </div>

            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-300 font-mono">
              <span>Assigned: {r.target}</span>
              <span className="text-slate-500">{r.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
