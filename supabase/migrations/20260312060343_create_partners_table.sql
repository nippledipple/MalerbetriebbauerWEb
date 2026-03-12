/*
  # Create Partners Table

  1. New Tables
    - `partners`
      - `id` (uuid, primary key) - Unique identifier for each partner
      - `name` (text, not null) - Partner company name
      - `logo_url` (text, not null) - URL to the partner's logo image
      - `website_url` (text, optional) - Partner's website URL
      - `display_order` (integer, default 0) - Order in which partners should be displayed
      - `is_active` (boolean, default true) - Whether the partner should be shown
      - `created_at` (timestamptz) - Timestamp when partner was added
      - `updated_at` (timestamptz) - Timestamp when partner was last updated

  2. Security
    - Enable RLS on `partners` table
    - Add policy for public read access (partners are public information)
    - Add policy for authenticated admin users to manage partners

  3. Notes
    - Partners are displayed on the homepage and dedicated partners page
    - Only active partners are shown to visitors
    - Display order allows manual sorting
*/

-- Create partners table
CREATE TABLE IF NOT EXISTS partners (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  logo_url text NOT NULL,
  website_url text,
  display_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE partners ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read active partners
CREATE POLICY "Anyone can view active partners"
  ON partners
  FOR SELECT
  USING (is_active = true);

-- Allow authenticated users to read all partners
CREATE POLICY "Authenticated users can view all partners"
  ON partners
  FOR SELECT
  TO authenticated
  USING (true);

-- Allow authenticated users to insert partners
CREATE POLICY "Authenticated users can insert partners"
  ON partners
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Allow authenticated users to update partners
CREATE POLICY "Authenticated users can update partners"
  ON partners
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Allow authenticated users to delete partners
CREATE POLICY "Authenticated users can delete partners"
  ON partners
  FOR DELETE
  TO authenticated
  USING (true);

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_partners_display_order ON partners(display_order, created_at);
CREATE INDEX IF NOT EXISTS idx_partners_active ON partners(is_active);