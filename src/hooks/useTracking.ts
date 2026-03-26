import { useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useCookies } from '../contexts/CookieContext';
import { handleSupabaseError } from '../lib/supabaseErrorHandler';

export const useTracking = (pageName: string) => {
  const { consent } = useCookies();

  useEffect(() => {
    if (!consent.statistics) return;

    const trackPageView = async () => {
      if (!supabase) return;
      try {
        let sessionId = localStorage.getItem('sessionId');
        if (!sessionId) {
          sessionId = crypto.randomUUID();
          localStorage.setItem('sessionId', sessionId);
        }

        const { error } = await supabase
          .from('visitor_stats')
          .insert([{
            page_url: `/${pageName}`,
            referrer: document.referrer || null,
            user_agent: navigator.userAgent,
            session_id: sessionId,
          }]);

        if (error) {
          handleSupabaseError(error);
        }
      } catch (error: any) {
        handleSupabaseError(error);
      }
    };

    trackPageView();
  }, [pageName, consent.statistics]);
};
