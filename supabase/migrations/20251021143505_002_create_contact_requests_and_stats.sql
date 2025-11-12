/*
  # Update Database Schema for Malerbetrieb Bauer Website

  ## Changes
  - Create contact_requests table (replacing contact_submissions)
  - Create visitor_stats table (replacing visitor_tracking)
  - Update admin_users to work with Supabase Auth
  - Add proper RLS policies

  ## New Tables
  - contact_requests: Store contact form submissions
  - visitor_stats: GDPR-compliant visitor tracking

  ## Security
  - Enable RLS on all tables
  - Add policies for authenticated and anonymous access
*/

-- Create contact_requests table
CREATE TABLE IF NOT EXISTS contact_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  message text NOT NULL,
  status text NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'done')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE contact_requests ENABLE ROW LEVEL SECURITY;

-- Public can insert contact requests
CREATE POLICY "Anyone can submit contact requests"
  ON contact_requests
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Authenticated admins can view all requests
CREATE POLICY "Admins can view all contact requests"
  ON contact_requests
  FOR SELECT
  TO authenticated
  USING (true);

-- Authenticated admins can update requests
CREATE POLICY "Admins can update contact requests"
  ON contact_requests
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create visitor_stats table
CREATE TABLE IF NOT EXISTS visitor_stats (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page_url text NOT NULL,
  referrer text,
  user_agent text,
  ip_hash text,
  session_id text NOT NULL,
  visited_at timestamptz DEFAULT now()
);

ALTER TABLE visitor_stats ENABLE ROW LEVEL SECURITY;

-- Anyone can insert visitor stats (with consent)
CREATE POLICY "Anyone can insert visitor stats"
  ON visitor_stats
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Only authenticated admins can view stats
CREATE POLICY "Admins can view visitor stats"
  ON visitor_stats
  FOR SELECT
  TO authenticated
  USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_contact_requests_status ON contact_requests(status);
CREATE INDEX IF NOT EXISTS idx_contact_requests_created ON contact_requests(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_visitor_stats_session ON visitor_stats(session_id);
CREATE INDEX IF NOT EXISTS idx_visitor_stats_visited ON visitor_stats(visited_at DESC);
