import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import { CaseProvider, useCaseContext } from './context/CaseContext';
import type { CaseData } from './types';

import { LoginPage } from './components/auth/LoginPage';
import { ProfileSetupPage } from './components/auth/ProfileSetupPage';
import { Navbar } from './components/layout/Navbar';
import { Dashboard } from './components/dashboard/Dashboard';
import { CaseDetails } from './components/cases/CaseDetails';
import { CaseListView } from './components/cases/CaseListView';
import { AiAssessmentPage } from './components/views/AiAssessmentPage';
import { ChatbotPage } from './components/chatbot/ChatbotPage';
import { FloatingChatbot } from './components/chatbot/FloatingChatbot';
import { ReferralsPage } from './components/views/ReferralsPage';
import { ReportsAnalyticsPage } from './components/views/ReportsAnalyticsPage';
import { SettingsPage } from './components/views/SettingsPage';

const MainAppContent: React.FC = () => {
  const { isAuthenticated, isProfileSetup } = useAuth();
  const { activeCase, setActiveCase, cases, addTimelineEvent } = useCaseContext();
  const [currentTab, setCurrentTab] = useState<string>('dashboard');
  const [selectedCaseDetail, setSelectedCaseDetail] = useState<CaseData | null>(null);

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  if (!isProfileSetup) {
    return <ProfileSetupPage />;
  }

  const handleSelectCase = (c: CaseData) => {
    setSelectedCaseDetail(c);
    setActiveCase(c);
    setCurrentTab('case-details');
  };

  const renderTabContent = () => {
    switch (currentTab) {
      case 'dashboard':
        return <Dashboard cases={cases} onSelectCase={handleSelectCase} />;

      case 'cases':
        return <CaseListView cases={cases} onSelectCase={handleSelectCase} />;

      case 'case-details':
        return selectedCaseDetail || activeCase ? (
          <CaseDetails
            caseData={selectedCaseDetail || activeCase!}
            onBack={() => setCurrentTab('dashboard')}
            onAddTimelineNote={(id, note) => addTimelineEvent(id, note)}
          />
        ) : (
          <Dashboard cases={cases} onSelectCase={handleSelectCase} />
        );

      case 'ai-assessment':
        return <AiAssessmentPage />;

      case 'chatbot':
        return <ChatbotPage />;

      case 'referrals':
        return <ReferralsPage />;

      case 'reports':
        return <ReportsAnalyticsPage />;

      case 'settings':
        return <SettingsPage />;

      default:
        return <Dashboard cases={cases} onSelectCase={handleSelectCase} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-teal-500 selection:text-white">
      <Navbar currentTab={currentTab} setCurrentTab={setCurrentTab} />

      <main className="p-4 sm:p-8 flex-1 max-w-7xl w-full mx-auto space-y-6">
        {renderTabContent()}
      </main>

      <FloatingChatbot onOpenFullPage={() => setCurrentTab('chatbot')} />
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <CaseProvider>
            <MainAppContent />
          </CaseProvider>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
