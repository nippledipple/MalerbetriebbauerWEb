import { useEffect } from 'react';
import { localDb } from '../lib/localDb';
import { useCookies } from '../contexts/CookieContext';

export const useTracking = (pageName: string) => {
  const { consent } = useCookies();

  useEffect(() => {
    if (!consent.statistics) return;

    const trackPageView = async () => {
      try {
        let sessionId = localStorage.getItem('sessionId');
        if (!sessionId) {
          sessionId = crypto.randomUUID();
          localStorage.setItem('sessionId', sessionId);
        }

        await localDb.addVisitorStat({
          page_url: `/${pageName}`,
          referrer: document.referrer || undefined,
          user_agent: navigator.userAgent,
          session_id: sessionId,
        });
      } catch (error) {
        console.error('Tracking could not be saved locally:', error);
      }
    };

    trackPageView();
  }, [pageName, consent.statistics]);
};
