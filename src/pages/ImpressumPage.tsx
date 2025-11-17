import React from 'react';
import { EditableText } from '../components/EditableText';

const ImpressumPage: React.FC = () => {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-[#585858] mb-8">Impressum</h1>

          <div className="prose prose-lg max-w-none space-y-6">
            <section>
              <h2 className="text-2xl font-bold text-[#585858] mb-4">
                Angaben gemäß § 5 TMG
              </h2>
              <p className="text-gray-700">
                <strong>Malerbetrieb Bauer</strong>
                <br />
                Rechtsform: Einzelunternehmen
                <br />
                Inh. Ralf Wolfermann
                <br />
                Neue Str. 19
                <br />
                95173 Schönwald
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#585858] mb-4">Kontakt</h2>
              <p className="text-gray-700">
                Telefon:{' '}
                <EditableText
                  page="impressum"
                  section="phone"
                  defaultContent="+49 171 8852058"
                  as="span"
                />
                <br />
                E-Mail:{' '}
                <a
                  href="mailto:malerbauer1468@gmx.de"
                  className="text-[#ffd900] hover:underline"
                >
                  malerbauer1468@gmx.de
                </a>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#585858] mb-4">Umsatzsteuer-ID</h2>
              <p className="text-gray-700">
                Gemäß § 19 UStG wird keine Umsatzsteuer berechnet.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#585858] mb-4">
                Berufsbezeichnung und berufsrechtliche Regelungen
              </h2>
              <p className="text-gray-700">
                Berufsbezeichnung: Maler und Lackierer (Deutschland)
                <br />
                Zuständige Kammer: Handwerkskammer für Oberfranken
                <br />
                Kerschensteinerstraße 6, 95448 Bayreuth
                <br />
                <a
                  href="https://www.hwk-oberfranken.de"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#ffd900] hover:underline"
                >
                  www.hwk-oberfranken.de
                </a>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#585858] mb-4">Aufsichtsbehörde</h2>
              <p className="text-gray-700">
                Handwerkskammer für Oberfranken
                <br />
                Kerschensteinerstraße 6
                <br />
                95448 Bayreuth
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#585858] mb-4">
                Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV
              </h2>
              <p className="text-gray-700">
                Ralf Wolfermann
                <br />
                Neue Str. 19
                <br />
                95173 Schönwald
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#585858] mb-4">
                Haftung für Inhalte
              </h2>
              <p className="text-gray-700">
                Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen
                Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind
                wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder
                gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen,
                die auf eine rechtswidrige Tätigkeit hinweisen.
              </p>
              <p className="text-gray-700 mt-4">
                Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach
                den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung
                ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung
                möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese
                Inhalte umgehend entfernen.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#585858] mb-4">Haftung für Links</h2>
              <p className="text-gray-700">
                Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir
                keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine
                Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige
                Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden
                zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft.
                Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar.
              </p>
              <p className="text-gray-700 mt-4">
                Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne
                konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden
                von Rechtsverletzungen werden wir derartige Links umgehend entfernen.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#585858] mb-4">Urheberrecht</h2>
              <p className="text-gray-700">
                Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten
                unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung,
                Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes
                bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
                Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen
                Gebrauch gestattet.
              </p>
              <p className="text-gray-700 mt-4">
                Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden
                die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als
                solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung
                aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden
                von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
              </p>
            </section>

            <section className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-[#585858] mb-4">Streitschlichtung</h2>
              <p className="text-gray-700">
                Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung
                (OS) bereit:{' '}
                <a
                  href="https://ec.europa.eu/consumers/odr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#ffd900] hover:underline"
                >
                  https://ec.europa.eu/consumers/odr/
                </a>
                <br />
                Unsere E-Mail-Adresse finden Sie oben im Impressum.
              </p>
              <p className="text-gray-700 mt-4">
                Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
                Verbraucherschlichtungsstelle teilzunehmen.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImpressumPage;
