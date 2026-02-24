/*
  # HubSpot Integration Settings

  Creates a table to store HubSpot configuration for tracking and chat widget.

  ## New Tables
  
  ### `hubspot_settings`
  - `id` (uuid, primary key) - Unique identifier
  - `portal_id` (text) - HubSpot Portal/Hub ID for tracking and chat
  - `tracking_enabled` (boolean, default: false) - Enable/disable HubSpot tracking code
  - `chat_enabled` (boolean, default: false) - Enable/disable HubSpot chat widget
  - `updated_at` (timestamptz) - Last update timestamp
  - `updated_by` (uuid, nullable) - User who made the update

  ## Security
  
  - Enable RLS on `hubspot_settings` table
  - Admin users can read and update settings
  - Authenticated users can read settings (needed for frontend integration)
  - Anonymous users can read settings (needed for public website)

  ## Notes
  
  - Only one settings record should exist (enforced by application logic)
  - Portal ID is stored as text to preserve leading zeros
  - Both tracking and chat can be enabled/disabled independently
*/

CREATE TABLE IF NOT EXISTS hubspot_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  portal_id text DEFAULT '',
  tracking_enabled boolean DEFAULT false,
  chat_enabled boolean DEFAULT false,
  updated_at timestamptz DEFAULT now(),
  updated_by uuid
);

ALTER TABLE hubspot_settings ENABLE ROW LEVEL SECURITY;

-- Allow everyone to read settings (needed for public website)
CREATE POLICY "Anyone can read HubSpot settings"
  ON hubspot_settings
  FOR SELECT
  TO public
  USING (true);

-- Only authenticated users can update settings
CREATE POLICY "Authenticated users can update HubSpot settings"
  ON hubspot_settings
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Only authenticated users can insert settings
CREATE POLICY "Authenticated users can insert HubSpot settings"
  ON hubspot_settings
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Insert default settings record
INSERT INTO hubspot_settings (portal_id, tracking_enabled, chat_enabled)
VALUES ('', false, false)
ON CONFLICT DO NOTHING;