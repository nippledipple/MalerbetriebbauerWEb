import React, { useState, useEffect } from 'react';
import { Settings, Save, AlertCircle, CheckCircle } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface HubSpotSettings {
  id: string;
  portal_id: string;
  tracking_enabled: boolean;
  chat_enabled: boolean;
  updated_at: string;
}

export const HubSpotPanel: React.FC = () => {
  const [settings, setSettings] = useState<HubSpotSettings | null>(null);
  const [portalId, setPortalId] = useState('');
  const [trackingEnabled, setTrackingEnabled] = useState(false);
  const [chatEnabled, setChatEnabled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('hubspot_settings')
        .select('*')
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setSettings(data);
        setPortalId(data.portal_id);
        setTrackingEnabled(data.tracking_enabled);
        setChatEnabled(data.chat_enabled);
      }
    } catch (error) {
      console.error('Error loading HubSpot settings:', error);
      setMessage({ type: 'error', text: 'Fehler beim Laden der Einstellungen' });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);

    try {
      const updatedSettings = {
        portal_id: portalId.trim(),
        tracking_enabled: trackingEnabled,
        chat_enabled: chatEnabled,
        updated_at: new Date().toISOString(),
      };

      if (settings) {
        const { error } = await supabase
          .from('hubspot_settings')
          .update(updatedSettings)
          .eq('id', settings.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('hubspot_settings')
          .insert([updatedSettings]);

        if (error) throw error;
      }

      setMessage({ type: 'success', text: 'Einstellungen erfolgreich gespeichert! Seite wird neu geladen...' });

      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      console.error('Error saving HubSpot settings:', error);
      setMessage({ type: 'error', text: 'Fehler beim Speichern der Einstellungen' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Settings className="w-6 h-6 text-orange-600" />
        <h2 className="text-2xl font-bold text-gray-900">HubSpot Integration</h2>
      </div>

      {message && (
        <div
          className={`p-4 rounded-lg flex items-center gap-3 ${
            message.type === 'success'
              ? 'bg-green-50 text-green-800 border border-green-200'
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}
        >
          {message.type === 'success' ? (
            <CheckCircle className="w-5 h-5" />
          ) : (
            <AlertCircle className="w-5 h-5" />
          )}
          <span>{message.text}</span>
        </div>
      )}

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-blue-900 mb-2">So finden Sie Ihre HubSpot Portal-ID:</h3>
        <ol className="list-decimal list-inside space-y-1 text-blue-800 text-sm">
          <li>Melden Sie sich bei HubSpot an</li>
          <li>Klicken Sie oben rechts auf das Einstellungen-Symbol (Zahnrad)</li>
          <li>Wählen Sie links "Account" → "Account Defaults"</li>
          <li>Die "Hub ID" ist Ihre Portal-ID (z.B. 123456)</li>
        </ol>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            HubSpot Portal-ID
          </label>
          <input
            type="text"
            value={portalId}
            onChange={(e) => setPortalId(e.target.value)}
            placeholder="z.B. 123456"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
          <p className="mt-1 text-sm text-gray-500">
            Ihre eindeutige HubSpot Portal-ID für Tracking und Chat
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900">Tracking aktivieren</h4>
              <p className="text-sm text-gray-600">
                Erfasst Besucherstatistiken und Seitenaufrufe in HubSpot
              </p>
            </div>
            <button
              onClick={() => setTrackingEnabled(!trackingEnabled)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                trackingEnabled ? 'bg-orange-600' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  trackingEnabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900">Chat-Widget aktivieren</h4>
              <p className="text-sm text-gray-600">
                Zeigt das HubSpot Live-Chat-Widget auf der Website an
              </p>
            </div>
            <button
              onClick={() => setChatEnabled(!chatEnabled)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                chatEnabled ? 'bg-orange-600' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  chatEnabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        {(!portalId.trim() && (trackingEnabled || chatEnabled)) && (
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
            <div>
              <p className="font-medium text-yellow-900">Portal-ID erforderlich</p>
              <p className="text-sm text-yellow-700">
                Bitte geben Sie Ihre HubSpot Portal-ID ein, um Tracking oder Chat zu aktivieren.
              </p>
            </div>
          </div>
        )}

        <button
          onClick={handleSave}
          disabled={saving || (!portalId.trim() && (trackingEnabled || chatEnabled))}
          className="w-full flex items-center justify-center gap-2 bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Save className="w-5 h-5" />
          {saving ? 'Wird gespeichert...' : 'Einstellungen speichern'}
        </button>
      </div>

      {(trackingEnabled || chatEnabled) && portalId.trim() && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <h4 className="font-medium text-green-900 mb-2">Aktive Integrationen:</h4>
          <ul className="space-y-1 text-sm text-green-800">
            {trackingEnabled && <li>✓ HubSpot Tracking aktiv (Portal: {portalId})</li>}
            {chatEnabled && <li>✓ HubSpot Chat-Widget aktiv</li>}
          </ul>
        </div>
      )}
    </div>
  );
};
