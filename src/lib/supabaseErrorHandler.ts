export const handleSupabaseError = (error: any): void => {
  if (!error) return;

  if (error.message?.includes('invalid account tier')) {
    console.warn('Supabase feature not available in current tier - feature disabled');
    return;
  }

  if (error.code === 'invalid_account_tier') {
    console.warn('Supabase feature not available in current tier - feature disabled');
    return;
  }

  console.error('Supabase error:', error);
};

export const safeSupabaseCall = async <T>(
  operation: () => Promise<T>,
  fallbackValue?: T
): Promise<T | undefined> => {
  try {
    return await operation();
  } catch (error: any) {
    if (error?.message?.includes('invalid account tier') || error?.code === 'invalid_account_tier') {
      console.warn('Supabase feature not available - using fallback');
      return fallbackValue;
    }
    throw error;
  }
};
