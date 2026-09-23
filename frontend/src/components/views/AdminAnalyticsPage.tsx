import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, CartesianGrid } from 'recharts';
import { BarChart3 } from 'lucide-react';

export const AdminAnalyticsPage: React.FC = () => {
  const priorityData = [
    { name: 'Critical', count: 2, fill: '#F43F5E' },
    { name: 'High', count: 3, fill: '#F97316' },
    { name: 'Moderate', count: 2, fill: '#F59E0B' },
    { name: 'Low', count: 1, fill: '#10B981' }
  ];

  const languageData = [
    { name: 'English', value: 3, fill: '#6366F1' },
    { name: 'Tamil', value: 1, fill: '#8B5CF6' },
    { name: 'Hindi', value: 1, fill: '#EC4899' },
    { name: 'Bengali', value: 1, fill: '#10B981' },
    { name: 'Telugu', value: 1, fill: '#F59E0B' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between border-b border-navy-800 pb-3 gap-2">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-indigo-400" /> Administrative Analytics Console
          </h2>
          <p className="text-xs text-slate-400">High-level aggregate statistics & system performance metrics</p>
        </div>

        <span className="px-3 py-1 bg-amber-950 text-amber-300 border border-amber-800 text-xs font-mono font-semibold rounded-full">
          Demonstration data — not real NHAA statistics
        </span>
      </div>

      {/* Analytics Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="glass-card p-4 rounded-xl border border-navy-700/80">
          <div className="text-xs font-semibold text-slate-400">Total Prototype Cases</div>
          <div className="text-3xl font-extrabold text-white mt-1">8</div>
          <p className="text-[11px] text-indigo-300 mt-1">Synthetic SIH Dataset</p>
        </div>
        <div className="glass-card p-4 rounded-xl border border-navy-700/80">
          <div className="text-xs font-semibold text-slate-400">Immediate Safety Rate</div>
          <div className="text-3xl font-extrabold text-rose-400 mt-1">37.5%</div>
          <p className="text-[11px] text-rose-300 mt-1">3 of 8 cases flagged</p>
        </div>
        <div className="glass-card p-4 rounded-xl border border-navy-700/80">
          <div className="text-xs font-semibold text-slate-400">Avg Officer Review Time</div>
          <div className="text-3xl font-extrabold text-emerald-400 mt-1">3.4 min</div>
          <p className="text-[11px] text-emerald-300 mt-1">First contact decision</p>
        </div>
        <div className="glass-card p-4 rounded-xl border border-navy-700/80">
          <div className="text-xs font-semibold text-slate-400">Supported Languages</div>
          <div className="text-3xl font-extrabold text-indigo-400 mt-1">5</div>
          <p className="text-[11px] text-indigo-300 mt-1">EN, TA, HI, BN, TE</p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Cases by Priority Band */}
        <div className="glass-card p-5 rounded-xl border border-navy-700/80 space-y-3">
          <h4 className="text-sm font-bold text-white">Cases by SVI Priority Band</h4>
          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={priorityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="name" stroke="#94A3B8" fontSize={12} />
                <YAxis stroke="#94A3B8" fontSize={12} allowDecimals={false} />
                <Tooltip contentStyle={{ backgroundColor: '#0B192C', borderColor: '#334155', color: '#fff' }} />
                <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                  {priorityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Cases by Language */}
        <div className="glass-card p-5 rounded-xl border border-navy-700/80 space-y-3">
          <h4 className="text-sm font-bold text-white">Multilingual Intake Distribution</h4>
          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={languageData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} label>
                  {languageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0B192C', borderColor: '#334155', color: '#fff' }} />
                <Legend wrapperStyle={{ fontSize: '12px', color: '#94A3B8' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
