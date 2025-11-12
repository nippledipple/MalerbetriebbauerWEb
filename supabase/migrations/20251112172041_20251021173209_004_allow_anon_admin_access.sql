/*
  # Allow Anonymous Admin Access to Data

  1. Changes
    - Update RLS policies to allow anon role access to contact_requests
    - Update RLS policies to allow anon role access to visitor_stats
    - This enables the hybrid auth system (local auth + Supabase data)
    
  2. Security
    - Client-side auth check still required
    - Anon key can read/update data (needed for admin dashboard)
*/

DROP POLICY IF EXISTS "Admins can view all contact requests" ON contact_requests;
DROP POLICY IF EXISTS "Admins can update contact requests" ON contact_requests;
DROP POLICY IF EXISTS "Admins can view visitor stats" ON visitor_stats;

CREATE POLICY "Allow reading contact requests"
  ON contact_requests FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Allow updating contact requests"
  ON contact_requests FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow reading visitor stats"
  ON visitor_stats FOR SELECT
  TO anon, authenticated
  USING (true);