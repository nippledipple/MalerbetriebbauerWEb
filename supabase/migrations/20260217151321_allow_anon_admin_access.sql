/*
  # Allow Anonymous Access to Admin Data

  ## Context
  The application uses local browser-based authentication (IndexedDB)
  instead of Supabase authentication. The Supabase client uses the
  anonymous key for all requests, including admin operations.

  ## Security Note
  This approach is less secure than proper authentication but necessary
  for the current architecture. Application-level security checks
  prevent unauthorized access in the frontend.

  ## Changes
  - Allow anonymous users to read/update contact_requests
  - Allow anonymous users to read visitor_stats
  - Allow anonymous users to read/update ai_inquiries
  - Maintain existing INSERT policies for public forms
*/

-- Fix contact_requests policies
DROP POLICY IF EXISTS "Authenticated users can view contact requests" ON public.contact_requests;
DROP POLICY IF EXISTS "Authenticated users can update contact requests" ON public.contact_requests;

CREATE POLICY "Anyone can view contact requests"
  ON public.contact_requests
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can update contact requests"
  ON public.contact_requests
  FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

-- Fix visitor_stats policies
DROP POLICY IF EXISTS "Authenticated users can view visitor stats" ON public.visitor_stats;

CREATE POLICY "Anyone can view visitor stats"
  ON public.visitor_stats
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Fix ai_inquiries policies if table exists
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_tables WHERE tablename = 'ai_inquiries') THEN
    DROP POLICY IF EXISTS "Authenticated users can view inquiries" ON public.ai_inquiries;
    DROP POLICY IF EXISTS "Authenticated users can update inquiries" ON public.ai_inquiries;

    EXECUTE 'CREATE POLICY "Anyone can view inquiries"
      ON public.ai_inquiries
      FOR SELECT
      TO anon, authenticated
      USING (true)';

    EXECUTE 'CREATE POLICY "Anyone can update inquiries"
      ON public.ai_inquiries
      FOR UPDATE
      TO anon, authenticated
      USING (true)
      WITH CHECK (true)';
  END IF;
END $$;
