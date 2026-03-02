import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

let supabase: SupabaseClient | null = null;

if (supabaseUrl && supabaseAnonKey) {
  supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    }
  });
} else {
  console.warn('Supabase environment variables not configured. Supabase features will be disabled.');
}

export { supabase };

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
