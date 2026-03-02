import { useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useCookies } from '../contexts/CookieContext';

export const useTracking = (pageName: string) => {
  const { consent } = useCookies();

  useEffect(() => {
    if (!consent.statistics || !supabase) return;

    const client = supabase;
    const trackPageView = async () => {
      try {
        let sessionId = localStorage.getItem('sessionId');
        if (!sessionId) {
          sessionId = crypto.randomUUID();
          localStorage.setItem('sessionId', sessionId);
        }

        await client
          .from('visitor_stats')
          .insert([{
            page_url: `/${pageName}`,
            referrer: document.referrer || null,
            user_agent: navigator.userAgent,
            session_id: sessionId,
          }]);
      } catch (error) {
        console.error('Error in tracking:', error);
      }
    };

    trackPageView();
  }, [pageName, consent.statistics]);
};
