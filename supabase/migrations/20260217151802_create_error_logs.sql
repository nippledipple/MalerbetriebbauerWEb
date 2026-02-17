/*
  # Fehlerprotokoll-System

  1. Neue Tabelle
    - `error_logs`
      - `id` (uuid, primary key)
      - `error_type` (text) - Art des Fehlers (z.B. 'contact_form', 'chat_bot', 'api_error')
      - `error_message` (text) - Fehlermeldung
      - `error_stack` (text, nullable) - Stack Trace falls vorhanden
      - `form_data` (jsonb, nullable) - Die Formulardaten die gesendet werden sollten
      - `user_agent` (text, nullable) - Browser Info
      - `page_url` (text, nullable) - Von welcher Seite der Fehler kam
      - `ip_hash` (text, nullable) - Hash der IP für Tracking
      - `created_at` (timestamp)
      - `resolved` (boolean) - Ob der Fehler behoben/angesehen wurde
      - `resolved_at` (timestamp, nullable)
      - `notes` (text, nullable) - Admin-Notizen zum Fehler

  2. Security
    - Enable RLS on `error_logs` table
    - Add policy for authenticated admin users to read all error logs
    - Add policy for anonymous users to insert error logs (nur für Logging)
*/

CREATE TABLE IF NOT EXISTS error_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  error_type text NOT NULL,
  error_message text NOT NULL,
  error_stack text,
  form_data jsonb,
  user_agent text,
  page_url text,
  ip_hash text,
  created_at timestamptz DEFAULT now(),
  resolved boolean DEFAULT false,
  resolved_at timestamptz,
  notes text
);

ALTER TABLE error_logs ENABLE ROW LEVEL SECURITY;

-- Policy für Admin-Zugriff (Lesen und Aktualisieren)
CREATE POLICY "Admins can view all error logs"
  ON error_logs
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
    )
  );

CREATE POLICY "Admins can update error logs"
  ON error_logs
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
    )
  );

-- Policy für anonyme Nutzer (nur Insert für Fehlerprotokollierung)
CREATE POLICY "Anyone can insert error logs"
  ON error_logs
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Index für schnellere Abfragen
CREATE INDEX IF NOT EXISTS idx_error_logs_created_at ON error_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_error_logs_resolved ON error_logs(resolved);
CREATE INDEX IF NOT EXISTS idx_error_logs_error_type ON error_logs(error_type);