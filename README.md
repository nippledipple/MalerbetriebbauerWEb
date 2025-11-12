# Malerbetrieb Bauer Website

Eine moderne, DSGVO-konforme Website für den Malerbetrieb Bauer mit Admin-Dashboard, Kontaktformular, Besuchertracking und vollständiger Verwaltungsfunktion.

## Funktionen

### Öffentlicher Bereich
- ✅ **Responsive Homepage** mit Hero-Section und Firmenvorstellung
- ✅ **Über uns Seite** mit Unternehmensgeschichte und Team
- ✅ **Leistungen-Übersicht** mit detaillierten Servicebeschreibungen
- ✅ **Kontaktseite** mit Formular und Google Maps Integration
- ✅ **DSGVO-konformes Cookie-Banner** mit granularen Einstellungen
- ✅ **Impressum & Datenschutz** vollständig ausgefüllt

### Admin-Bereich
- ✅ **Sicheres Login-System** mit Supabase Auth
- ✅ **Dashboard mit Echtzeit-Statistiken**
  - Aktive Besucher jetzt
  - Besucher heute / letzte 7 Tage / letzte 30 Tage
  - Gesamt-Seitenaufrufe
- ✅ **Kontaktanfragen-Postfach**
  - Alle Anfragen mit Status-Verwaltung (Offen/Erledigt)
  - Suche und Filter-Funktionen
  - CSV-Export aller Anfragen
  - Direkter E-Mail-Antwort-Link
- ✅ **Einstellungen**
  - Admin-E-Mail konfigurieren
  - Tracking aktivieren/deaktivieren
  - Datenbank-Backup herunterladen

### Technische Features
- ✅ **Supabase Backend** für Datenbank und Authentifizierung
- ✅ **DSGVO-konformes Tracking** (IP-Hashing, anonymisierte Sessions)
- ✅ **Row Level Security (RLS)** für alle Datenbanktabellen
- ✅ **Responsive Design** für alle Geräte
- ✅ **TypeScript** für Type-Safety
- ✅ **Tailwind CSS** für modernes Styling

## Installation & Setup

### ⚠️ WICHTIG: Admin-Benutzer muss noch erstellt werden!

**Die Datenbank ist bereits konfiguriert**, aber der Admin-Benutzer fehlt noch und muss in Supabase Auth angelegt werden.

📖 **Detaillierte Anleitung:** Siehe `ADMIN_USER_SETUP.md`

**Schnellstart - Admin-Benutzer erstellen:**
1. Öffnen Sie https://supabase.com/dashboard
2. Gehen Sie zu **Authentication → Users**
3. Klicken Sie auf **Add User**
4. Email: `admin@malerbetriebbauer.com`, Password: `admin123`
5. ✅ **"Auto Confirm User" aktivieren** (WICHTIG!)
6. Klicken Sie auf **Create User**

### 1. Voraussetzungen
- Node.js 18+ installiert
- Git installiert
- Supabase-Account (bereits konfiguriert)

### 2. Repository klonen & Abhängigkeiten installieren
```bash
npm install
```

### 3. Datenbank-Setup

✅ **Die Datenbank ist bereits konfiguriert** und alle Migrationen sind ausgeführt.

Die Tabellen `contact_requests`, `visitor_stats` und `site_settings` sind bereits angelegt.

### 4. Admin-Benutzer erstellen

**Dies ist der wichtigste Schritt!** Ohne Admin-Benutzer können Sie sich nicht anmelden.

1. Öffnen Sie https://supabase.com/dashboard
2. Wählen Sie Ihr Projekt
3. Navigieren Sie zu **Authentication → Users**
4. Klicken Sie auf **Add User**
5. Füllen Sie aus:
   - **Email:** `admin@malerbetriebbauer.com`
   - **Password:** `admin123`
6. ⚠️ **WICHTIG:** Aktivieren Sie **"Auto Confirm User"**
7. Klicken Sie auf **Create User**

### 5. Entwicklungsserver starten
```bash
npm run dev
```

Die Website läuft dann auf `http://localhost:5173`

## Login-Daten

**Demo-Admin-Zugang:**
- E-Mail: `admin@malerbetriebbauer.com`
- Passwort: `admin123`

⚠️ **WICHTIG:** Ändern Sie das Passwort nach dem ersten Login!

## Datenbankstruktur

### Tabellen

#### `contact_requests`
Speichert alle Kontaktformular-Anfragen
- `id` - Eindeutige ID
- `name` - Name des Absenders
- `email` - E-Mail-Adresse
- `phone` - Telefonnummer (optional)
- `message` - Nachricht
- `status` - Status: 'open' oder 'done'
- `created_at` - Erstellungszeitpunkt
- `updated_at` - Aktualisierungszeitpunkt

#### `visitor_stats`
DSGVO-konforme Besucherstatistiken
- `id` - Eindeutige ID
- `page_url` - Besuchte Seite
- `referrer` - Herkunftsseite
- `user_agent` - Browser-Info
- `ip_hash` - Gehashte IP-Adresse (anonymisiert)
- `session_id` - Session-Identifier
- `visited_at` - Besuchszeitpunkt

