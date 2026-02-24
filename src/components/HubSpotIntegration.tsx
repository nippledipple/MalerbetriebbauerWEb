import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

interface HubSpotSettings {
  portal_id: string;
  tracking_enabled: boolean;
  chat_enabled: boolean;
}

export const HubSpotIntegration: React.FC = () => {
  const [settings, setSettings] = useState<HubSpotSettings | null>(null);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('hubspot_settings')
        .select('portal_id, tracking_enabled, chat_enabled')
        .maybeSingle();

      if (error) throw error;
      if (data && data.portal_id) {
        setSettings(data);
      }
    } catch (error) {
      console.error('Error loading HubSpot settings:', error);
    }
  };

  useEffect(() => {
    if (!settings || !settings.portal_id) return;

    if (settings.tracking_enabled) {
      const trackingScript = document.createElement('script');
      trackingScript.id = 'hs-script-loader';
      trackingScript.async = true;
      trackingScript.defer = true;
      trackingScript.src = `//js.hs-scripts.com/${settings.portal_id}.js`;
      document.body.appendChild(trackingScript);

      return () => {
        const script = document.getElementById('hs-script-loader');
        if (script) {
          script.remove();
        }
      };
    }
  }, [settings]);

  useEffect(() => {
    if (!settings || !settings.portal_id || !settings.chat_enabled) return;

    const chatScript = document.createElement('script');
    chatScript.id = 'hs-chat-loader';
    chatScript.async = true;
    chatScript.defer = true;
    chatScript.src = `//js.hs-scripts.com/${settings.portal_id}.js`;
    chatScript.setAttribute('data-hsjs-portal', settings.portal_id);
    chatScript.setAttribute('data-hsjs-env', 'prod');

    const existingScript = document.getElementById('hs-script-loader');
    if (!existingScript) {
      document.body.appendChild(chatScript);
    }

    return () => {
      const script = document.getElementById('hs-chat-loader');
      if (script) {
        script.remove();
      }
      if (window.HubSpotConversations) {
        window.HubSpotConversations.widget.remove();
      }
    };
  }, [settings]);

  return null;
};

declare global {
  interface Window {
    HubSpotConversations?: {
      widget: {
        remove: () => void;
        load: () => void;
      };
    };
  }
}
