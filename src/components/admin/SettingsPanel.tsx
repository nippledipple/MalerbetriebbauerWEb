import React, { useState, useEffect } from 'react';
import { Save, Download, Mail, ToggleLeft, ToggleRight, AlertCircle } from 'lucide-react';
import { localDb } from '../../lib/localDb';

const SettingsPanel: React.FC = () => {
  const [settings, setSettings] = useState({
    admin_email: 'admin@malerbetriebbauer.com',
    smtp_configured: false,
    tracking_enabled: false,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(
    null
  );

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const keys = ['admin_email', 'smtp_configured', 'tracking_enabled'];
      const settingsObj: any = {};

      for (const key of keys) {
        const value = await localDb.getSetting(key);
        if (value !== null) {
          try {
            settingsObj[key] = JSON.parse(value);
          } catch {
            settingsObj[key] = value;
          }
        }
      }

      setSettings((prev) => ({ ...prev, ...settingsObj }));
    } catch (error) {
      console.error('Error loading settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveSettings = async () => {
    setSaving(true);
    setMessage(null);

    try {
      for (const [key, value] of Object.entries(settings)) {
        await localDb.setSetting(key, JSON.stringify(value));
      }

      setMessage({ type: 'success', text: 'Einstellungen erfolgreich gespeichert!' });
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      console.error('Error saving settings:', error);
      setMessage({ type: 'error', text: 'Fehler beim Speichern der Einstellungen' });
    } finally {
      setSaving(false);
    }
  };

  const downloadBackup = async () => {
    try {
      const contacts = await localDb.getContactRequests();
      const stats = await localDb.getVisitorStats();

      const backup = {
        timestamp: new Date().toISOString(),
        version: '1.0',
        data: {
          contact_requests: contacts,
          visitor_stats: stats,
          settings: settings,
        },
      };

      const blob = new Blob([JSON.stringify(backup, null, 2)], {
        type: 'application/json',
      });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `backup_${new Date().toISOString().split('T')[0]}.json`;
      link.click();

      setMessage({ type: 'success', text: 'Backup erfolgreich heruntergeladen!' });
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      console.error('Error creating backup:', error);
      setMessage({ type: 'error', text: 'Fehler beim Erstellen des Backups' });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-gray-500">Lade Einstellungen...</div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#585858] mb-6">Einstellungen</h2>

      {message && (
        <div
          className={`mb-6 p-4 rounded-lg border ${
            message.type === 'success'
              ? 'bg-green-100 border-green-300 text-green-800'
              : 'bg-red-100 border-red-300 text-red-800'
          }`}
        >
          <div className="flex items-center space-x-2">
            {message.type === 'success' ? (
              <Save className="flex-shrink-0" size={20} />
            ) : (
              <AlertCircle className="flex-shrink-0" size={20} />
            )}
            <p>{message.text}</p>
          </div>
        </div>
      )}

      <div className="space-y-6">
        <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
          <h3 className="font-bold text-[#585858] text-lg mb-4 flex items-center space-x-2">
            <Mail size={24} className="text-[#ffd900]" />
            <span>E-Mail-Einstellungen</span>
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Admin E-Mail-Adresse
              </label>
              <input
                type="email"
                value={settings.admin_email}
                onChange={(e) =>
                  setSettings((prev) => ({ ...prev, admin_email: e.target.value }))
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ffd900] focus:border-transparent"
                placeholder="admin@malerbetriebbauer.com"
              />
              <p className="text-sm text-gray-500 mt-1">
                An diese Adresse werden Benachrichtigungen über neue Kontaktanfragen gesendet.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
          <h3 className="font-bold text-[#585858] text-lg mb-4">Tracking & Analyse</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-700">Besucher-Tracking aktivieren</p>
                <p className="text-sm text-gray-500">
                  Erfasst anonymisierte Besucherstatistiken (DSGVO-konform)
                </p>
              </div>
              <button
                onClick={() =>
                  setSettings((prev) => ({
                    ...prev,
                    tracking_enabled: !prev.tracking_enabled,
                  }))
                }
                className={`p-2 rounded-lg transition-colors ${
                  settings.tracking_enabled
                    ? 'text-[#ffd900]'
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                {settings.tracking_enabled ? (
                  <ToggleRight size={32} />
                ) : (
                  <ToggleLeft size={32} />
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
          <h3 className="font-bold text-[#585858] text-lg mb-4">Datensicherung</h3>
          <div className="space-y-4">
            <p className="text-gray-600">
              Laden Sie eine vollständige Sicherung aller Daten herunter, einschließlich
              Kontaktanfragen, Statistiken und Einstellungen.
            </p>
            <button
              onClick={downloadBackup}
              className="flex items-center space-x-2 px-6 py-3 bg-[#585858] text-white rounded-lg font-medium hover:bg-[#404040] transition-colors"
            >
              <Download size={20} />
              <span>Backup herunterladen</span>
            </button>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            onClick={saveSettings}
            disabled={saving}
            className="flex items-center space-x-2 px-6 py-3 bg-[#ffd900] text-[#585858] rounded-lg font-bold hover:bg-[#e6c200] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save size={20} />
            <span>{saving ? 'Speichern...' : 'Einstellungen speichern'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;
