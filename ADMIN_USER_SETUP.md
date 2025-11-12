# Admin-Benutzer einrichten - Schnellanleitung

## 🚨 Wichtig: Admin-Benutzer muss noch angelegt werden!

Die Datenbank ist jetzt korrekt eingerichtet, aber der Admin-Benutzer fehlt noch. Folgen Sie diesen Schritten:

## Schritt-für-Schritt Anleitung

### 1. Supabase Dashboard öffnen

Öffnen Sie: https://supabase.com/dashboard

### 2. Zu Authentication navigieren

1. Wählen Sie Ihr Projekt aus der Liste
2. Klicken Sie im **linken Menü** auf **Authentication**
3. Klicken Sie auf **Users**

### 3. Neuen Benutzer erstellen

1. Klicken Sie oben rechts auf den grünen Button **"Add User"**
2. Wählen Sie **"Create new user"** (nicht "Invite")
3. Füllen Sie das Formular aus:

   ```
   Email: admin@malerbetriebbauer.com
   Password: admin123
   ```

4. **WICHTIG:** Aktivieren Sie die Checkbox **"Auto Confirm User"**
   - Diese Option ist KRITISCH!
   - Ohne diese Option kann sich der Benutzer nicht anmelden
   - Sie sollte standardmäßig ausgegraut und aktiviert sein

5. Klicken Sie auf **"Create User"**

### 4. Überprüfung

Nach dem Erstellen sollten Sie:

✅ Den neuen Benutzer in der Liste sehen
✅ **Email Confirmed** sollte mit einem grünen Häkchen markiert sein
✅ Der Status sollte "Active" sein

### 5. Login testen

1. Gehen Sie zurück zur Website (http://localhost:5173)
2. Klicken Sie oben rechts auf **"Login"**
3. Geben Sie ein:
   - **E-Mail:** admin@malerbetriebbauer.com
   - **Passwort:** admin123
4. Klicken Sie auf **"Anmelden"**

✅ Sie sollten jetzt eingeloggt sein und das Admin-Dashboard sehen!

## Alternative: Screenshot-Anleitung

Falls Sie visuelle Hilfe benötigen:

1. **Authentication Tab öffnen:**
   - Links in der Sidebar → "Authentication" Symbol (Schlüssel-Icon)

2. **Users Untermenü:**
   - Unter "Authentication" → "Users" klicken

3. **Add User Button:**
   - Grüner Button oben rechts: "+ Add User"

4. **Formular ausfüllen:**
   - Reiter: "Create new user" (sollte vorausgewählt sein)
   - Email-Feld: admin@malerbetriebbauer.com
   - Password-Feld: admin123
   - Checkbox: "Auto Confirm User" ✓ MUSS aktiviert sein!

5. **Erstellen:**
   - Button "Create User" klicken

## Troubleshooting

### Problem: "Auto Confirm User" Option nicht sichtbar

**Lösung:**
- Diese Option sollte automatisch aktiviert sein
- Falls nicht sichtbar: Überprüfen Sie, ob Sie in der richtigen Projekt-Ansicht sind
- Stellen Sie sicher, dass Sie "Create new user" und nicht "Invite user" ausgewählt haben

### Problem: Benutzer erstellt, aber "Email Confirmed" ist rot/nicht bestätigt

**Lösung:**
1. Klicken Sie auf den Benutzer in der Liste
2. Suchen Sie die Option "Confirm email" oder "Send confirmation email"
3. Oder löschen Sie den Benutzer und erstellen Sie ihn erneut mit "Auto Confirm User" aktiviert

### Problem: Login funktioniert immer noch nicht

**Lösung:**
1. Überprüfen Sie, ob der Benutzer wirklich in der Auth-Users-Liste existiert
2. Überprüfen Sie die Browser-Konsole auf Fehlermeldungen (F12)
3. Stellen Sie sicher, dass die .env Datei die korrekten Supabase-URLs enthält
4. Versuchen Sie, die Seite im Inkognito-Modus zu öffnen (Cache-Problem)

## Nach erfolgreichem Login

⚠️ **WICHTIG:** Ändern Sie das Passwort sofort!

1. Gehen Sie im Supabase Dashboard zu Ihrem Benutzer
2. Klicken Sie auf den Benutzer
3. Wählen Sie "Reset Password" oder ändern Sie es über die Website-Funktion

## Kontakt bei Problemen

Falls Sie weiterhin Probleme haben:
- Überprüfen Sie die Browser-Konsole (F12 → Console)
- Überprüfen Sie die Network-Tab auf Fehler
- Stellen Sie sicher, dass Supabase erreichbar ist

---

**Nach dem Erstellen des Benutzers sollte der Login funktionieren!** 🎉
