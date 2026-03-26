import { supabase } from './supabase';
import { handleSupabaseError } from './supabaseErrorHandler';

interface ErrorLogData {
  errorType: string;
  errorMessage: string;
  errorStack?: string;
  formData?: Record<string, any>;
  pageUrl?: string;
}

export async function logError(data: ErrorLogData): Promise<void> {
  if (!supabase) return;
  try {
    const userAgent = navigator.userAgent;
    const pageUrl = data.pageUrl || window.location.href;

    const { error } = await supabase.from('error_logs').insert({
      error_type: data.errorType,
      error_message: data.errorMessage,
      error_stack: data.errorStack,
      form_data: data.formData,
      user_agent: userAgent,
      page_url: pageUrl,
    });

    if (error) {
      handleSupabaseError(error);
    }
  } catch (err: any) {
    handleSupabaseError(err);
  }
}
