/*
  # Initial Schema for Malerbetrieb Bauer Website

  ## Overview
  This migration creates the complete database structure for the Malerbetrieb Bauer website,
  including user management, contact requests, visitor tracking, and settings.

  ## New Tables

  ### 1. `contact_requests`
  Stores all contact form submissions from website visitors
  - `id` (uuid, primary key)
  - `name` (text) - Visitor's full name
  - `email` (text) - Visitor's email address
  - `phone` (text, nullable) - Optional phone number
  - `message` (text) - The inquiry message
  - `status` (text) - Status: 'open' or 'done'
  - `created_at` (timestamptz) - Submission timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### 2. `site_settings`
  Stores website configuration and admin settings
  - `id` (uuid, primary key)
  - `key` (text, unique) - Setting identifier
  - `value` (text) - Setting value (JSON string)
  - `updated_at` (timestamptz)

  ### 3. `visitor_stats`
  Tracks website visitor analytics (GDPR-compliant)
  - `id` (uuid, primary key)
  - `page_url` (text) - Visited page
  - `referrer` (text, nullable) - Referrer URL
  - `user_agent` (text) - Browser info
  - `ip_hash` (text) - Hashed IP (anonymized)
  - `session_id` (text) - Session identifier
  - `visited_at` (timestamptz) - Visit timestamp

  ### 4. `admin_users`
  Stores admin user information (extends Supabase auth.users)
  - `id` (uuid, primary key, references auth.users)
  - `email` (text)
  - `full_name` (text)
  - `must_change_password` (boolean)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ## Security
  - Row Level Security (RLS) enabled on all tables
  - Authenticated users can manage contact requests
  - Public users can insert contact requests (with rate limiting)
  - Only authenticated admins can view statistics and settings
  - Visitor stats are anonymized and GDPR-compliant
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

-- Public can insert contact requests (spam protection handled in app)
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

-- Create site_settings table
CREATE TABLE IF NOT EXISTS site_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text UNIQUE NOT NULL,
  value text NOT NULL,
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Only authenticated admins can access settings
CREATE POLICY "Admins can view settings"
  ON site_settings
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can update settings"
  ON site_settings
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admins can insert settings"
  ON site_settings
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Create visitor_stats table (GDPR-compliant tracking)
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

-- Create admin_users table
CREATE TABLE IF NOT EXISTS admin_users (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  full_name text NOT NULL DEFAULT 'Admin',
  must_change_password boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Admins can view their own data
CREATE POLICY "Admins can view own profile"
  ON admin_users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Admins can update their own data
CREATE POLICY "Admins can update own profile"
  ON admin_users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_contact_requests_status ON contact_requests(status);
CREATE INDEX IF NOT EXISTS idx_contact_requests_created ON contact_requests(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_visitor_stats_session ON visitor_stats(session_id);
CREATE INDEX IF NOT EXISTS idx_visitor_stats_visited ON visitor_stats(visited_at DESC);
CREATE INDEX IF NOT EXISTS idx_site_settings_key ON site_settings(key);

-- Insert default settings
INSERT INTO site_settings (key, value) VALUES
  ('admin_email', '"admin@malerbetriebbauer.com"'),
  ('smtp_configured', 'false'),
  ('tracking_enabled', 'false'),
  ('cookie_banner_text', '"Wir verwenden Cookies, um Ihnen die bestmögliche Nutzererfahrung zu bieten."')
ON CONFLICT (key) DO NOTHING;
