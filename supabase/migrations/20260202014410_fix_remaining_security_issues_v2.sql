/*
  # Fix Remaining Security Issues

  1. Function Security
    - Fix is_admin() function to use immutable search_path for security

  2. Policy Improvements
    - Fix multiple permissive policies on partners table by using restrictive policy for public access
    - Add basic validation to INSERT policies while keeping them accessible for public forms

  3. Validation Enhancements
    - Add constraints to ensure data quality on public-facing INSERT operations
    - Validate email formats and required fields

  4. Important Notes
    - **Auth DB Connection Strategy** must be fixed in Supabase Dashboard (Settings > Database > Connection Pooling)
      Change from fixed number (10) to percentage-based allocation
    - Some policies remain intentionally permissive for public forms (contact, inquiries, visitor stats)
      but now include basic validation checks
*/

-- Fix is_admin() function with immutable search_path (using CREATE OR REPLACE to avoid dependency issues)
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
STABLE
SET search_path = public, pg_temp
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 
    FROM public.admin_users 
    WHERE id = auth.uid()
  );
END;
$$;

-- Fix partners table: Change public SELECT policy to be restrictive
-- This prevents the "multiple permissive policies" warning
DROP POLICY IF EXISTS "Anyone can view active partners" ON public.partners;

CREATE POLICY "Public can view active partners"
  ON public.partners
  AS RESTRICTIVE
  FOR SELECT
  TO public
  USING (is_active = true);

-- Improve ai_inquiries INSERT policy with basic validation
DROP POLICY IF EXISTS "Anyone can insert inquiries" ON public.ai_inquiries;

CREATE POLICY "Anyone can insert inquiries"
  ON public.ai_inquiries
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    message IS NOT NULL 
    AND length(message) > 0 
    AND length(message) <= 10000
  );

-- Improve contact_requests INSERT policy with validation
DROP POLICY IF EXISTS "Anyone can submit contact requests" ON public.contact_requests;

CREATE POLICY "Anyone can submit contact requests"
  ON public.contact_requests
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    name IS NOT NULL 
    AND length(name) > 0 
    AND length(name) <= 200
    AND email IS NOT NULL 
    AND email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
    AND message IS NOT NULL 
    AND length(message) > 0 
    AND length(message) <= 10000
  );

-- Improve visitor_stats INSERT policy with basic validation
DROP POLICY IF EXISTS "Anyone can insert visitor stats" ON public.visitor_stats;

CREATE POLICY "Anyone can insert visitor stats"
  ON public.visitor_stats
  FOR INSERT
  TO anon
  WITH CHECK (
    page_url IS NOT NULL 
    AND length(page_url) > 0 
    AND length(page_url) <= 2048
  );