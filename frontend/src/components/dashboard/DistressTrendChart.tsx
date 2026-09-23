import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export const DistressTrendChart: React.FC = () => {
  const data = [
    { time: '10:00 AM', svi: 32, threat: 20, distress: 40 },
    { time: '10:02 AM', svi: 45, threat: 35, distress: 55 },
    { time: '10:04 AM', svi: 58, threat: 50, distress: 65 },
    { time: '10:06 AM', svi: 72, threat: 75, distress: 70 },
    { time: '10:08 AM', svi: 84, threat: 88, distress: 80 },
    { time: '10:10 AM', svi: 84, threat: 88, distress: 80 }
  ];

  return (
    <div className="glass-card p-5 rounded-xl border border-navy-700/80">
      <div className="flex flex-wrap items-center justify-between mb-4 gap-2">
        <div>
          <h4 className="text-sm font-bold text-white">Live AI Distress & Vulnerability Progression</h4>
          <p className="text-xs text-slate-400">
            Real-time metric trajectories across intake transcript timeline
          </p>
        </div>
        <span className="px-2.5 py-1 bg-navy-800 border border-navy-700 text-slate-300 text-[11px] rounded font-mono font-medium">
          Illustrative AI-assisted indicator trend
        </span>
      </div>

      <div className="h-56 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="sviGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#818CF8" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#818CF8" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="threatGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#F43F5E" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#F43F5E" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
            <XAxis dataKey="time" stroke="#94A3B8" fontSize={11} />
            <YAxis stroke="#94A3B8" fontSize={11} domain={[0, 100]} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#0B192C', borderColor: '#334155', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
            />
            <Area type="monotone" dataKey="svi" name="SVI Index" stroke="#818CF8" strokeWidth={2} fillOpacity={1} fill="url(#sviGradient)" />
            <Area type="monotone" dataKey="threat" name="Threat Level" stroke="#F43F5E" strokeWidth={2} fillOpacity={1} fill="url(#threatGradient)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
