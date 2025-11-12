/*
  # Fix AI Inquiries Access for Admin Dashboard

  1. Changes
    - Add policy to allow anonymous users to read inquiries (for admin dashboard)
    - This matches the pattern used in other tables (contact_requests)

  2. Security
    - Anonymous users can read all inquiries (needed for admin dashboard)
    - Only authenticated users can update
    - Anyone can insert (for chatbot)
*/

DROP POLICY IF EXISTS "Anyone can view inquiries" ON ai_inquiries;

CREATE POLICY "Anyone can view inquiries"
  ON ai_inquiries FOR SELECT
  TO anon, authenticated
  USING (true);
