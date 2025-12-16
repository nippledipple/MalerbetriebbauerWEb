import React from 'react';
import { Paintbrush, Shield, Users, Award, Phone } from 'lucide-react';
import { EditableText } from '../components/EditableText';
import { BeforeAfterSlider } from '../components/BeforeAfterSlider';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const scrollToContact = () => {
    onNavigate('contact');
  };

  const services = [
    {
      icon: Paintbrush,
      title: 'Malerarbeiten',
      description: 'Professionelle Innen- und Außenanstriche mit hochwertigen Materialien',
    },
    {
      icon: Shield,
      title: 'Fassadengestaltung',
      description: 'Moderne Fassadengestaltung und -sanierung für langanhaltenden Schutz',
    },
    {
      icon: Users,
      title: 'Renovierung',
      description: 'Komplette Renovierungsarbeiten für Ihr Zuhause oder Gewerbe',
    },
    {
      icon: Award,
      title: 'Qualität',
      description: 'Malerbetrieb mit über 20 Jahren Erfahrung',
    },
  ];

  const values = [
    { title: 'Präzision', description: 'Sorgfältige und detailgenaue Ausführung' },
    { title: 'Zuverlässigkeit', description: 'Termintreue und verlässliche Absprachen' },
    { title: 'Beratung', description: 'Persönliche und kompetente Fachberatung' },
    { title: 'Innovation', description: 'Moderne Techniken und Materialien' },
  ];

  return (
    <div>
      <section className="relative bg-gradient-to-br from-[#ffd900] via-[#fffe34] to-[#ca9922] text-white py-24 md:py-32 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="max-w-3xl">
              <EditableText
                page="home"
                section="hero_title"
                defaultContent="Wir bringen Farbe in Ihr Leben"
                as="h1"
                className="text-4xl md:text-6xl font-bold mb-6 text-[#585858]"
              />
              <EditableText
                page="home"
                section="hero_subtitle"
                defaultContent="Ihr Malerfachbetrieb in Schönwald"
                as="p"
                className="text-xl md:text-2xl mb-8 text-[#585858]/90"
              />
              <button
                onClick={scrollToContact}
                className="bg-[#585858] text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#404040] transition-colors inline-flex items-center space-x-2"
              >
                <Phone size={24} />
                <span>Jetzt kontaktieren</span>
              </button>
            </div>
            <div className="hidden lg:flex justify-end items-center">
              <div className="relative w-[500px] h-[400px] flex items-center justify-center">
                <img
                  src="/e48083a5-33c2-4e82-9bfb-10683f40-removebg-preview.png"
                  alt="Malerbetrieb Bauer Logo"
                  className="w-4/5 h-auto object-contain"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <EditableText
              page="home"
              section="welcome_title"
              defaultContent="Willkommen bei Malerbetrieb Bauer"
              as="h2"
              className="text-3xl md:text-4xl font-bold text-[#585858] mb-6 text-center"
            />
            <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
              <EditableText
                page="home"
                section="welcome_paragraph1"
                defaultContent="Seit 2004 ist der Malerbetrieb Bauer Ihr kompetenter Partner für hochwertige Malerarbeiten in Schönwald und Umgebung. Was als kleiner Handwerksbetrieb begann, hat sich zu einem etablierten Betrieb mit einem Team erfahrener Fachkräfte entwickelt."
                as="p"
                multiline
              />
              <EditableText
                page="home"
                section="welcome_paragraph2"
                defaultContent="Unser Erfolgsrezept liegt in der perfekten Kombination aus traditionellem Handwerk und modernen Techniken. Wir legen größten Wert auf Qualität, Zuverlässigkeit und persönlichen Service – von der ersten Beratung bis zur finalen Abnahme."
                as="p"
                multiline
              />
              <EditableText
                page="home"
                section="welcome_paragraph3"
                defaultContent="Ob Neubau, Renovierung oder Sanierung – wir realisieren Ihre Vorstellungen mit Präzision und Leidenschaft. Vertrauen Sie auf unsere Expertise und lassen Sie sich von unseren Referenzen überzeugen."
                as="p"
                multiline
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <EditableText
            page="home"
            section="services_title"
            defaultContent="Unsere Leistungen"
            as="h2"
            className="text-3xl md:text-4xl font-bold text-[#585858] mb-12 text-center"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow"
              >
                <div className="bg-[#ffd900] w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <service.icon className="text-[#585858]" size={32} />
                </div>
                <h3 className="text-xl font-bold text-[#585858] mb-3">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <button
              onClick={() => onNavigate('services')}
              className="bg-[#ffd900] text-[#585858] px-8 py-3 rounded-lg font-bold hover:bg-[#e6c200] transition-colors"
            >
              Alle Leistungen ansehen
            </button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-[#585858] mb-12 text-center">
            Vorher & Nachher
          </h2>
          <div className="max-w-4xl mx-auto mb-6">
            <BeforeAfterSlider
              beforeImage="/WhatsApp Image 2025-11-09 at 21.11.09 (1).jpeg"
              afterImage="/WhatsApp Image 2025-11-09 at 21.11.23 (1).jpeg"
              beforeAlt="Dach vor der Reinigung"
              afterAlt="Dach nach der Reinigung"
            />
          </div>
          <p className="text-center text-gray-600 max-w-2xl mx-auto">
            Professionelle Dachreinigung - Schieben Sie den Regler, um den Unterschied zu sehen
          </p>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-[#585858] mb-12 text-center">
            Unsere Werte
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="bg-[#ffd900] w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl font-bold text-[#585858]">{index + 1}</span>
                </div>
                <h3 className="text-xl font-bold text-[#585858] mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#585858] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Bereit für Ihr nächstes Projekt?
          </h2>
          <p className="text-xl mb-8 text-gray-300">
            Kontaktieren Sie uns für ein unverbindliches Beratungsgespräch
          </p>
          <button
            onClick={scrollToContact}
            className="bg-[#ffd900] text-[#585858] px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#e6c200] transition-colors inline-flex items-center space-x-2"
          >
            <Phone size={24} />
            <span>Kontakt aufnehmen</span>
          </button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
