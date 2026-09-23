import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage, type AppLanguage } from '../../context/LanguageContext';
import { useTheme, type AppTheme } from '../../context/ThemeContext';
import { 
  Settings, 
  User, 
  Globe, 
  Sun, 
  Moon, 
  Bell, 
  ShieldCheck, 
  Eye, 
  Save,
  Laptop
} from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { profile, saveProfile } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const { theme, setTheme } = useTheme();

  const [activeSection, setActiveSection] = useState<'profile' | 'language' | 'appearance' | 'notifications' | 'privacy' | 'accessibility'>('profile');

  // Form states
  const [fullName, setFullName] = useState(profile.fullName);
  const [role, setRole] = useState(profile.role);
  const [department, setDepartment] = useState(profile.department);
  const [contact, setContact] = useState(profile.contact);
  const [chatbotLang, setChatbotLang] = useState('ta');

  // Notification states
  const [critAlerts, setCritAlerts] = useState(true);
  const [highAlerts, setHighAlerts] = useState(true);
  const [referralAlerts, setReferralAlerts] = useState(true);

  // Accessibility states
  const [highContrast, setHighContrast] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    saveProfile({
      fullName,
      role: role as any,
      department,
      preferredLanguage: language,
      contact
    });
  };

  const sections = [
    { id: 'profile', label: t('tab_profile'), icon: User },
    { id: 'language', label: t('tab_language'), icon: Globe },
    { id: 'appearance', label: t('tab_appearance'), icon: Sun },
    { id: 'notifications', label: t('tab_notifications'), icon: Bell },
    { id: 'privacy', label: t('tab_privacy'), icon: ShieldCheck },
    { id: 'accessibility', label: t('tab_accessibility'), icon: Eye }
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="border-b border-slate-800 pb-3">
        <h2 className="text-lg font-extrabold text-white flex items-center gap-2">
          <Settings className="w-5 h-5 text-teal-400" /> {t('settings_title')}
        </h2>
        <p className="text-xs text-slate-400">Configure officer profile, platform language, appearance, and accessibility</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left Sub-Nav */}
        <div className="md:col-span-3 space-y-1">
          {sections.map((s) => {
            const Icon = s.icon;
            const isActive = activeSection === s.id;
            return (
              <button
                key={s.id}
                onClick={() => setActiveSection(s.id as any)}
                className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-xl text-xs font-bold transition-colors text-left ${
                  isActive
                    ? 'bg-teal-600 text-white shadow-md'
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{s.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right Content */}
        <div className="md:col-span-9 bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl space-y-6">
          {activeSection === 'profile' && (
            <form onSubmit={handleProfileSave} className="space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Officer Profile Settings</h3>
              
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">Full Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-teal-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">Role</label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white cursor-pointer"
                  >
                    <option value="NHAA Officer">NHAA Officer</option>
                    <option value="Counsellor">Counsellor</option>
                    <option value="Legal Support">Legal Support</option>
                    <option value="Case Manager">Case Manager</option>
                    <option value="Administrator">Administrator</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">Department</label>
                  <input
                    type="text"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">Contact Information</label>
                <input
                  type="text"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white"
                />
              </div>

              <button type="submit" className="px-5 py-2.5 bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold rounded-xl shadow-md flex items-center gap-1.5">
                <Save className="w-4 h-4" /> Save Profile Changes
              </button>
            </form>
          )}

          {activeSection === 'language' && (
            <div className="space-y-4 text-xs text-slate-300">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Language & Localization</h3>
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">Officer Interface Language</label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as AppLanguage)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-xs text-white cursor-pointer font-bold"
                >
                  <option value="en">English</option>
                  <option value="ta">தமிழ் (Tamil)</option>
                  <option value="hi">हिंदी (Hindi)</option>
                  <option value="te">తెలుగు (Telugu)</option>
                  <option value="kn">ಕನ್ನಡ (Kannada)</option>
                  <option value="ml">മലയാളം (Malayalam)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">Default Victim Chatbot Language</label>
                <select
                  value={chatbotLang}
                  onChange={(e) => setChatbotLang(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-xs text-white cursor-pointer font-bold"
                >
                  <option value="ta">தமிழ் (Tamil)</option>
                  <option value="hi">हिंदी (Hindi)</option>
                  <option value="en">English</option>
                  <option value="te">తెలుగు (Telugu)</option>
                  <option value="kn">ಕನ್ನಡ (Kannada)</option>
                  <option value="ml">മലയാളം (Malayalam)</option>
                </select>
              </div>
            </div>
          )}

          {activeSection === 'appearance' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Appearance & Theme Selection</h3>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'light', label: t('theme_light'), icon: Sun },
                  { id: 'dark', label: t('theme_dark'), icon: Moon },
                  { id: 'system', label: t('theme_system'), icon: Laptop }
                ].map((th) => {
                  const Icon = th.icon;
                  const isSelected = theme === th.id;
                  return (
                    <button
                      key={th.id}
                      onClick={() => setTheme(th.id as AppTheme)}
                      className={`p-4 rounded-2xl border flex flex-col items-center gap-2 text-xs font-bold transition-all ${
                        isSelected 
                          ? 'bg-teal-600 text-white border-teal-400 shadow-lg' 
                          : 'bg-slate-950 text-slate-300 border-slate-800 hover:bg-slate-800'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{th.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {activeSection === 'notifications' && (
            <div className="space-y-4 text-xs text-slate-300">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Notification Preferences</h3>
              <div className="space-y-2">
                <label className="flex items-center justify-between p-3 bg-slate-950 rounded-xl border border-slate-800 cursor-pointer">
                  <span>Critical Risk Emergency Case Alerts</span>
                  <input type="checkbox" checked={critAlerts} onChange={(e) => setCritAlerts(e.target.checked)} className="w-4 h-4 text-teal-600 rounded" />
                </label>
                <label className="flex items-center justify-between p-3 bg-slate-950 rounded-xl border border-slate-800 cursor-pointer">
                  <span>High-Risk Case Prioritization Alerts</span>
                  <input type="checkbox" checked={highAlerts} onChange={(e) => setHighAlerts(e.target.checked)} className="w-4 h-4 text-teal-600 rounded" />
                </label>
                <label className="flex items-center justify-between p-3 bg-slate-950 rounded-xl border border-slate-800 cursor-pointer">
                  <span>Referral Status Updates</span>
                  <input type="checkbox" checked={referralAlerts} onChange={(e) => setReferralAlerts(e.target.checked)} className="w-4 h-4 text-teal-600 rounded" />
                </label>
              </div>
            </div>
          )}

          {activeSection === 'privacy' && (
            <div className="space-y-3 text-xs text-slate-300 font-mono leading-relaxed">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Privacy & Security Policies</h3>
              <p>Session Timeout: 15 minutes of inactivity</p>
              <p>Confidentiality: All case files strictly restricted to authorized NHAA personnel.</p>
              <p>Non-clinical Compliance: AI outputs labeled non-clinical and subject to officer review.</p>
            </div>
          )}

          {activeSection === 'accessibility' && (
            <div className="space-y-3 text-xs text-slate-300">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Accessibility Controls</h3>
              <label className="flex items-center justify-between p-3 bg-slate-950 rounded-xl border border-slate-800 cursor-pointer">
                <span>High Contrast Mode</span>
                <input type="checkbox" checked={highContrast} onChange={(e) => setHighContrast(e.target.checked)} className="w-4 h-4 text-teal-600 rounded" />
              </label>
              <label className="flex items-center justify-between p-3 bg-slate-950 rounded-xl border border-slate-800 cursor-pointer">
                <span>Reduced Motion</span>
                <input type="checkbox" checked={reducedMotion} onChange={(e) => setReducedMotion(e.target.checked)} className="w-4 h-4 text-teal-600 rounded" />
              </label>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
