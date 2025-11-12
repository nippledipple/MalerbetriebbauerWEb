/*
  # Create AI Inquiries Table

  1. New Tables
    - `ai_inquiries`
      - `id` (uuid, primary key) - Unique identifier for each inquiry
      - `created_at` (timestamptz) - When the inquiry was created
      - `source` (text) - Source type: 'angebot', 'chat', or 'rueckruf'
      - `name` (text) - Customer name
      - `phone` (text, nullable) - Phone number
      - `email` (text, nullable) - Email address
      - `address_street` (text, nullable) - Street address
      - `address_zip` (text, nullable) - ZIP code
      - `address_city` (text, nullable) - City
      - `work_type` (text, nullable) - Type of work requested
      - `message` (text, nullable) - Additional message or details
      - `status` (text) - Status: 'Neu', 'In Bearbeitung', or 'Erledigt'
      - `updated_at` (timestamptz) - When the inquiry was last updated

  2. Security
    - Enable RLS on `ai_inquiries` table
    - Add policy for anonymous users to insert inquiries (chatbot submissions)
    - Add policies for authenticated admins to read and update inquiries

  3. Indexes
    - Index on `created_at` for sorting
    - Index on `status` for filtering
*/

CREATE TABLE IF NOT EXISTS ai_inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  source text NOT NULL DEFAULT 'chat',
  name text NOT NULL,
  phone text,
  email text,
  address_street text,
  address_zip text,
  address_city text,
  work_type text,
  message text,
  status text DEFAULT 'Neu',
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE ai_inquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert inquiries"
  ON ai_inquiries FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view all inquiries"
  ON ai_inquiries FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update inquiries"
  ON ai_inquiries FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE INDEX IF NOT EXISTS ai_inquiries_created_at_idx ON ai_inquiries (created_at DESC);
CREATE INDEX IF NOT EXISTS ai_inquiries_status_idx ON ai_inquiries (status);

CREATE OR REPLACE FUNCTION update_ai_inquiry_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_ai_inquiry_updated_at_trigger ON ai_inquiries;

CREATE TRIGGER update_ai_inquiry_updated_at_trigger
  BEFORE UPDATE ON ai_inquiries
  FOR EACH ROW
  EXECUTE FUNCTION update_ai_inquiry_updated_at();