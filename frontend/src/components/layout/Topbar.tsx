import React from 'react';
import { useRole } from '../../context/RoleContext';
import type { UserRole, SupportedLanguage } from '../../types';
import { Activity, Globe, User, Bell, ChevronDown } from 'lucide-react';

interface TopbarProps {
  currentLanguage: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
}

export const Topbar: React.FC<TopbarProps> = ({ currentLanguage, setLanguage }) => {
  const { role, setRole } = useRole();

  const roleLabels: Record<UserRole, { title: string; color: string; icon: string }> = {
    COMPLAINANT: { title: 'First Contact / Victim Portal', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40', icon: '👤' },
    OFFICER: { title: 'Authorized Human Officer', color: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40', icon: '🛡️' },
    COUNSELLOR: { title: 'Counsellor View', color: 'bg-violet-500/20 text-violet-300 border-violet-500/40', icon: '💚' },
    LEGAL: { title: 'Legal & Support Officer', color: 'bg-amber-500/20 text-amber-300 border-amber-500/40', icon: '⚖️' },
    ADMIN: { title: 'Administrator', color: 'bg-sky-500/20 text-sky-300 border-sky-500/40', icon: '⚙️' }
  };

  const languages: { code: SupportedLanguage; label: string }[] = [
    { code: 'en', label: 'English' },
    { code: 'ta', label: 'தமிழ் (Tamil)' },
    { code: 'hi', label: 'हिंदी (Hindi)' },
    { code: 'bn', label: 'বাংলা (Bengali)' },
    { code: 'te', label: 'తెలుగు (Telugu)' }
  ];

  return (
    <header className="h-16 bg-navy-900/90 backdrop-blur-md border-b border-navy-700/60 px-6 flex items-center justify-between sticky top-0 z-10">
      {/* Left: Branding & Subtitle */}
      <div className="flex items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-white tracking-wide">SAHAYA</h2>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-900/80 text-indigo-300 border border-indigo-700">
              NHAA 14566
            </span>
          </div>
          <p className="text-xs text-slate-400 font-medium hidden md:block">
            AI Co-Pilot for Trauma-Sensitive Response
          </p>
        </div>

        {/* System Online Status */}
        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 bg-emerald-950/60 border border-emerald-800/60 rounded-full text-xs text-emerald-400 font-medium">
          <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
          <span>ONLINE</span>
        </div>
      </div>

      {/* Right: Role Switcher & Controls */}
      <div className="flex items-center gap-3">
        {/* Language Selector */}
        <div className="flex items-center gap-1.5 bg-navy-800 border border-navy-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-200">
          <Globe className="w-3.5 h-3.5 text-indigo-400" />
          <select
            value={currentLanguage}
            onChange={(e) => setLanguage(e.target.value as SupportedLanguage)}
            className="bg-transparent text-slate-200 font-medium focus:outline-none cursor-pointer"
          >
            {languages.map(l => (
              <option key={l.code} value={l.code} className="bg-navy-900 text-slate-200">
                {l.label}
              </option>
            ))}
          </select>
        </div>

        {/* Role Switcher */}
        <div className="relative group">
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-semibold cursor-pointer transition-all ${roleLabels[role].color}`}>
            <span>{roleLabels[role].icon}</span>
            <span>{roleLabels[role].title}</span>
            <ChevronDown className="w-3.5 h-3.5 opacity-70" />
          </div>

          <div className="absolute right-0 mt-1 w-60 bg-navy-900 border border-navy-700 rounded-xl shadow-2xl p-2 hidden group-hover:block z-30">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2 py-1 border-b border-navy-800 mb-1">
              Switch Demo Role
            </div>
            {(['OFFICER', 'COMPLAINANT', 'COUNSELLOR', 'LEGAL', 'ADMIN'] as UserRole[]).map(r => (
              <button
                key={r}
                onClick={() => setRole(r)}
                className={`w-full text-left px-2.5 py-2 rounded-lg text-xs font-medium flex items-center gap-2 transition-colors ${
                  role === r ? 'bg-indigo-600 text-white font-semibold' : 'text-slate-300 hover:bg-navy-800'
                }`}
              >
                <span>{roleLabels[r].icon}</span>
                <span>{roleLabels[r].title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Notifications */}
        <button className="p-2 text-slate-400 hover:text-white bg-navy-800 hover:bg-navy-700 border border-navy-700 rounded-lg relative transition-colors">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full animate-ping"></span>
        </button>

        {/* Profile */}
        <div className="flex items-center gap-2 pl-2 border-l border-navy-700/60">
          <div className="w-8 h-8 rounded-lg bg-navy-800 border border-navy-700 flex items-center justify-center text-slate-300 font-semibold text-xs">
            <User className="w-4 h-4 text-indigo-400" />
          </div>
        </div>
      </div>
    </header>
  );
};
