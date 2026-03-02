import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

let supabase: SupabaseClient | null = null;

const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

if (isSupabaseConfigured) {
  supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    }
  });
} else {
  console.warn('Supabase environment variables not configured. Supabase features will be disabled.');
}

export { supabase, isSupabaseConfigured };

export const getAdminClient = () => {
  return supabase;
};

const isMissingTableError = (error: unknown): boolean => {
  if (!error || typeof error !== 'object') return false;
  const message = String((error as { message?: string }).message || '');
  const details = String((error as { details?: string }).details || '');
  const combined = `${message} ${details}`.toLowerCase();
  return combined.includes('does not exist') || combined.includes('undefined table') || combined.includes('relation');
};

export const logSupabaseError = (context: string, error: unknown): void => {
  const message = error instanceof Error ? error.message : String(error);
  const extra = typeof error === 'object' && error !== null ? error : undefined;
  if (isMissingTableError(error)) {
    console.warn(`Supabase table missing or not initialized (${context}):`, message, extra);
    return;
  }
  console.error(`Supabase error (${context}):`, message, extra);
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