#### `site_settings`
Website-Konfiguration
- `id` - Eindeutige ID
- `key` - Einstellungs-Schlüssel
- `value` - Einstellungs-Wert (JSON)
- `updated_at` - Aktualisierungszeitpunkt

#### `admin_users`
Admin-Benutzerinformationen (erweitert Supabase Auth)
- `id` - User-ID (referenziert auth.users)
- `email` - E-Mail-Adresse
- `full_name` - Vollständiger Name
- `must_change_password` - Passwort-Änderung erforderlich
- `created_at` - Erstellungszeitpunkt
- `updated_at` - Aktualisierungszeitpunkt

## DSGVO-Konformität

### Cookie-Banner
- 4 Kategorien: Essentiell, Vorlieben, Statistiken, Marketing
- Granulare Einwilligungskontrolle
- Einstellungen jederzeit änderbar
- Speicherung im LocalStorage

### Tracking
- Nur mit ausdrücklicher Einwilligung
- IP-Adressen werden gehasht (SHA-256)
- Keine personenbezogenen Daten gespeichert
- Session-IDs sind temporär und anonym
- Daten werden nur lokal in Supabase gespeichert

### Datenschutz
- Vollständige Datenschutzerklärung vorhanden
- Impressum mit allen Pflichtangaben
- Kontaktformular mit Einwilligungspflicht
- Alle Rechte gemäß DSGVO dokumentiert

## Google Maps Integration

Die Karte auf der Kontaktseite zeigt den Standort:
- **Adresse:** Neue Str. 19, 95173 Schönwald
- Zoom-Level: 15
- Interaktive Karte mit Routenplanung
- Nur nach Cookie-Einwilligung aktiviert

⚠️ **Hinweis:** Die aktuelle Google Maps URL ist ein Beispiel. Für die Produktion sollten Sie:
1. Eine Google Maps API-Key erstellen
2. Die Koordinaten exakt für "Neue Str. 19, 95173 Schönwald" einstellen

## Admin-Dashboard Funktionen

### Statistiken-Panel
- Echtzeit-Übersicht aktiver Besucher
- Besucherzahlen für verschiedene Zeiträume
- Anonymisierte Tracking-Daten
- DSGVO-Hinweise

### Postfach-Panel
- Übersicht aller Kontaktanfragen
- Status-Verwaltung (Offen/Erledigt)
- Suche nach Name, E-Mail oder Nachricht
- Filter nach Status
- CSV-Export für Archivierung
- Direkte E-Mail-Antwort-Funktion

### Einstellungen-Panel
- Admin-E-Mail konfigurieren
- Tracking aktivieren/deaktivieren
- Backup-Download (JSON-Format)
- Einstellungen werden in Datenbank gespeichert

## Backup & Datenexport

### Kontaktanfragen als CSV exportieren
Im Admin-Dashboard > Postfach > "Als CSV exportieren"

### Komplettes Backup
Im Admin-Dashboard > Einstellungen > "Backup herunterladen"

Enthält:
- Alle Kontaktanfragen
- Besucherstatistiken
- Website-Einstellungen
- Zeitstempel und Version

## Deployment

### Production Build erstellen
```bash
npm run build
```

### Wichtige Schritte für Produktion:
1. ✅ Datenbank-Migration in Supabase ausführen
2. ✅ Admin-Benutzer anlegen
3. ⚠️ Admin-Passwort ändern!
4. ✅ Google Maps API-Key konfigurieren (optional)
5. ✅ Cookie-Banner testen
6. ✅ Tracking-Einwilligung testen
7. ✅ Kontaktformular testen

## Sicherheit

### Implementierte Sicherheitsmaßnahmen
- ✅ Supabase Auth für sichere Authentifizierung
- ✅ Row Level Security (RLS) für alle Tabellen
- ✅ Passwort-Hashing durch Supabase
- ✅ HTTPS-Erzwingung (Production)
- ✅ XSS-Schutz durch React
- ✅ Input-Validierung auf Client- und Server-Seite
- ✅ DSGVO-konforme Datenverarbeitung

### Empfohlene zusätzliche Maßnahmen
- 🔒 2-Faktor-Authentifizierung aktivieren (Supabase Dashboard)
- 🔒 Rate-Limiting für Kontaktformular (Supabase Edge Functions)
- 🔒 CAPTCHA für Kontaktformular (z.B. reCAPTCHA v3)

## Technologie-Stack

- **Frontend:** React 18 + TypeScript
- **Styling:** Tailwind CSS
- **Backend:** Supabase (PostgreSQL)
- **Auth:** Supabase Auth
- **Build:** Vite
- **Icons:** Lucide React

## Ordnerstruktur

