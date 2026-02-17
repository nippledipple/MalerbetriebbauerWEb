/*
  # Fix Remaining Security Issues

  ## Security Improvements

  ### error_logs Table
  - Replace "always true" INSERT policy with proper validation
  - Add constraints to prevent abuse:
    - error_type must be non-empty and <= 200 chars
    - error_message must be non-empty and <= 10000 chars
    - page_url if provided must be <= 2048 chars
    - Prevent excessively long user_agent strings
  
  ## Manual Configuration Required
  
  ### Auth DB Connection Strategy
  The Auth server is currently configured to use a fixed number (10) of database connections.
  This setting cannot be changed via SQL migrations and requires manual configuration:
  
  1. Go to Supabase Dashboard > Project Settings > Database
  2. Navigate to Connection Pooling settings
  3. Change Auth server connection mode from "Fixed" to "Percentage"
  4. This allows the Auth server to scale connections with instance size
  
  Note: This is a project-level configuration that must be done through the Supabase dashboard.
*/

-- =====================================================
-- ERROR_LOGS TABLE - SECURE INSERT POLICY
-- =====================================================

-- Drop the insecure "always true" policy
DROP POLICY IF EXISTS "Anyone can insert error logs" ON error_logs;

-- Create secure policy with proper validation
CREATE POLICY "Allow validated error log submissions"
  ON error_logs
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    -- Validate error_type
    error_type IS NOT NULL
    AND length(error_type) > 0
    AND length(error_type) <= 200
    
    -- Validate error_message
    AND error_message IS NOT NULL
    AND length(error_message) > 0
    AND length(error_message) <= 10000
    
    -- Validate page_url if provided
    AND (page_url IS NULL OR length(page_url) <= 2048)
    
    -- Validate user_agent if provided (prevent abuse)
    AND (user_agent IS NULL OR length(user_agent) <= 1000)
    
    -- Validate error_stack if provided
    AND (error_stack IS NULL OR length(error_stack) <= 50000)
    
    -- Ensure resolved fields are not set on insert (admin-only fields)
    AND resolved = false
    AND resolved_at IS NULL
    AND notes IS NULL
  );