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
      image: '/image.png',
    },
  ];

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <EditableText
            page="services"
            section="title"
            defaultContent="Unsere Leistungen"
            as="h1"
            className="text-4xl md:text-5xl font-bold text-[#585858] mb-8 text-center"
          />

          <div className="bg-gradient-to-br from-[#ffd900] to-[#ca9922] rounded-lg p-8 mb-12 text-[#585858]">
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
                className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-[#ffd900] transition-all hover:shadow-xl"
              >
                <div className="flex items-start space-x-4 mb-4">
                  <div className="bg-[#ffd900] w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0">
                    <service.icon className="text-[#585858]" size={32} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-[#585858] mb-2">{service.title}</h2>
                    <p className="text-gray-600">{service.description}</p>
                  </div>
                </div>
                <div className="ml-20">
                  <ul className="space-y-2">
                    {service.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <span className="text-[#ffd900] font-bold mt-1">•</span>
                        <span className="text-gray-700">{detail}</span>
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

          <div className="bg-gray-50 rounded-lg p-8 mb-12">
            <h2 className="text-3xl font-bold text-[#585858] mb-6 text-center">
              Unser Arbeitsprozess
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="bg-[#ffd900] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-[#585858]">1</span>
                </div>
                <h3 className="font-bold text-[#585858] mb-2">Beratung</h3>
                <p className="text-sm text-gray-600">
                  Kostenlose Vor-Ort-Beratung und Bedarfsanalyse
                </p>
              </div>
              <div className="text-center">
                <div className="bg-[#ffd900] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-[#585858]">2</span>
                </div>
                <h3 className="font-bold text-[#585858] mb-2">Angebot</h3>
                <p className="text-sm text-gray-600">
                  Detailliertes und transparentes Kostenangebot
                </p>
              </div>
              <div className="text-center">
                <div className="bg-[#ffd900] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-[#585858]">3</span>
                </div>
                <h3 className="font-bold text-[#585858] mb-2">Ausführung</h3>
                <p className="text-sm text-gray-600">
                  Professionelle Umsetzung durch unser Fachteam
                </p>
              </div>
              <div className="text-center">
                <div className="bg-[#ffd900] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-[#585858]">4</span>
                </div>
                <h3 className="font-bold text-[#585858] mb-2">Abnahme</h3>
                <p className="text-sm text-gray-600">
                  Gemeinsame Endabnahme und Übergabe
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[#585858] text-white rounded-lg p-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Interesse an unseren Leistungen?
            </h2>
            <p className="text-lg text-gray-300 mb-6">
              Kontaktieren Sie uns für ein unverbindliches Angebot. Wir beraten Sie gerne!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+491718852058"
                className="bg-[#ffd900] text-[#585858] px-8 py-3 rounded-lg font-bold hover:bg-[#e6c200] transition-colors"
              >
                +49 171 8852058
              </a>
              <a
                href="mailto:malerbauer1468@gmx.de"
                className="bg-white text-[#585858] px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors"
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
