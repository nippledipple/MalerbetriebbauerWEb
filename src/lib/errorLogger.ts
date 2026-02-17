import { supabase } from './supabase';

interface ErrorLogData {
  errorType: string;
  errorMessage: string;
  errorStack?: string;
  formData?: Record<string, any>;
  pageUrl?: string;
}

export async function logError(data: ErrorLogData): Promise<void> {
  try {
    const userAgent = navigator.userAgent;
    const pageUrl = data.pageUrl || window.location.href;

    await supabase.from('error_logs').insert({
      error_type: data.errorType,
      error_message: data.errorMessage,
      error_stack: data.errorStack,
      form_data: data.formData,
      user_agent: userAgent,
      page_url: pageUrl,
    });
  } catch (err) {
    console.error('Failed to log error to database:', err);
  }
}
