import React, { createContext, useContext, useState } from 'react';

interface ConsentContextType {
  hasConsented: boolean;
  setHasConsented: (val: boolean) => void;
  showConsentModal: boolean;
  setShowConsentModal: (val: boolean) => void;
}

const ConsentContext = createContext<ConsentContextType | undefined>(undefined);

export const ConsentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [hasConsented, setHasConsented] = useState<boolean>(true); // Pre-consented for instant demo, toggleable
  const [showConsentModal, setShowConsentModal] = useState<boolean>(false);

  return (
    <ConsentContext.Provider value={{ hasConsented, setHasConsented, showConsentModal, setShowConsentModal }}>
      {children}
    </ConsentContext.Provider>
  );
};

export const useConsent = () => {
  const context = useContext(ConsentContext);
  if (!context) throw new Error('useConsent must be used within ConsentProvider');
  return context;
};
