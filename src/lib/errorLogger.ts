interface ErrorLogData {
  errorType: string;
  errorMessage: string;
  errorStack?: string;
  formData?: Record<string, any>;
  pageUrl?: string;
}

export async function logError(data: ErrorLogData): Promise<void> {
  const errorLog = {
    errorType: data.errorType,
    errorMessage: data.errorMessage,
    errorStack: data.errorStack,
    formData: data.formData,
    userAgent: navigator.userAgent,
    pageUrl: data.pageUrl || window.location.href,
    timestamp: new Date().toISOString(),
  };

  console.error('Error logged:', errorLog);
}
