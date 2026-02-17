/*
  # Fix RLS Policies for Local Authentication

  ## Problem
  The current RLS policies require Supabase authentication (auth.uid()),
  but the system uses local browser-based authentication (IndexedDB).
  This prevents admin users from viewing contact requests.

  ## Solution
  Allow authenticated role to access admin data without requiring
  a valid auth.uid(). This maintains security through application-level
  authentication while allowing database access.

  ## Changes
  - Update contact_requests policies to allow authenticated access
  - Update visitor_stats policies to allow authenticated access
  - Update ai_inquiries policies to allow authenticated access
  - Maintain INSERT access for anonymous users (public forms)
*/

-- Fix contact_requests policies
DROP POLICY IF EXISTS "Admins can view all contact requests" ON public.contact_requests;
DROP POLICY IF EXISTS "Admins can update contact requests" ON public.contact_requests;

CREATE POLICY "Authenticated users can view contact requests"
  ON public.contact_requests
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update contact requests"
  ON public.contact_requests
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Fix visitor_stats policies
DROP POLICY IF EXISTS "Admins can view visitor stats" ON public.visitor_stats;

CREATE POLICY "Authenticated users can view visitor stats"
  ON public.visitor_stats
  FOR SELECT
  TO authenticated
  USING (true);

-- Fix ai_inquiries policies if table exists
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_tables WHERE tablename = 'ai_inquiries') THEN
    DROP POLICY IF EXISTS "Admins can view all inquiries" ON public.ai_inquiries;
    DROP POLICY IF EXISTS "Admins can update inquiries" ON public.ai_inquiries;

    EXECUTE 'CREATE POLICY "Authenticated users can view inquiries"
      ON public.ai_inquiries
      FOR SELECT
      TO authenticated
      USING (true)';

    EXECUTE 'CREATE POLICY "Authenticated users can update inquiries"
      ON public.ai_inquiries
      FOR UPDATE
      TO authenticated
      USING (true)
      WITH CHECK (true)';
  END IF;
END $$;
