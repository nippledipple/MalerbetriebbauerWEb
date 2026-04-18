interface ErrorLogData {
  errorType: string;
  errorMessage: string;
  errorStack?: string;
  formData?: Record<string, any>;
  pageUrl?: string;
}

export async function logError(data: ErrorLogData): Promise<void> {
  try {
    const pageUrl = data.pageUrl || window.location.href;
    console.error('Error log (local only):', {
      ...data,
      pageUrl,
      userAgent: navigator.userAgent,
    });
  } catch (err) {
    console.error('Error logger failed:', err);
  }
}
