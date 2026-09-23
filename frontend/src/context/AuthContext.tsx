import React, { createContext, useContext, useState } from 'react';

export interface UserProfile {
  fullName: string;
  role: 'NHAA Officer' | 'Counsellor' | 'Legal Support' | 'Case Manager' | 'Administrator';
  department: string;
  preferredLanguage: string;
  contact: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  isProfileSetup: boolean;
  profile: UserProfile;
  login: (username: string) => void;
  saveProfile: (prof: UserProfile) => void;
  logout: () => void;
}

const DEFAULT_PROFILE: UserProfile = {
  fullName: 'Inspector S. Raman',
  role: 'NHAA Officer',
  department: 'National Helpline Against Atrocities (14566)',
  preferredLanguage: 'ta',
  contact: 'officer.raman@nhaa.gov.in | +91 98765 43210'
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('nhaa_auth') === 'true';
  });

  const [isProfileSetup, setIsProfileSetup] = useState<boolean>(() => {
    return localStorage.getItem('nhaa_profile_setup') === 'true';
  });

  const [profile, setProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('nhaa_user_profile');
    return saved ? JSON.parse(saved) : DEFAULT_PROFILE;
  });

  const login = (_username: string) => {
    setIsAuthenticated(true);
    localStorage.setItem('nhaa_auth', 'true');
  };

  const saveProfile = (prof: UserProfile) => {
    setProfile(prof);
    setIsProfileSetup(true);
    localStorage.setItem('nhaa_user_profile', JSON.stringify(prof));
    localStorage.setItem('nhaa_profile_setup', 'true');
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('nhaa_auth');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isProfileSetup, profile, login, saveProfile, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