```
project/
├── src/
│   ├── components/          # Wiederverwendbare Komponenten
│   │   ├── admin/          # Admin-spezifische Komponenten
│   │   ├── CookieBanner.tsx
│   │   ├── Footer.tsx
│   │   ├── LoginModal.tsx
│   │   └── Navigation.tsx
│   ├── contexts/           # React Contexts
│   │   ├── AuthContext.tsx
│   │   └── CookieContext.tsx
│   ├── hooks/              # Custom React Hooks
│   │   └── useTracking.ts
│   ├── lib/                # Utilities und Konfiguration
│   │   └── supabase.ts
│   ├── pages/              # Haupt-Seiten-Komponenten
│   │   ├── AboutPage.tsx
│   │   ├── AdminDashboard.tsx
│   │   ├── ContactPage.tsx
│   │   ├── DatenschutzPage.tsx
│   │   ├── HomePage.tsx
│   │   ├── ImpressumPage.tsx
│   │   └── ServicesPage.tsx
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── supabase/
│   └── migrations/         # Datenbank-Migrationen
│       └── 001_initial_schema.sql
├── .env                    # Umgebungsvariablen
├── package.json
└── README.md
```

## Splash-Screen / Intro-Animation

### Features
Die Website zeigt beim ersten Besuch (innerhalb von 24 Stunden) eine zweistufige Intro-Sequenz:

**1. Video-Intro** (tomnspur.mp4)
- ✅ **Fullscreen-Video**: Automatisch abgespielt, stumm geschaltet
- ✅ **Smooth Fade-Out**: 1-Sekunden-Überblendung nach Video-Ende
- ✅ **24h-Cooldown**: Video wird nur einmal pro Tag pro Besucher angezeigt
- ✅ **Barrierefreiheit**: Respektiert `prefers-reduced-motion` - kein Video bei aktivierter Bewegungsreduzierung
- ✅ **Fehlerbehandlung**: Bei Ladefehler wird automatisch übersprungen

**2. Logo-Animation** (nach Video oder sofort bei wiederholtem Besuch)
- ✅ **Fly-in Animation**: Logo fliegt ein, rotiert und wird größer
- ✅ **Smooth Bounce**: Subtiler Bounce-Effekt am Ende
- ✅ **24h-Cooldown**: Intro wird nur einmal pro Tag pro Besucher angezeigt
- ✅ **Überspringen-Button**: Besucher können die Animation jederzeit überspringen
- ✅ **ESC-Taste**: Alternative Möglichkeit zum Überspringen
- ✅ **Barrierefreiheit**: Respektiert `prefers-reduced-motion` - kein Intro bei aktivierter Bewegungsreduzierung
- ✅ **SEO-freundlich**: Hauptinhalt bleibt im DOM, nur visuell überlagert
- ✅ **Performance**: GPU-accelerierte Transforms, keine schweren Bibliotheken

### Video austauschen
Das Intro-Video liegt unter `/public/public/tomnspur.mp4`.

Um das Video zu ändern:
1. Ersetzen Sie die Datei im `public/` Ordner
2. Aktualisieren Sie den Pfad in `index.html` (Zeile 12):
   ```html
   <source src="/ihr-neues-video.mp4" type="video/mp4">
   ```
3. Empfohlene Video-Parameter:
   - Format: MP4 (H.264)
   - Dauer: 3-10 Sekunden (für optimale UX)
   - Auflösung: max. 1920×1080
   - Dateigröße: < 5 MB für schnelle Ladezeiten

### Logo austauschen
Das Logo liegt unter `/public/e48083a5-33c2-4e82-9bfb-10683f40cf8d 3 copy.JPG`.

Um das Logo zu ändern:
1. Ersetzen Sie die Datei im `public/` Ordner
2. Aktualisieren Sie den Pfad in `index.html` (Zeile 77):
   ```html
   src="/ihr-neues-logo.jpg"
   ```
3. Empfohlene Logo-Größe: max. 512×512px für optimale Performance

### Animation anpassen
Die Animationsparameter können in `src/intro.ts` angepasst werden:

```typescript
// Animationsdauer ändern (Standardwert: 1200ms)
duration: 1200

// Easing-Funktion ändern
easing: 'cubic-bezier(0.18,0.89,0.32,1.28)'

// Cooldown-Zeit ändern (Standardwert: 24 Stunden)
const INTRO_TTL_MS = 24 * 60 * 60 * 1000;
```

### Intro komplett deaktivieren
Um das Intro dauerhaft zu deaktivieren, entfernen Sie folgende Zeile aus `src/main.tsx`:
```typescript
import './intro';
```

### Intro manuell zurücksetzen
Um das Intro erneut anzuzeigen (z.B. zum Testen), öffnen Sie die Browser-Konsole und führen Sie aus:
```javascript
localStorage.removeItem('videoIntroSeen');  // Video-Intro zurücksetzen
localStorage.removeItem('introSeen');       // Logo-Intro zurücksetzen
```
Dann laden Sie die Seite neu.

### Video-Intro deaktivieren
Um nur das Video-Intro zu deaktivieren (Logo-Intro bleibt aktiv):
1. Öffnen Sie `index.html`
2. Entfernen Sie das `<video>`-Element und das `<script>`-Tag (Zeilen 10-70)
3. Das Logo-Intro läuft dann direkt beim ersten Besuch

## Support & Kontakt

Bei Fragen oder Problemen:
- 📧 E-Mail: info@malerbetriebbauer.com
- 📞 Telefon: +49 9242 96190

## Lizenz

© 2025 Malerbetrieb Bauer. Alle Rechte vorbehalten.
