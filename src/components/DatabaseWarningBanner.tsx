import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const DatabaseWarningBanner: React.FC = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showAfterCookies, setShowAfterCookies] = useState(false);

  useEffect(() => {
    const checkShowBanner = () => {
      const today = new Date();
      const endDate = new Date('2026-05-06');

      if (today > endDate) {
        return false;
      }

      const dismissed = localStorage.getItem('database-warning-dismissed');
      if (dismissed) {
        return false;
      }

      return true;
    };

    const checkCookiesAccepted = () => {
      const cookiePrefs = localStorage.getItem('cookie-preferences');
      return cookiePrefs !== null;
    };

    const shouldShow = checkShowBanner();

    if (shouldShow) {
      setShowBanner(true);

      if (checkCookiesAccepted()) {
        setShowAfterCookies(true);
      } else {
        const handleStorageChange = () => {
          if (checkCookiesAccepted()) {
            setShowAfterCookies(true);
            window.removeEventListener('storage', handleStorageChange);
          }
        };

        window.addEventListener('storage', handleStorageChange);

        const storageListener = setInterval(() => {
          if (checkCookiesAccepted()) {
            setShowAfterCookies(true);
            clearInterval(storageListener);
          }
        }, 100);

        return () => {
          clearInterval(storageListener);
          window.removeEventListener('storage', handleStorageChange);
        };
      }
    }
  }, []);

  const handleDismiss = () => {
    localStorage.setItem('database-warning-dismissed', 'true');
    setShowBanner(false);
  };

  if (!showBanner || !showAfterCookies) {
    return null;
  }

  return (
    <div className="fixed top-6 left-6 max-w-md z-40 database-warning-banner">
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 shadow-xl">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h3 className="font-bold text-white text-base mb-2">Wichtige Information</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Leider hatten wir Anfang des Jahres ein Problem mit unserer Datenbank.
              Dadurch sind Kontaktanfragen und Angebotsanfragen möglicherweise nicht bei uns angekommen.
            </p>
            <p className="text-gray-300 text-sm leading-relaxed mt-3">
              Sollten Sie zwischen dem <span className="font-semibold">01.01.2026 und dem 06.03.2026</span> eine Anfrage gestellt haben, bitten wir Sie, diese erneut zu senden.
            </p>
            <p className="text-gray-300 text-sm leading-relaxed mt-3">
              Wir entschuldigen uns für die Umstände.
            </p>
          </div>
          <button
            onClick={handleDismiss}
            className="flex-shrink-0 text-gray-400 hover:text-white transition-colors"
            aria-label="Nachricht schließen"
          >
            <X size={20} />
          </button>
        </div>
        <button
          onClick={handleDismiss}
          className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition-colors"
        >
          Akzeptieren
        </button>
      </div>
    </div>
  );
};

export default DatabaseWarningBanner;
