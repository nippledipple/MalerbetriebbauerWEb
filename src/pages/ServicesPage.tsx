import React from 'react';
import { Paintbrush, Home, Building, Brush, Droplet, Shield } from 'lucide-react';
import { EditableText } from '../components/EditableText';

const ServicesPage: React.FC = () => {
  const services = [
    {
      icon: Paintbrush,
      title: 'Innenanstriche',
      description:
        'Professionelle Wandgestaltung für Wohn- und Geschäftsräume mit hochwertigen Farben und modernen Techniken.',
      details: [
        'Dispersions- und Latexfarben',
        'Strukturputze und Spachteltechniken',
        'Tapezierarbeiten aller Art',
        'Farbberatung und Musterstellung',
      ],
    },
    {
      icon: Building,
      title: 'Fassadenanstriche',
      description:
        'Langlebiger Schutz und ansprechende Optik für Ihre Fassade durch fachgerechte Ausführung.',
      details: [
        'Fassadenreinigung und Vorbereitung',
        'Rissesanierung und Spachtelarbeiten',
        'Wärmedämmverbundsysteme',
        'Witterungsbeständige Beschichtungen',
      ],
    },
    {
      icon: Home,
      title: 'Renovierungen',
      description:
        'Komplette Renovierung von Räumen und Gebäuden – vom Altbau bis zum modernen Wohnraum.',
      details: [
        'Komplette Wohnungsrenovierungen',
        'Treppenhaus-Sanierungen',
        'Altbau-Restaurierungen',
        'Modernisierung von Geschäftsräumen',
      ],
    },
    {
      icon: Brush,
      title: 'Lackierarbeiten',
      description:
        'Hochwertige Lackierungen für Türen, Fenster, Heizkörper und andere Oberflächen.',
      details: [
        'Holzlackierungen und -lasuren',
        'Metalllackierungen',
        'Heizkörperlackierungen',
        'Möbellackierungen',
      ],
    },
    {
      icon: Droplet,
      title: 'Spezialanstriche',
      description:
        'Funktionale Beschichtungen für besondere Anforderungen und Einsatzbereiche.',
      details: [
        'Feuchtraumgestaltung',
        'Schimmelschutzanstriche',
        'Brandschutzanstriche',
        'Industriebeschichtungen',
      ],
    },
    {
      icon: Shield,
      title: 'Fassadenschutz',
      description:
        'Professionelle Schutzmaßnahmen für Ihre Fassade gegen Witterung und Verschmutzung.',
      details: [
        'Hydrophobierung',
        'Algizide Anstriche',
        'Imprägnierungen',
        'Langzeitschutz-Systeme',
      ],
    },
  ];

  return (
    <div className="py-16 relative z-10">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <EditableText
            page="services"
            section="title"
            defaultContent="Unsere Leistungen"
            as="h1"
            className="text-4xl md:text-5xl font-bold text-[#ffd700] mb-8 text-center"
          />

          <div className="festive-gradient rounded-lg p-8 mb-12 text-[#1a1f3a] border-2 border-[#ffd700] shadow-lg shadow-[#ffd700]/50">
            <EditableText
              page="services"
              section="tagline"
              defaultContent="Von der ersten Beratung bis zur finalen Abnahme – Wir bieten Ihnen das komplette Leistungsspektrum eines modernen Malerbetriebs"
              as="p"
              className="text-xl md:text-2xl font-semibold text-center"
              multiline
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-[#1a1f3a] to-[#0a0e27] border-2 border-[#ffd700]/30 rounded-lg p-6 hover:border-[#ffd700] transition-all hover:shadow-xl hover:scale-105"
              >
                <div className="flex items-start space-x-4 mb-4">
                  <div className="festive-gradient w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg shadow-[#ffd700]/50">
                    <service.icon className="text-[#1a1f3a]" size={32} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-[#ffd700] mb-2">{service.title}</h2>
                    <p className="text-white/80">{service.description}</p>
                  </div>
                </div>
                <div className="ml-20">
                  <ul className="space-y-2">
                    {service.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <span className="text-[#ffd700] font-bold mt-1">•</span>
                        <span className="text-white/70">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                {service.image && (
                  <div className="mt-6">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-b from-[#1a1f3a]/30 to-[#0a0e27]/50 rounded-lg p-8 mb-12 border-2 border-[#ffd700]/30">
            <h2 className="text-3xl font-bold text-[#ffd700] mb-6 text-center">
              Unser Arbeitsprozess
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="festive-gradient w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-[#ffd700]/50">
                  <span className="text-2xl font-bold text-[#1a1f3a]">1</span>
                </div>
                <h3 className="font-bold text-[#ffd700] mb-2">Beratung</h3>
                <p className="text-sm text-white/70">
                  Kostenlose Vor-Ort-Beratung und Bedarfsanalyse
                </p>
              </div>
              <div className="text-center">
                <div className="festive-gradient w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-[#ffd700]/50">
                  <span className="text-2xl font-bold text-[#1a1f3a]">2</span>
                </div>
                <h3 className="font-bold text-[#ffd700] mb-2">Angebot</h3>
                <p className="text-sm text-white/70">
                  Detailliertes und transparentes Kostenangebot
                </p>
              </div>
              <div className="text-center">
                <div className="festive-gradient w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-[#ffd700]/50">
                  <span className="text-2xl font-bold text-[#1a1f3a]">3</span>
                </div>
                <h3 className="font-bold text-[#ffd700] mb-2">Ausführung</h3>
                <p className="text-sm text-white/70">
                  Professionelle Umsetzung durch unser Fachteam
                </p>
              </div>
              <div className="text-center">
                <div className="festive-gradient w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-[#ffd700]/50">
                  <span className="text-2xl font-bold text-[#1a1f3a]">4</span>
                </div>
                <h3 className="font-bold text-[#ffd700] mb-2">Abnahme</h3>
                <p className="text-sm text-white/70">
                  Gemeinsame Endabnahme und Übergabe
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-b from-[#0a0e27]/50 to-[#1a1f3a] text-white rounded-lg p-8 text-center border-2 border-[#ffd700] shadow-lg shadow-[#ffd700]/50">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[#ffd700]">
              Interesse an unseren Leistungen?
            </h2>
            <p className="text-lg text-white/80 mb-6">
              Kontaktieren Sie uns für ein unverbindliches Angebot. Wir beraten Sie gerne!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+491718852058"
                className="festive-gradient text-[#1a1f3a] px-8 py-3 rounded-lg font-bold hover:scale-105 transition-transform shadow-lg shadow-[#ffd700]/50"
              >
                +49 171 8852058
              </a>
              <a
                href="mailto:malerbauer1468@gmx.de"
                className="bg-white text-[#1a1f3a] px-8 py-3 rounded-lg font-bold hover:scale-105 transition-transform"
              >
                E-Mail senden
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
