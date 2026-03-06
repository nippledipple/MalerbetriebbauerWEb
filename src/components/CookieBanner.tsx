import React, { useState } from 'react';
import { Cookie, X } from 'lucide-react';
import { useCookies } from '../contexts/CookieContext';

const CookieBanner: React.FC = () => {
  const { showBanner, showSettings, acceptAll, rejectAll, acceptSelection, closeSettings } =
    useCookies();

  const [preferences, setPreferences] = useState(false);
  const [statistics, setStatistics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  if (!showBanner && !showSettings) return null;

  const handleSaveSelection = () => {
    acceptSelection({
      essential: true,
      preferences,
      statistics,
      marketing,
    });
  };

  if (showSettings) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center space-x-3">
              <Cookie className="text-[#ffd900]" size={32} />
              <h2 className="text-2xl font-bold text-[#585858]">Cookie-Einstellungen</h2>
            </div>
            <button
              onClick={closeSettings}
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={24} />
            </button>
          </div>

          <p className="text-gray-600 mb-6">
            Wir verwenden Cookies, um Ihnen die bestmögliche Nutzererfahrung zu bieten. Sie
            können Ihre Einwilligung jederzeit anpassen.
          </p>

          <div className="space-y-4 mb-6">
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-[#585858]">Essentiell</h3>
                <span className="text-sm text-gray-500">Immer aktiv</span>
              </div>
              <p className="text-sm text-gray-600">
                Diese Cookies sind für die Grundfunktionen der Website erforderlich.
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-[#585858]">Vorlieben</h3>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={preferences}
                    onChange={(e) => setPreferences(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#ffd900]/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#ffd900]"></div>
                </label>
              </div>
              <p className="text-sm text-gray-600">
                Speichern Ihre Präferenzen wie Sprache und Region.
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-[#585858]">Statistiken</h3>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={statistics}
                    onChange={(e) => setStatistics(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#ffd900]/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#ffd900]"></div>
                </label>
              </div>
              <p className="text-sm text-gray-600">
                Helfen uns zu verstehen, wie Besucher mit der Website interagieren.
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-[#585858]">Marketing</h3>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={marketing}
                    onChange={(e) => setMarketing(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#ffd900]/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#ffd900]"></div>
                </label>
              </div>
              <p className="text-sm text-gray-600">
                Ermöglichen personalisierte Werbung basierend auf Ihren Interessen.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleSaveSelection}
              className="flex-1 bg-[#ffd900] text-[#585858] font-bold py-3 rounded-lg hover:bg-[#e6c200] transition-colors"
            >
              Auswahl speichern
            </button>
            <button
              onClick={acceptAll}
              className="flex-1 bg-[#585858] text-white font-bold py-3 rounded-lg hover:bg-[#404040] transition-colors"
            >
              Alle akzeptieren
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-2xl border-t-4 border-[#ffd900] z-50 p-6">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start space-x-3 flex-1">
            <Cookie className="text-[#ffd900] flex-shrink-0 mt-1" size={32} />
            <div>
              <h3 className="font-bold text-[#585858] mb-2">
                Diese Website verwendet Cookies
              </h3>
              <p className="text-sm text-gray-600">
                Wir verwenden Cookies, um Ihnen die bestmögliche Nutzererfahrung zu bieten. Sie
                können wählen, welche Cookies Sie akzeptieren möchten.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <button
              onClick={rejectAll}
              className="px-6 py-2 border-2 border-gray-300 text-[#585858] font-medium rounded-lg hover:bg-gray-50 transition-colors"
            >
              Ablehnen
            </button>
            <button
              onClick={() => {
                acceptSelection({
                  essential: true,
                  preferences: false,
                  statistics: false,
                  marketing: false,
                });
              }}
              className="px-6 py-2 border-2 border-[#585858] text-[#585858] font-medium rounded-lg hover:bg-gray-50 transition-colors"
            >
              Einstellungen
            </button>
            <button
              onClick={acceptAll}
              className="px-6 py-2 bg-[#ffd900] text-[#585858] font-bold rounded-lg hover:bg-[#e6c200] transition-colors"
            >
              Alle akzeptieren
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
