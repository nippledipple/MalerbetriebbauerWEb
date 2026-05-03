import { useEffect } from 'react';
import { useCookies } from '../contexts/CookieContext';

export const useTracking = (pageName: string) => {
  const { consent } = useCookies();

  useEffect(() => {
    if (!consent.statistics) return;

    let sessionId = localStorage.getItem('sessionId');
    if (!sessionId) {
      sessionId = crypto.randomUUID();
      localStorage.setItem('sessionId', sessionId);
    }

    const trackData = {
      page_url: `/${pageName}`,
      referrer: document.referrer || null,
      user_agent: navigator.userAgent,
      session_id: sessionId,
      timestamp: new Date().toISOString(),
    };

    console.log('Page tracked:', trackData);
  }, [pageName, consent.statistics]);
};
