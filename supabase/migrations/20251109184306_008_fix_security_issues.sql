/*
  # Fix Security and Performance Issues

  ## Changes Made
  
  1. **Add Missing Index**
     - Add index on login_sessions.user_id for foreign key performance
  
  2. **Optimize RLS Policies**
     - Update auth.uid() calls to use (SELECT auth.uid()) for better performance
     - This prevents re-evaluation for each row
  
  3. **Remove Duplicate Policies**
     - Remove duplicate SELECT policies on ai_inquiries
     - Remove duplicate SELECT and UPDATE policies on contact_requests
  
  4. **Drop Unused Indexes**
     - Remove indexes that are not being used by queries
  
  5. **Fix Function Search Path**
     - Update function to have immutable search path
  
  ## Security
  - All RLS policies remain restrictive and secure
  - Performance optimizations don't compromise security
*/

-- 1. Add missing index for foreign key
CREATE INDEX IF NOT EXISTS idx_login_sessions_user_id ON login_sessions(user_id);

-- 2. Optimize RLS policies - Replace auth.uid() with (SELECT auth.uid())

-- Admin Users policies
DROP POLICY IF EXISTS "Admin users can read own data" ON admin_users;
CREATE POLICY "Admin users can read own data"
  ON admin_users
  FOR SELECT
  TO authenticated
  USING ((SELECT auth.uid()) = id);

DROP POLICY IF EXISTS "Admin users can update own data" ON admin_users;
CREATE POLICY "Admin users can update own data"
  ON admin_users
  FOR UPDATE
  TO authenticated
  USING ((SELECT auth.uid()) = id)
  WITH CHECK ((SELECT auth.uid()) = id);

-- Login Sessions policies
DROP POLICY IF EXISTS "Users can view own sessions" ON login_sessions;
CREATE POLICY "Users can view own sessions"
  ON login_sessions
  FOR SELECT
  TO authenticated
  USING ((SELECT auth.uid()) = user_id);

DROP POLICY IF EXISTS "Users can delete own sessions" ON login_sessions;
CREATE POLICY "Users can delete own sessions"
  ON login_sessions
  FOR DELETE
  TO authenticated
  USING ((SELECT auth.uid()) = user_id);

-- 3. Remove duplicate policies

-- AI Inquiries - Keep only one SELECT policy
DROP POLICY IF EXISTS "Authenticated users can view all inquiries" ON ai_inquiries;

-- Contact Requests - Keep only one SELECT and one UPDATE policy
DROP POLICY IF EXISTS "Allow reading contact requests" ON contact_requests;
DROP POLICY IF EXISTS "Allow updating contact requests" ON contact_requests;

-- 4. Drop unused indexes
DROP INDEX IF EXISTS idx_contact_submissions_status;
DROP INDEX IF EXISTS idx_contact_submissions_created_at;
DROP INDEX IF EXISTS idx_visitor_tracking_created_at;
DROP INDEX IF EXISTS idx_visitor_tracking_session_id;
DROP INDEX IF EXISTS idx_login_sessions_token;
DROP INDEX IF EXISTS idx_login_sessions_expires_at;
DROP INDEX IF EXISTS idx_contact_requests_status;
DROP INDEX IF EXISTS idx_visitor_stats_session;
DROP INDEX IF EXISTS ai_inquiries_status_idx;

-- 5. Fix function search path
DROP FUNCTION IF EXISTS update_ai_inquiry_updated_at() CASCADE;

CREATE OR REPLACE FUNCTION update_ai_inquiry_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Recreate trigger
DROP TRIGGER IF EXISTS update_ai_inquiry_updated_at_trigger ON ai_inquiries;
CREATE TRIGGER update_ai_inquiry_updated_at_trigger
  BEFORE UPDATE ON ai_inquiries
  FOR EACH ROW
  EXECUTE FUNCTION update_ai_inquiry_updated_at();
