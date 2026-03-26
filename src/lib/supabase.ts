import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

if (!isSupabaseConfigured) {
  console.warn('Supabase environment variables are not set. Database features will be disabled.');
}

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
      global: {
        headers: {
          'x-client-info': 'supabase-js-web',
        },
      },
    })
  : null;

export const getAdminClient = () => {
  return supabase;
};

export interface ContactRequest {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  status: 'open' | 'done';
  created_at: string;
  updated_at: string;
}

export interface SiteSetting {
  id: string;
  key: string;
  value: string;
  updated_at: string;
}

export interface VisitorStat {
  id: string;
  page_url: string;
  referrer?: string;
  user_agent: string;
  ip_hash: string;
  session_id: string;
  visited_at: string;
}

export interface AdminUser {
  id: string;
  email: string;
  full_name: string;
  must_change_password: boolean;
  created_at: string;
  updated_at: string;
}
