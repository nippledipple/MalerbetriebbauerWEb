import React, { createContext, useContext, useState, useEffect } from 'react';

interface CookieConsent {
  essential: boolean;
  preferences: boolean;
  statistics: boolean;
  marketing: boolean;
}

interface CookieContextType {
  consent: CookieConsent;
  showBanner: boolean;
  acceptAll: () => void;
  acceptSelection: (consent: CookieConsent) => void;
  rejectAll: () => void;
  openSettings: () => void;
  closeSettings: () => void;
  showSettings: boolean;
}

const defaultConsent: CookieConsent = {
  essential: true,
  preferences: false,
  statistics: false,
  marketing: false,
};

const CookieContext = createContext<CookieContextType | undefined>(undefined);

const safeLocalStorage = {
  getItem(key: string) {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      console.warn('localStorage getItem failed:', error);
      return null;
    }
  },
  setItem(key: string, value: string) {
    try {
      localStorage.setItem(key, value);
      return true;
    } catch (error) {
      console.warn('localStorage setItem failed:', error);
      return false;
    }
  },
};

export const CookieProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [consent, setConsent] = useState<CookieConsent>(defaultConsent);
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    const savedConsent = safeLocalStorage.getItem('cookieConsent');
    if (savedConsent) {
      try {
        setConsent(JSON.parse(savedConsent));
        setShowBanner(false);
      } catch (error) {
        console.warn('Invalid cookie consent data, resetting.', error);
        setConsent(defaultConsent);
        setShowBanner(true);
      }
    } else {
      setShowBanner(true);
    }
  }, []);

  const saveConsent = (newConsent: CookieConsent) => {
    setConsent(newConsent);
    safeLocalStorage.setItem('cookieConsent', JSON.stringify(newConsent));
    setShowBanner(false);
    setShowSettings(false);
  };

  const acceptAll = () => {
    saveConsent({
      essential: true,
      preferences: true,
      statistics: true,
      marketing: true,
    });
  };

  const acceptSelection = (selection: CookieConsent) => {
    saveConsent({ ...selection, essential: true });
  };

  const rejectAll = () => {
    saveConsent(defaultConsent);
  };

  const openSettings = () => {
    setShowSettings(true);
    setShowBanner(false);
  };

  const closeSettings = () => {
    setShowSettings(false);
  };

  return (
    <CookieContext.Provider
      value={{
        consent,
        showBanner,
        acceptAll,
        acceptSelection,
        rejectAll,
        openSettings,
        closeSettings,
        showSettings,
      }}
    >
      {children}
    </CookieContext.Provider>
  );
};

export const useCookies = () => {
  const context = useContext(CookieContext);
  if (context === undefined) {
    throw new Error('useCookies must be used within a CookieProvider');
  }
  return context;
};
