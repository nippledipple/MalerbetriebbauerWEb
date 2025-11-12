/*
  # Update Contact Requests RLS Policies

  1. Changes
    - Update RLS policies to allow anonymous users to insert contact requests
    - Allow anonymous users to view contact requests (for admin dashboard)
    - Keep update restrictions to authenticated users only

  2. Security
    - Anonymous users can INSERT (for public contact form)
    - Anonymous and authenticated users can SELECT (for admin dashboard)
    - Only authenticated users can UPDATE (status changes)
*/

DROP POLICY IF EXISTS "Anyone can submit contact requests" ON contact_requests;
DROP POLICY IF EXISTS "Admins can view all contact requests" ON contact_requests;
DROP POLICY IF EXISTS "Admins can update contact requests" ON contact_requests;

CREATE POLICY "Anyone can submit contact requests"
  ON contact_requests
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can view contact requests"
  ON contact_requests
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can update contact requests"
  ON contact_requests
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);
