import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage, type AppLanguage } from '../../context/LanguageContext';
import { Shield, Lock, Globe, HelpCircle, Key, UserCheck } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const { language, setLanguage, t } = useLanguage();

  const [username, setUsername] = useState('officer.raman@nhaa.gov.in');
  const [password, setPassword] = useState('••••••••••••');
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(username);
  };

  const languages: { code: AppLanguage; label: string }[] = [
    { code: 'en', label: 'English' },
    { code: 'ta', label: 'தமிழ் (Tamil)' },
    { code: 'hi', label: 'हिंदी (Hindi)' },
    { code: 'te', label: 'తెలుగు (Telugu)' },
    { code: 'kn', label: 'ಕನ್ನಡ (Kannada)' },
    { code: 'ml', label: 'മലയാളം (Malayalam)' }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4 sm:p-8 font-sans selection:bg-teal-500 selection:text-white">
      <div className="w-full max-w-5xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
        {/* Left Side: NHAA Identity & Description */}
        <div className="lg:col-span-6 bg-gradient-to-br from-slate-950 via-slate-900 to-teal-950/40 p-8 sm:p-12 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-800">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-teal-600/20 border border-teal-500/40 flex items-center justify-center text-teal-400 shadow-lg">
                <Shield className="w-7 h-7" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-teal-400 uppercase tracking-wider block font-mono">
                  {t('helpline_tag')}
                </span>
                <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-snug">
                  {t('app_name')}
                </h1>
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed font-normal">
              {t('app_subtitle')}
            </p>

            <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-2xl space-y-2 text-xs text-slate-400 font-mono">
              <div className="flex items-center gap-2 text-teal-400 font-bold uppercase tracking-wider">
                <Lock className="w-4 h-4" /> Confidential Govt Access
              </div>
              <p className="leading-relaxed">
                {t('secure_access_notice')}
              </p>
            </div>
          </div>

          {/* Simple Abstract Support Illustration */}
          <div className="pt-8 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 font-mono">
            <span className="flex items-center gap-1.5 text-teal-400 font-semibold">
              <UserCheck className="w-4 h-4" /> NHAA Portal v2.4
            </span>
            <span>Government of India Initiative</span>
          </div>
        </div>

        {/* Right Side: Login Card */}
        <div className="lg:col-span-6 p-8 sm:p-12 flex flex-col justify-center bg-slate-900">
          <div className="max-w-md mx-auto w-full space-y-6">
            <div>
              <h2 className="text-2xl font-extrabold text-white tracking-tight">
                {t('login_title')}
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                {t('login_desc')}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  {t('username_label')}
                </label>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-teal-500 transition-colors font-mono"
                  placeholder="officer.id@nhaa.gov.in"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  {t('password_label')}
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-teal-500 transition-colors font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                    <Globe className="w-3.5 h-3.5 text-teal-400" /> {t('language_label')}
                  </label>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value as AppLanguage)}
                    className="w-full bg-slate-950 border border-slate-700 text-slate-200 text-xs rounded-xl px-3 py-2.5 font-semibold focus:outline-none focus:border-teal-500 cursor-pointer"
                  >
                    {languages.map(l => (
                      <option key={l.code} value={l.code} className="bg-slate-900 text-white">
                        {l.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center pt-5">
                  <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded border-slate-700 bg-slate-950 text-teal-600 focus:ring-teal-500"
                    />
                    <span>{t('remember_me')}</span>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-teal-600 hover:bg-teal-500 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-teal-600/30 transition-all flex items-center justify-center gap-2 hover:scale-[1.01]"
              >
                <Key className="w-4 h-4" /> {t('btn_sign_in')}
              </button>
            </form>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <button className="hover:text-teal-400 transition-colors">{t('forgot_password')}</button>
              <button className="hover:text-teal-400 transition-colors flex items-center gap-1">
                <HelpCircle className="w-3.5 h-3.5" /> {t('help_support')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
