import React from 'react';

const DatenschutzPage: React.FC = () => {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-[#585858] mb-8">
            Datenschutzerklärung
          </h1>

          <div className="prose prose-lg max-w-none space-y-6">
            <section>
              <h2 className="text-2xl font-bold text-[#585858] mb-4">1. Datenschutz auf einen Blick</h2>

              <h3 className="text-xl font-bold text-[#585858] mb-3">Allgemeine Hinweise</h3>
              <p className="text-gray-700">
                Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren
                personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene
                Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
                Ausführliche Informationen zum Thema Datenschutz entnehmen Sie unserer unter diesem
                Text aufgeführten Datenschutzerklärung.
              </p>

              <h3 className="text-xl font-bold text-[#585858] mb-3 mt-6">Datenerfassung auf dieser Website</h3>
              <p className="text-gray-700">
                <strong>Wer ist verantwortlich für die Datenerfassung auf dieser Website?</strong>
                <br />
                Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen
                Kontaktdaten können Sie dem Impressum dieser Website entnehmen.
              </p>
              <p className="text-gray-700 mt-4">
                <strong>Wie erfassen wir Ihre Daten?</strong>
                <br />
                Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei
                kann es sich z. B. um Daten handeln, die Sie in ein Kontaktformular eingeben.
              </p>
              <p className="text-gray-700 mt-4">
                Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website
                durch unsere IT-Systeme erfasst. Das sind vor allem technische Daten (z. B.
                Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs). Die Erfassung
                dieser Daten erfolgt automatisch, sobald Sie diese Website betreten.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#585858] mb-4">2. Hosting und Content Delivery Networks (CDN)</h2>

              <p className="text-gray-700">
                Wir hosten die Inhalte unserer Website bei Supabase. Anbieter ist die Supabase, Inc.,
                USA. Details entnehmen Sie der Datenschutzerklärung von Supabase:{' '}
                <a
                  href="https://supabase.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#ffd900] hover:underline"
                >
                  https://supabase.com/privacy
                </a>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#585858] mb-4">3. Allgemeine Hinweise und Pflichtinformationen</h2>

              <h3 className="text-xl font-bold text-[#585858] mb-3">Datenschutz</h3>
              <p className="text-gray-700">
                Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst.
                Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der
                gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.
              </p>
              <p className="text-gray-700 mt-4">
                Wenn Sie diese Website benutzen, werden verschiedene personenbezogene Daten erhoben.
                Personenbezogene Daten sind Daten, mit denen Sie persönlich identifiziert werden
                können. Die vorliegende Datenschutzerklärung erläutert, welche Daten wir erheben und
                wofür wir sie nutzen. Sie erläutert auch, wie und zu welchem Zweck das geschieht.
              </p>

              <h3 className="text-xl font-bold text-[#585858] mb-3 mt-6">Hinweis zur verantwortlichen Stelle</h3>
              <p className="text-gray-700">
                Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:
              </p>
              <p className="text-gray-700 mt-2">
                Malerbetrieb Bauer
                <br />
                Inh. Ralf Wolfermann
                <br />
                Neue Str. 19
                <br />
                95173 Schönwald
                <br />
                <br />
                Telefon: +49 171 8852058
                <br />
                E-Mail: malerbauer1468@gmx.de
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#585858] mb-4">4. Datenerfassung auf dieser Website</h2>

              <h3 className="text-xl font-bold text-[#585858] mb-3">Cookies</h3>
              <p className="text-gray-700">
                Unsere Internetseiten verwenden so genannte „Cookies". Cookies sind kleine
                Textdateien und richten auf Ihrem Endgerät keinen Schaden an. Sie werden entweder
                vorübergehend für die Dauer einer Sitzung (Session-Cookies) oder dauerhaft (permanente
                Cookies) auf Ihrem Endgerät gespeichert. Session-Cookies werden nach Ende Ihres
                Besuchs automatisch gelöscht. Permanente Cookies bleiben auf Ihrem Endgerät
                gespeichert, bis Sie diese selbst löschen oder eine automatische Löschung durch Ihren
                Webbrowser erfolgt.
              </p>
              <p className="text-gray-700 mt-4">
                Wir verwenden Cookies ausschließlich nach Ihrer ausdrücklichen Einwilligung über unser
                Cookie-Banner. Sie können Ihre Einwilligung jederzeit widerrufen.
              </p>

              <h3 className="text-xl font-bold text-[#585858] mb-3 mt-6">Kontaktformular</h3>
              <p className="text-gray-700">
                Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem
                Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks
                Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert.
                Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
              </p>
              <p className="text-gray-700 mt-4">
                Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO,
                sofern Ihre Anfrage mit der Erfüllung eines Vertrags zusammenhängt oder zur
                Durchführung vorvertraglicher Maßnahmen erforderlich ist. In allen übrigen Fällen
                beruht die Verarbeitung auf unserem berechtigten Interesse an der effektiven
                Bearbeitung der an uns gerichteten Anfragen (Art. 6 Abs. 1 lit. f DSGVO) oder auf
                Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO) sofern diese abgefragt wurde.
              </p>
              <p className="text-gray-700 mt-4">
                Die von Ihnen im Kontaktformular eingegebenen Daten verbleiben bei uns, bis Sie uns
                zur Löschung auffordern, Ihre Einwilligung zur Speicherung widerrufen oder der Zweck
                für die Datenspeicherung entfällt (z. B. nach abgeschlossener Bearbeitung Ihrer
                Anfrage). Zwingende gesetzliche Bestimmungen – insbesondere Aufbewahrungsfristen –
                bleiben unberührt.
              </p>

              <h3 className="text-xl font-bold text-[#585858] mb-3 mt-6">Anfrage per E-Mail, Telefon oder Telefax</h3>
              <p className="text-gray-700">
                Wenn Sie uns per E-Mail, Telefon oder Telefax kontaktieren, wird Ihre Anfrage
                inklusive aller daraus hervorgehenden personenbezogenen Daten (Name, Anfrage) zum
                Zwecke der Bearbeitung Ihres Anliegens bei uns gespeichert und verarbeitet. Diese
                Daten geben wir nicht ohne Ihre Einwilligung weiter.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#585858] mb-4">5. Analyse-Tools und Werbung</h2>

              <h3 className="text-xl font-bold text-[#585858] mb-3">Besucher-Tracking</h3>
              <p className="text-gray-700">
                Diese Website nutzt ein eigenes, DSGVO-konformes Tracking-System zur Analyse des
                Nutzerverhaltens. Die Daten werden ausschließlich anonymisiert erfasst und auf unseren
                eigenen Servern gespeichert. IP-Adressen werden gehashed und nicht im Klartext
                gespeichert. Eine Zuordnung zu Ihrer Person ist nicht möglich.
              </p>
              <p className="text-gray-700 mt-4">
                Die Erfassung erfolgt nur nach Ihrer ausdrücklichen Einwilligung über das
                Cookie-Banner (Art. 6 Abs. 1 lit. a DSGVO). Sie können Ihre Einwilligung jederzeit
                widerrufen.
              </p>
              <p className="text-gray-700 mt-4">
                <strong>Gespeicherte Daten:</strong>
              </p>
              <ul className="list-disc pl-6 text-gray-700 mt-2">
                <li>Besuchte Seiten (URLs)</li>
                <li>Referrer (Herkunftsseite)</li>
                <li>Browser-Informationen (User-Agent)</li>
                <li>Zeitstempel des Besuchs</li>
                <li>Anonyme Session-ID</li>
                <li>Gehashte IP-Adresse</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#585858] mb-4">6. Plugins und Tools</h2>

              <h3 className="text-xl font-bold text-[#585858] mb-3">Google Maps</h3>
              <p className="text-gray-700">
                Diese Seite nutzt den Kartendienst Google Maps. Anbieter ist die Google Ireland
                Limited („Google"), Gordon House, Barrow Street, Dublin 4, Irland.
              </p>
              <p className="text-gray-700 mt-4">
                Die Nutzung von Google Maps erfolgt nur nach Ihrer ausdrücklichen Einwilligung über
                das Cookie-Banner. Zur Nutzung der Funktionen von Google Maps ist es notwendig, Ihre
                IP-Adresse zu speichern. Diese Informationen werden in der Regel an einen Server von
                Google in den USA übertragen und dort gespeichert.
              </p>
              <p className="text-gray-700 mt-4">
                Mehr Informationen zum Umgang mit Nutzerdaten finden Sie in der Datenschutzerklärung
                von Google:{' '}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#ffd900] hover:underline"
                >
                  https://policies.google.com/privacy
                </a>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#585858] mb-4">7. Ihre Rechte</h2>

              <p className="text-gray-700">
                Sie haben jederzeit das Recht:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mt-2">
                <li>Auskunft über Ihre bei uns gespeicherten Daten zu erhalten (Art. 15 DSGVO)</li>
                <li>Die Berichtigung unrichtiger Daten zu verlangen (Art. 16 DSGVO)</li>
                <li>Die Löschung Ihrer Daten zu verlangen (Art. 17 DSGVO)</li>
                <li>Die Einschränkung der Verarbeitung zu verlangen (Art. 18 DSGVO)</li>
                <li>Der Verarbeitung Ihrer Daten zu widersprechen (Art. 21 DSGVO)</li>
                <li>Ihre Daten in einem strukturierten Format zu erhalten (Art. 20 DSGVO)</li>
                <li>Eine erteilte Einwilligung jederzeit zu widerrufen (Art. 7 Abs. 3 DSGVO)</li>
                <li>
                  Sich bei einer Aufsichtsbehörde zu beschweren (Art. 77 DSGVO)
                </li>
              </ul>
              <p className="text-gray-700 mt-4">
                Wenden Sie sich hierzu bitte an die im Impressum angegebenen Kontaktdaten.
              </p>
            </section>

            <section className="bg-[#ffd900]/10 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-[#585858] mb-4">Kontakt für Datenschutzanfragen</h2>
              <p className="text-gray-700">
                Für Fragen zum Datenschutz und zur Ausübung Ihrer Rechte kontaktieren Sie uns bitte
                unter:
              </p>
              <p className="text-gray-700 mt-2">
                E-Mail:{' '}
                <a
                  href="mailto:malerbauer1468@gmx.de"
                  className="text-[#ffd900] hover:underline"
                >
                  malerbauer1468@gmx.de
                </a>
                <br />
                Telefon: +49 171 8852058
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatenschutzPage;
