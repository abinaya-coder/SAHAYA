import React, { useState } from 'react';
import { useAuth, type UserProfile } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { UserCheck, Save } from 'lucide-react';

export const ProfileSetupPage: React.FC = () => {
  const { profile, saveProfile } = useAuth();
  const { t } = useLanguage();

  const [fullName, setFullName] = useState(profile.fullName);
  const [role, setRole] = useState<UserProfile['role']>(profile.role);
  const [department, setDepartment] = useState(profile.department);
  const [contact, setContact] = useState(profile.contact);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveProfile({
      fullName,
      role,
      department,
      preferredLanguage: profile.preferredLanguage,
      contact
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-10 space-y-6 shadow-2xl">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="w-12 h-12 rounded-xl bg-teal-600/20 border border-teal-500/40 flex items-center justify-center text-teal-400">
            <UserCheck className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-white tracking-tight">
              {t('profile_setup_title')}
            </h2>
            <p className="text-xs text-slate-400">
              {t('profile_setup_subtitle')}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              {t('full_name')}
            </label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-teal-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                {t('role_label')}
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as UserProfile['role'])}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-teal-500 cursor-pointer"
              >
                <option value="NHAA Officer">NHAA Officer</option>
                <option value="Counsellor">Counsellor</option>
                <option value="Legal Support">Legal Support</option>
                <option value="Case Manager">Case Manager</option>
                <option value="Administrator">Administrator</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                {t('department_label')}
              </label>
              <input
                type="text"
                required
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-teal-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              {t('contact_label')}
            </label>
            <input
              type="text"
              required
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-teal-500"
            />
          </div>

          <div className="pt-4 border-t border-slate-800 flex justify-end">
            <button
              type="submit"
              className="px-6 py-3.5 bg-teal-600 hover:bg-teal-500 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-teal-600/30 transition-all flex items-center gap-2"
            >
              <Save className="w-4 h-4" /> {t('btn_save_profile')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
