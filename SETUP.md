# Setup-Anleitung - Malerbetrieb Bauer Website

Diese Anleitung führt Sie Schritt für Schritt durch die komplette Einrichtung der Website.

## ⚠️ WICHTIGER HINWEIS: Admin-Benutzer muss noch erstellt werden!

**Die Datenbank ist bereits eingerichtet**, aber Sie müssen noch einen Admin-Benutzer in Supabase Auth anlegen.

📖 **Detaillierte Anleitung:** Siehe `ADMIN_USER_SETUP.md` für eine Schritt-für-Schritt-Anleitung mit Screenshots.

**Schnellstart:**
1. Öffnen Sie https://supabase.com/dashboard
2. Gehen Sie zu **Authentication → Users**
3. Klicken Sie auf **Add User**
4. Email: `admin@malerbetriebbauer.com`, Password: `admin123`
5. **Aktivieren Sie "Auto Confirm User"** ✓
6. Klicken Sie auf **Create User**

## 📋 Voraussetzungen

- Node.js 18 oder höher installiert
- Ein Supabase-Account (kostenlos unter https://supabase.com)
- Git installiert
- Ein Code-Editor (z.B. VS Code)

## 🚀 Schritt-für-Schritt Installation

### 1. Projekt-Setup

```bash
# Abhängigkeiten installieren
npm install
```

### 2. Umgebungsvariablen prüfen

Die Datei `.env` sollte bereits diese Werte enthalten:
```
VITE_SUPABASE_URL=https://0ec90b57d6e95fcbda19832f.supabase.co
VITE_SUPABASE_ANON_KEY=...
```

Diese sind bereits konfiguriert und funktionieren.

### 3. Datenbank einrichten

#### 3.1 Supabase Dashboard öffnen
1. Gehen Sie zu https://supabase.com/dashboard
2. Melden Sie sich an
3. Wählen Sie Ihr Projekt aus

#### 3.2 Migration ausführen
1. Navigieren Sie zu **SQL Editor** (linkes Menü)
2. Klicken Sie auf **New Query**
3. Öffnen Sie die Datei `supabase/migrations/001_initial_schema.sql` in Ihrem Code-Editor
4. Kopieren Sie den **gesamten Inhalt** der Datei
5. Fügen Sie den Inhalt in den SQL Editor ein
6. Klicken Sie auf **Run** (oder drücken Sie Ctrl/Cmd + Enter)

✅ Sie sollten die Meldung "Success. No rows returned" sehen.

#### 3.3 Tabellen überprüfen
1. Gehen Sie zu **Table Editor** (linkes Menü)
2. Sie sollten jetzt diese Tabellen sehen:
   - ✅ `contact_requests`
   - ✅ `visitor_stats`
   - ✅ `site_settings`
   - ✅ `admin_users`

### 4. Admin-Benutzer erstellen

#### 4.1 Benutzer in Supabase Auth anlegen
1. Gehen Sie zu **Authentication > Users** (linkes Menü)
2. Klicken Sie auf **Add User** (oben rechts)
3. Wählen Sie **Create new user**
4. Füllen Sie aus:
   - **Email**: `admin@malerbetriebbauer.com`
   - **Password**: `admin123` (oder Ihr eigenes sicheres Passwort)
   - **Auto Confirm User**: ✅ Aktivieren (wichtig!)
5. Klicken Sie auf **Create User**

✅ Der Admin-Benutzer ist jetzt angelegt.

### 5. Website starten

```bash
# Entwicklungsserver starten
npm run dev
```

Die Website läuft nun auf: **http://localhost:5173**

### 6. Ersten Login testen

1. Öffnen Sie http://localhost:5173 im Browser
2. Klicken Sie oben rechts auf **Login**
3. Melden Sie sich an mit:
   - **E-Mail**: `admin@malerbetriebbauer.com`
   - **Passwort**: `admin123`
4. Sie sollten jetzt das **Admin-Dashboard** sehen

✅ Der Login funktioniert!

## 🧪 Funktionen testen

### Kontaktformular testen

1. Navigieren Sie zu **Kontakt**
2. Füllen Sie das Formular aus
3. Akzeptieren Sie die Datenschutz-Checkbox
4. Klicken Sie auf **Nachricht senden**
5. Gehen Sie zum **Admin-Dashboard > Postfach**
6. Ihre Test-Anfrage sollte dort erscheinen

### Cookie-Banner testen

1. Öffnen Sie die Website im Inkognito-Modus
2. Das Cookie-Banner sollte erscheinen
3. Testen Sie:
   - ✅ "Alle akzeptieren"
   - ✅ "Ablehnen"
   - ✅ "Einstellungen" (granulare Kontrolle)
4. Überprüfen Sie im Browser-LocalStorage:
   - Key: `cookieConsent`
   - Sollte Ihre Auswahl enthalten

### Tracking testen

1. Im Admin-Dashboard akzeptieren Sie alle Cookies
2. Navigieren Sie zwischen verschiedenen Seiten
3. Gehen Sie zu **Admin-Dashboard > Statistiken**
4. Sie sollten Besucherdaten sehen

## 🔐 Sicherheit & Produktion

### Passwort ändern (WICHTIG!)

Nach dem ersten Login:
1. Gehen Sie zu Supabase Dashboard
2. **Authentication > Users**
3. Klicken Sie auf den Admin-Benutzer
4. Ändern Sie das Passwort zu einem sicheren Passwort

### Production Build

```bash
# Build für Produktion erstellen
npm run build

# Build lokal testen
npm run preview
```

### Deployment-Checkliste

- [ ] Admin-Passwort geändert
- [ ] Cookie-Banner getestet
- [ ] Kontaktformular getestet
- [ ] Alle Seiten auf mobile Geräten getestet
- [ ] Google Maps Koordinaten überprüft
- [ ] Impressum & Datenschutz aktualisiert
- [ ] Backup-Funktion getestet
- [ ] HTTPS aktiviert (bei Hosting-Provider)

## 🐛 Troubleshooting

### Problem: "Supabase is not configured"

**Lösung:** Überprüfen Sie, ob die `.env` Datei existiert und die richtigen Werte enthält.

### Problem: "Error executing SQL"

**Lösung:**
1. Löschen Sie alle Tabellen in Supabase (Table Editor)
2. Führen Sie die Migration erneut aus
3. Achten Sie darauf, den **gesamten** Inhalt der SQL-Datei zu kopieren

### Problem: "User not found" beim Login

**Lösung:**
1. Überprüfen Sie in Supabase Dashboard > Authentication > Users
2. Der Benutzer muss existieren
3. **Wichtig:** "Email Confirmed" muss auf ✅ stehen
4. Falls nicht: Klicken Sie auf den User > "Send confirmation email" oder setzen Sie "Confirmed" manuell

### Problem: Keine Kontaktanfragen im Postfach

**Lösung:**
1. Überprüfen Sie die Browser-Konsole auf Fehler
2. Gehen Sie zu Supabase > Table Editor > contact_requests
3. Prüfen Sie, ob Einträge vorhanden sind
4. Falls ja, aber nicht sichtbar: RLS-Policies überprüfen

### Problem: Tracking funktioniert nicht

**Lösung:**
1. Überprüfen Sie, ob Cookies akzeptiert wurden (LocalStorage: `cookieConsent`)
2. "statistics" muss auf `true` stehen
3. Prüfen Sie die Browser-Konsole auf Fehler
4. Aktivieren Sie Tracking im Admin-Dashboard > Einstellungen

## 📊 Datenbank-Management

### Backup erstellen

**Manuell über Supabase:**
1. Supabase Dashboard > Database
2. **Backups** im Menü
3. Download

**Über Admin-Dashboard:**
1. Admin-Dashboard > Einstellungen
2. "Backup herunterladen"
3. JSON-Datei wird heruntergeladen

### Daten exportieren

**Kontaktanfragen als CSV:**
1. Admin-Dashboard > Postfach
2. "Als CSV exportieren"

**Alle Daten:**
```bash
# Supabase CLI installieren (optional)
npm install -g supabase

# Datenbank exportieren
supabase db dump > backup.sql
```

## 🎨 Anpassungen

### Farben ändern

Die Hauptfarben sind in `tailwind.config.js` und als Utility-Klassen definiert:
- Gelb: `#ffd900` → Klasse: `bg-[#ffd900]`, `text-[#ffd900]`
- Grau: `#585858` → Klasse: `bg-[#585858]`, `text-[#585858]`
- Gold: `#ca9922` → Klasse: `bg-[#ca9922]`, `text-[#ca9922]`

### Texte ändern

Alle Texte sind direkt in den Komponenten:
- Homepage: `src/pages/HomePage.tsx`
- Über uns: `src/pages/AboutPage.tsx`
- Leistungen: `src/pages/ServicesPage.tsx`
- Kontakt: `src/pages/ContactPage.tsx`

### Google Maps Koordinaten

In `src/pages/ContactPage.tsx` Zeile 168:
```tsx
src="https://www.google.com/maps/embed?pb=..."
```

Neue Koordinaten generieren:
1. Öffnen Sie https://google.com/maps
2. Suchen Sie "Neue Str. 19, 95173 Schönwald"
3. Klicken Sie auf "Teilen" > "Karte einbetten"
4. Kopieren Sie die URL aus dem iframe
5. Ersetzen Sie die URL im Code

## 📞 Support

Bei Fragen oder Problemen:
- 📧 E-Mail: info@malerbetriebbauer.com
- 📞 Telefon: +49 9242 96190

## ✅ Setup abgeschlossen!

Wenn Sie alle Schritte befolgt haben, ist Ihre Website jetzt:
- ✅ Voll funktionsfähig
- ✅ DSGVO-konform
- ✅ Mit Admin-Dashboard
- ✅ Bereit für Produktion

**Viel Erfolg mit Ihrer neuen Website!** 🎉
