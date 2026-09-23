import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage, type AppLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import { 
  Shield, 
  Globe, 
  Sun, 
  Moon, 
  Laptop, 
  Bell, 
  User, 
  LogOut,
  LayoutDashboard,
  FolderKanban,
  BrainCircuit,
  Bot,
  GitBranch,
  BarChart3,
  Settings,
  ChevronDown
} from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, setCurrentTab }) => {
  const { profile, logout } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const { theme, setTheme } = useTheme();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const navItems = [
    { id: 'dashboard', labelKey: 'nav_dashboard', icon: LayoutDashboard },
    { id: 'cases', labelKey: 'nav_cases', icon: FolderKanban },
    { id: 'ai-assessment', labelKey: 'nav_ai_assessment', icon: BrainCircuit },
    { id: 'chatbot', labelKey: 'nav_chatbot', icon: Bot },
    { id: 'referrals', labelKey: 'nav_referrals', icon: GitBranch },
    { id: 'reports', labelKey: 'nav_reports', icon: BarChart3 },
    { id: 'settings', labelKey: 'nav_settings', icon: Settings }
  ];

  const languages: { code: AppLanguage; label: string }[] = [
    { code: 'en', label: 'English' },
    { code: 'ta', label: 'தமிழ்' },
    { code: 'hi', label: 'हिंदी' },
    { code: 'te', label: 'తెలుగు' },
    { code: 'kn', label: 'ಕನ್ನಡ' },
    { code: 'ml', label: 'മലയാളം' }
  ];

  return (
    <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-30 shadow-md">
      {/* Top Header Bar */}
      <div className="px-6 py-3 flex items-center justify-between border-b border-slate-800/60">
        {/* Brand Identity */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-600/20 border border-teal-500/40 flex items-center justify-center text-teal-400 font-bold shadow-md">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-extrabold text-white tracking-tight">
                {t('app_name')}
              </h1>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-teal-950 text-teal-300 border border-teal-800">
                14566
              </span>
            </div>
            <p className="text-xs text-slate-400 font-normal hidden md:block">
              {t('app_subtitle')}
            </p>
          </div>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-3">
          {/* Global Language Selector */}
          <div className="flex items-center gap-1.5 bg-slate-950 border border-slate-700/80 rounded-lg px-2.5 py-1.5 text-xs text-slate-200">
            <Globe className="w-3.5 h-3.5 text-teal-400" />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as AppLanguage)}
              className="bg-transparent text-slate-200 font-semibold focus:outline-none cursor-pointer"
            >
              {languages.map(l => (
                <option key={l.code} value={l.code} className="bg-slate-900 text-white">
                  {l.label}
                </option>
              ))}
            </select>
          </div>

          {/* Theme Toggle (Light / Dark / System) */}
          <div className="flex items-center bg-slate-950 border border-slate-700/80 rounded-lg p-0.5 text-xs">
            <button
              onClick={() => setTheme('light')}
              title={t('theme_light')}
              className={`p-1.5 rounded-md transition-colors ${theme === 'light' ? 'bg-teal-600 text-white font-bold' : 'text-slate-400 hover:text-white'}`}
            >
              <Sun className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setTheme('dark')}
              title={t('theme_dark')}
              className={`p-1.5 rounded-md transition-colors ${theme === 'dark' ? 'bg-teal-600 text-white font-bold' : 'text-slate-400 hover:text-white'}`}
            >
              <Moon className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setTheme('system')}
              title={t('theme_system')}
              className={`p-1.5 rounded-md transition-colors ${theme === 'system' ? 'bg-teal-600 text-white font-bold' : 'text-slate-400 hover:text-white'}`}
            >
              <Laptop className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 text-slate-300 hover:text-white bg-slate-950 hover:bg-slate-800 border border-slate-700/80 rounded-lg relative transition-colors"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full animate-ping"></span>
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-3 z-40 space-y-2">
                <div className="text-xs font-bold text-slate-300 border-b border-slate-800 pb-2 px-1 flex items-center justify-between">
                  <span>Priority Alerts</span>
                  <span className="text-[10px] font-mono text-teal-400">3 NEW</span>
                </div>
                <div className="space-y-1 text-xs">
                  <div className="p-2 bg-rose-950/60 border border-rose-800/60 rounded-lg text-rose-200">
                    <span className="font-bold">Critical Case NHAA-1042:</span> Immediate safety concern flagged in Tamil statement.
                  </div>
                  <div className="p-2 bg-amber-950/60 border border-amber-800/60 rounded-lg text-amber-200">
                    <span className="font-bold">High Risk NHAA-1088:</span> New legal aid referral assigned.
                  </div>
                  <div className="p-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-300">
                    <span className="font-bold">System Update:</span> Welfare check-in due for 2 cases.
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2 pl-2 border-l border-slate-800 text-slate-200 hover:text-white"
            >
              <div className="w-8 h-8 rounded-lg bg-teal-600/20 border border-teal-500/40 flex items-center justify-center text-teal-400 font-bold text-xs">
                <User className="w-4 h-4" />
              </div>
              <div className="text-left hidden lg:block">
                <div className="text-xs font-bold text-white line-clamp-1">{profile.fullName}</div>
                <div className="text-[10px] text-slate-400 font-mono">{profile.role}</div>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-2 z-40 space-y-1">
                <div className="p-2 border-b border-slate-800 text-xs">
                  <div className="font-bold text-white">{profile.fullName}</div>
                  <div className="text-[11px] text-teal-400">{profile.role}</div>
                  <div className="text-[10px] text-slate-400 truncate">{profile.department}</div>
                </div>
                <button
                  onClick={() => setCurrentTab('settings')}
                  className="w-full text-left px-3 py-2 text-xs text-slate-300 hover:bg-slate-800 rounded-lg flex items-center gap-2"
                >
                  <Settings className="w-3.5 h-3.5 text-teal-400" /> {t('nav_settings')}
                </button>
                <button
                  onClick={logout}
                  className="w-full text-left px-3 py-2 text-xs text-rose-300 hover:bg-rose-950/60 rounded-lg flex items-center gap-2 font-semibold"
                >
                  <LogOut className="w-3.5 h-3.5" /> Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className="px-6 flex items-center gap-1 overflow-x-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentTab(item.id)}
              className={`px-4 py-3 text-xs font-bold flex items-center gap-2 border-b-2 transition-all whitespace-nowrap ${
                isActive
                  ? 'border-teal-500 text-teal-400 bg-teal-950/20'
                  : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{t(item.labelKey)}</span>
            </button>
          );
        })}
      </nav>
    </header>
  );
};
