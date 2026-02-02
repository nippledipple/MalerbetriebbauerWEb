/*
  # Fix Security Issues

  1. Performance Optimizations
    - Optimize admin_users RLS policies to use (select auth.uid()) instead of auth.uid()
    - Drop unused indexes to improve write performance

  2. Security Improvements
    - Create is_admin() helper function to properly check admin privileges
    - Fix overly permissive RLS policies that allow unrestricted access
    - Remove duplicate SELECT policy on partners table
    - Restrict admin operations to actual admin users

  3. Policy Changes
    - **admin_users**: Optimize auth.uid() calls
    - **ai_inquiries**: Keep INSERT open, remove overly permissive UPDATE/SELECT
    - **contact_requests**: Keep INSERT open for public, restrict UPDATE to admins only
    - **partners**: Restrict all modifications to admin users only
    - **site_settings**: Restrict modifications to admin users only
    - **visitor_stats**: Keep INSERT open for analytics, no changes needed

  4. Important Notes
    - Auth DB Connection Strategy warning must be fixed in Supabase dashboard (not via SQL)
    - Helper function is_admin() checks if authenticated user exists in admin_users table
*/

-- Create helper function to check if user is an admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
STABLE
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 
    FROM public.admin_users 
    WHERE id = auth.uid()
  );
END;
$$;

-- Drop unused indexes to improve write performance
DROP INDEX IF EXISTS public.ai_inquiries_created_at_idx;
DROP INDEX IF EXISTS public.idx_partners_display_order;
DROP INDEX IF EXISTS public.idx_contact_requests_created;
DROP INDEX IF EXISTS public.idx_visitor_stats_visited;
DROP INDEX IF EXISTS public.idx_site_settings_key;

-- Fix admin_users policies (optimize auth.uid() calls)
DROP POLICY IF EXISTS "Admins can view own profile" ON public.admin_users;
DROP POLICY IF EXISTS "Admins can update own profile" ON public.admin_users;

CREATE POLICY "Admins can view own profile"
  ON public.admin_users
  FOR SELECT
  TO authenticated
  USING ((SELECT auth.uid()) = id);

CREATE POLICY "Admins can update own profile"
  ON public.admin_users
  FOR UPDATE
  TO authenticated
  USING ((SELECT auth.uid()) = id)
  WITH CHECK ((SELECT auth.uid()) = id);

-- Fix ai_inquiries policies (remove overly permissive policies)
DROP POLICY IF EXISTS "Anyone can view inquiries" ON public.ai_inquiries;
DROP POLICY IF EXISTS "Authenticated users can update inquiries" ON public.ai_inquiries;
DROP POLICY IF EXISTS "Anyone can insert inquiries" ON public.ai_inquiries;

CREATE POLICY "Anyone can insert inquiries"
  ON public.ai_inquiries
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can view all inquiries"
  ON public.ai_inquiries
  FOR SELECT
  TO authenticated
  USING (public.is_admin());

CREATE POLICY "Admins can update inquiries"
  ON public.ai_inquiries
  FOR UPDATE
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- Fix contact_requests policies
DROP POLICY IF EXISTS "Anyone can view contact requests" ON public.contact_requests;
DROP POLICY IF EXISTS "Authenticated users can update contact requests" ON public.contact_requests;
DROP POLICY IF EXISTS "Anyone can submit contact requests" ON public.contact_requests;

CREATE POLICY "Anyone can submit contact requests"
  ON public.contact_requests
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can view all contact requests"
  ON public.contact_requests
  FOR SELECT
  TO authenticated
  USING (public.is_admin());

CREATE POLICY "Admins can update contact requests"
  ON public.contact_requests
  FOR UPDATE
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- Fix partners policies (remove duplicate and overly permissive policies)
DROP POLICY IF EXISTS "Authenticated users can view all partners" ON public.partners;
DROP POLICY IF EXISTS "Authenticated users can insert partners" ON public.partners;
DROP POLICY IF EXISTS "Authenticated users can update partners" ON public.partners;
DROP POLICY IF EXISTS "Authenticated users can delete partners" ON public.partners;

CREATE POLICY "Admins can view all partners"
  ON public.partners
  FOR SELECT
  TO authenticated
  USING (public.is_admin());

CREATE POLICY "Admins can insert partners"
  ON public.partners
  FOR INSERT
  TO authenticated
  WITH CHECK (public.is_admin());

CREATE POLICY "Admins can update partners"
  ON public.partners
  FOR UPDATE
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "Admins can delete partners"
  ON public.partners
  FOR DELETE
  TO authenticated
  USING (public.is_admin());

-- Fix site_settings policies
DROP POLICY IF EXISTS "Admins can insert settings" ON public.site_settings;
DROP POLICY IF EXISTS "Admins can update settings" ON public.site_settings;
DROP POLICY IF EXISTS "Admins can view settings" ON public.site_settings;

CREATE POLICY "Admins can view settings"
  ON public.site_settings
  FOR SELECT
  TO authenticated
  USING (public.is_admin());

CREATE POLICY "Admins can insert settings"
  ON public.site_settings
  FOR INSERT
  TO authenticated
  WITH CHECK (public.is_admin());

CREATE POLICY "Admins can update settings"
  ON public.site_settings
  FOR UPDATE
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- visitor_stats INSERT policy is intentionally permissive for analytics
-- No changes needed - anonymous users should be able to log visits