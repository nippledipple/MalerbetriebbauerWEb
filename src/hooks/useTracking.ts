import { useEffect } from 'react';
import { supabase, logSupabaseError } from '../lib/supabase';
import { useCookies } from '../contexts/CookieContext';

export const useTracking = (pageName: string) => {
  const { consent } = useCookies();

  useEffect(() => {
    if (!consent.statistics || !supabase) return;

    const client = supabase;
    const trackPageView = async () => {
      try {
        let sessionId: string | null = null;
        try {
          sessionId = localStorage.getItem('sessionId');
          if (!sessionId) {
            sessionId = crypto.randomUUID?.() || `session-${Date.now()}-${Math.random().toString(16).slice(2)}`;
            localStorage.setItem('sessionId', sessionId);
          }
        } catch (storageError) {
          console.warn('Session tracking storage unavailable, using fallback session id.', storageError);
          sessionId = `session-${Date.now()}-${Math.random().toString(16).slice(2)}`;
        }

        const { error } = await client
          .from('visitor_stats')
          .insert([{
            page_url: `/${pageName}`,
            referrer: document.referrer || null,
            user_agent: navigator.userAgent,
            session_id: sessionId,
          }]);
        if (error) {
          logSupabaseError('visitor_stats insert', error);
        }
      } catch (error) {
        console.error('Error in tracking:', error);
      }
    };

    trackPageView();
  }, [pageName, consent.statistics]);
};
