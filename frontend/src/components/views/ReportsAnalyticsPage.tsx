import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, CartesianGrid } from 'recharts';
import { BarChart3 } from 'lucide-react';

export const ReportsAnalyticsPage: React.FC = () => {
  const riskCategoryData = [
    { name: 'Critical', count: 18, fill: '#F43F5E' },
    { name: 'High', count: 94, fill: '#F97316' },
    { name: 'Moderate', count: 321, fill: '#F59E0B' },
    { name: 'Low', count: 851, fill: '#10B981' }
  ];

  const channelData = [
    { name: '14566 Helpline', value: 680, fill: '#0D9488' },
    { name: 'AI Chatbot', value: 410, fill: '#3B82F6' },
    { name: 'Mobile App', value: 194, fill: '#8B5CF6' }
  ];

  const referralData = [
    { name: 'Counselling Referrals', count: 184 },
    { name: 'Legal Aid Referrals', count: 142 },
    { name: 'Safety Intervention Referrals', count: 68 }
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="border-b border-slate-800 pb-3 flex flex-wrap items-center justify-between gap-2">
        <div>
          <h2 className="text-lg font-extrabold text-white flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-teal-400" /> Platform Governance & Analytics
          </h2>
          <p className="text-xs text-slate-400">Aggregated non-PII metrics for operational monitoring</p>
        </div>
      </div>

      {/* Metric Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl">
          <div className="text-xs font-bold text-slate-400">Total Cases Processed</div>
          <div className="text-3xl font-black text-white mt-1">1,284</div>
          <div className="text-[11px] text-teal-400 font-mono mt-1">100% Confidential Intake</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl">
          <div className="text-xs font-bold text-slate-400">Immediate Review Needed</div>
          <div className="text-3xl font-black text-rose-400 mt-1">18</div>
          <div className="text-[11px] text-rose-300 font-mono mt-1">Active Critical Flags</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl">
          <div className="text-xs font-bold text-slate-400">Avg First Contact Time</div>
          <div className="text-3xl font-black text-emerald-400 mt-1">3.4 min</div>
          <div className="text-[11px] text-emerald-300 font-mono mt-1">NHAA Officer Response</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl">
          <div className="text-xs font-bold text-slate-400">Total Referrals Executed</div>
          <div className="text-3xl font-black text-teal-400 mt-1">
            {referralData.reduce((acc, curr) => acc + curr.count, 0)}
          </div>
          <div className="text-[11px] text-teal-300 font-mono mt-1">Legal / Counselling / Safety</div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Cases by Risk Category */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-3 shadow-xl">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider">Cases by Risk Category</h4>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={riskCategoryData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="name" stroke="#94A3B8" fontSize={12} />
                <YAxis stroke="#94A3B8" fontSize={12} />
                <Tooltip contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', color: '#fff' }} />
                <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                  {riskCategoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Cases by Channel */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-3 shadow-xl">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider">Cases by Interaction Channel</h4>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={channelData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={75} label>
                  {channelData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', color: '#fff' }} />
                <Legend wrapperStyle={{ fontSize: '12px', color: '#94A3B8' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
