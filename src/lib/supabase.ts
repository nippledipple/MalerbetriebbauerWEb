const disabledError = new Error('Supabase is disabled in this project.');

const createDisabledSupabaseClient = () => {
  return {
    from: () => ({
      select: async () => ({ data: null, error: disabledError }),
      insert: async () => ({ data: null, error: disabledError }),
      update: async () => ({ data: null, error: disabledError }),
      delete: async () => ({ data: null, error: disabledError }),
      eq: () => ({
        select: async () => ({ data: null, error: disabledError }),
      }),
      maybeSingle: async () => ({ data: null, error: disabledError }),
      order: () => ({
        order: () => ({
          select: async () => ({ data: null, error: disabledError }),
        }),
      }),
    }),
  };
};

export const supabase = createDisabledSupabaseClient();

export const getAdminClient = () => supabase;

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
