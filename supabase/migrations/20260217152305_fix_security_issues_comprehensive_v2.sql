/*
  # Comprehensive Security Fixes

  ## Performance Optimizations
  1. Replace `auth.uid()` with `(select auth.uid())` in RLS policies for better performance
  2. Remove unused indexes that add overhead without benefit

  ## Security Improvements
  1. Remove dangerous "always true" RLS policies that bypass security
  2. Consolidate duplicate permissive policies on visitor_stats
  3. Ensure all tables have proper restrictive access controls

  ## Changes by Table

  ### error_logs
  - Update RLS policies to use `(select auth.uid())` for performance
  - Remove unused indexes (idx_error_logs_created_at, idx_error_logs_resolved, idx_error_logs_error_type)
  - Keep secure "Anyone can insert error logs" policy (acceptable for error logging)

  ### partners
  - Remove unused index (idx_partners_active)

  ### visitor_stats
  - Consolidate duplicate permissive SELECT policies

  ### ai_inquiries
  - Remove dangerous "Anyone can update inquiries" policy
  - Add proper admin-only update policy

  ### contact_requests
  - Remove dangerous "Anyone can update contact requests" policy
  - Add proper admin-only update policy
*/

-- =====================================================
-- ERROR_LOGS TABLE FIXES
-- =====================================================

-- Drop and recreate optimized RLS policies for error_logs
DROP POLICY IF EXISTS "Admins can view all error logs" ON error_logs;
DROP POLICY IF EXISTS "Admins can update error logs" ON error_logs;

-- Optimized admin view policy with subquery
CREATE POLICY "Admins can view all error logs"
  ON error_logs
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE admin_users.id = (SELECT auth.uid())
    )
  );

-- Optimized admin update policy with subquery
CREATE POLICY "Admins can update error logs"
  ON error_logs
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE admin_users.id = (SELECT auth.uid())
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE admin_users.id = (SELECT auth.uid())
    )
  );

-- Drop unused indexes on error_logs
DROP INDEX IF EXISTS idx_error_logs_created_at;
DROP INDEX IF EXISTS idx_error_logs_resolved;
DROP INDEX IF EXISTS idx_error_logs_error_type;

-- =====================================================
-- PARTNERS TABLE FIXES
-- =====================================================

-- Drop unused index on partners
DROP INDEX IF EXISTS idx_partners_active;

-- =====================================================
-- VISITOR_STATS TABLE FIXES
-- =====================================================

-- Remove duplicate permissive policies and create single optimized policy
DROP POLICY IF EXISTS "Allow reading visitor stats" ON visitor_stats;
DROP POLICY IF EXISTS "Anyone can view visitor stats" ON visitor_stats;

-- Single consolidated policy for viewing stats
CREATE POLICY "Allow viewing visitor statistics"
  ON visitor_stats
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- =====================================================
-- AI_INQUIRIES TABLE FIXES
-- =====================================================

-- Remove dangerous "always true" update policy
DROP POLICY IF EXISTS "Anyone can update inquiries" ON ai_inquiries;

-- Add proper admin-only update policy
CREATE POLICY "Admins can update ai inquiries"
  ON ai_inquiries
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE admin_users.id = (SELECT auth.uid())
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE admin_users.id = (SELECT auth.uid())
    )
  );

-- =====================================================
-- CONTACT_REQUESTS TABLE FIXES
-- =====================================================

-- Remove dangerous "always true" update policy
DROP POLICY IF EXISTS "Anyone can update contact requests" ON contact_requests;

-- Add proper admin-only update policy
CREATE POLICY "Admins can update contact requests"
  ON contact_requests
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE admin_users.id = (SELECT auth.uid())
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE admin_users.id = (SELECT auth.uid())
    )
  );