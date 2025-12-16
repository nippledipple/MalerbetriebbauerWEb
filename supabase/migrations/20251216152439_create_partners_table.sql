/*
  # Create Partners Table

  1. New Tables
    - `partners`
      - `id` (uuid, primary key)
      - `name` (text) - Partner name
      - `logo_url` (text) - Path to logo image
      - `description` (text) - Short description of partnership
      - `website_url` (text, optional) - Partner's website
      - `display_order` (integer) - Order in which to display partners
      - `is_active` (boolean) - Whether partner should be displayed
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `partners` table
    - Add policy for public read access (partners are public)
    - Add policy for authenticated admin users to manage partners
*/

CREATE TABLE IF NOT EXISTS partners (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  logo_url text NOT NULL,
  description text NOT NULL,
  website_url text,
  display_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE partners ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active partners"
  ON partners
  FOR SELECT
  USING (is_active = true);

CREATE POLICY "Authenticated users can insert partners"
  ON partners
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update partners"
  ON partners
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete partners"
  ON partners
  FOR DELETE
  TO authenticated
  USING (true);

CREATE INDEX IF NOT EXISTS idx_partners_display_order ON partners(display_order, created_at);