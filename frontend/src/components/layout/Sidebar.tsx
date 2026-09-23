import React from 'react';
import { 
  LayoutDashboard, 
  Mic, 
  FolderKanban, 
  History, 
  BrainCircuit, 
  GitBranch, 
  CalendarCheck, 
  BarChart3, 
  ShieldCheck, 
  Settings, 
  HelpCircle,
  Home
} from 'lucide-react';

interface SidebarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentTab, setCurrentTab }) => {
  const navItems = [
    { id: 'landing', label: 'Home / Portal', icon: Home },
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'live', label: 'Live First Contact', icon: Mic, badge: 'LIVE' },
    { id: 'cases', label: 'Cases', icon: FolderKanban },
    { id: 'timeline', label: 'Case Timeline', icon: History },
    { id: 'analysis', label: 'AI Analysis', icon: BrainCircuit },
    { id: 'pathway', label: 'Support Pathway', icon: GitBranch },
    { id: 'followups', label: 'Follow-ups', icon: CalendarCheck },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'how-it-works', label: 'How It Works', icon: HelpCircle },
    { id: 'privacy', label: 'Privacy & Consent', icon: ShieldCheck },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <aside className="w-64 bg-navy-900 border-r border-navy-700/60 flex flex-col justify-between shrink-0 h-screen sticky top-0 z-20">
      <div>
        {/* Header Branding */}
        <div className="p-5 border-b border-navy-700/60 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-indigo-500/20">
            S
          </div>
          <div>
            <h1 className="font-bold text-lg text-white tracking-wider">SAHAYA</h1>
            <p className="text-xs text-indigo-300 font-medium">NHAA 14566 AI Layer</p>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-140px)]">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                  isActive
                    ? 'bg-indigo-600/90 text-white shadow-md shadow-indigo-600/30 font-semibold'
                    : 'text-slate-300 hover:bg-navy-800 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="px-1.5 py-0.5 text-[10px] font-bold bg-rose-500 text-white rounded-full animate-pulse">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer Info */}
      <div className="p-4 border-t border-navy-700/60 bg-navy-950/40 text-xs text-slate-400 space-y-1">
        <div className="flex items-center justify-between">
          <span className="font-semibold text-slate-300">SIH Prototype</span>
          <span className="px-1.5 py-0.5 bg-indigo-950 text-indigo-400 border border-indigo-800/60 rounded text-[10px] font-mono">v1.0</span>
        </div>
        <p className="text-[11px] text-slate-500">Synthetic Data Demonstration Only</p>
      </div>
    </aside>
  );
};
