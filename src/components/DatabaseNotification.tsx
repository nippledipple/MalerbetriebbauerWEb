import React, { useState, useEffect } from 'react';
import { AlertCircle, X } from 'lucide-react';

const DatabaseNotification: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    const currentDate = new Date();
    const endDate = new Date('2026-05-06');
    const hasAccepted = localStorage.getItem('dbNotificationAccepted');

    if (currentDate <= endDate && !hasAccepted) {
      setShouldShow(true);
      setTimeout(() => setIsVisible(true), 500);
    }
  }, []);

  const handleAccept = () => {
    setIsVisible(false);
    setTimeout(() => {
      localStorage.setItem('dbNotificationAccepted', 'true');
      setShouldShow(false);
    }, 300);
  };

  if (!shouldShow) return null;

  return (
    <div
      className={`fixed top-20 left-4 right-4 sm:right-auto z-50 max-w-md transition-all duration-300 ease-out ${
        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
      }`}
    >
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-6">
          <div className="flex items-start gap-4 mb-4">
            <div className="flex-shrink-0 w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-blue-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-white font-bold text-lg mb-2">
                Wichtige Information
              </h3>
            </div>
            <button
              onClick={handleAccept}
              className="flex-shrink-0 text-gray-400 hover:text-white transition-colors"
              aria-label="Schließen"
            >
              <X size={20} />
            </button>
          </div>

          <div className="text-gray-300 text-sm leading-relaxed space-y-3 mb-5">
            <p>
              Leider hatten wir Anfang des Jahres ein Problem mit unserer Datenbank.
              Dadurch sind Kontaktanfragen und Angebotsanfragen möglicherweise nicht bei uns angekommen.
            </p>
            <p>
              Sollten Sie zwischen dem <span className="text-white font-semibold">01.01.2026</span> und dem{' '}
              <span className="text-white font-semibold">06.03.2026</span> eine Anfrage gestellt haben,
              bitten wir Sie, diese erneut zu senden.
            </p>
            <p className="text-gray-400 text-xs">
              Wir entschuldigen uns für die Umstände.
            </p>
          </div>

          <button
            onClick={handleAccept}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Verstanden
          </button>
        </div>

        <div className="h-1 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600"></div>
      </div>
    </div>
  );
};

export default DatabaseNotification;
