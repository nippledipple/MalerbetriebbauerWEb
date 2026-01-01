import React, { useEffect, useState } from 'react';
import { Paintbrush, Shield, Users, Award, Phone, Sparkles } from 'lucide-react';
import { EditableText } from '../components/EditableText';
import { BeforeAfterSlider } from '../components/BeforeAfterSlider';
import PartnerSlider from '../components/PartnerSlider';
import NewYearFireworks from '../components/NewYearFireworks';
import NewYearConfetti from '../components/NewYearConfetti';
import { supabase } from '../lib/supabase';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

interface Partner {
  id: string;
  name: string;
  logo_url: string;
  website_url?: string;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const [partners, setPartners] = useState<Partner[]>([]);

  useEffect(() => {
    loadPartners();
  }, []);

  const loadPartners = async () => {
    try {
      const { data, error } = await supabase
        .from('partners')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true })
        .order('created_at', { ascending: true });

      if (error) throw error;
      setPartners(data || []);
    } catch (error) {
      console.error('Error loading partners:', error);
    }
  };

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
    <div className="relative z-10">
      <NewYearFireworks />
      <NewYearConfetti />

      <section className="relative bg-gradient-to-br from-[#0a0e27] via-[#1a1f3a] to-[#0a0e27] text-white py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9IiNmZmQ3MDAiIG9wYWNpdHk9IjAuMSIvPjwvc3ZnPg==')] opacity-30"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-[#ffd700]/20 to-[#f0c419]/20 backdrop-blur-sm px-6 py-3 rounded-full border-2 border-[#ffd700] mb-8">
              <Sparkles className="text-[#ffd700] animate-pulse" size={24} />
              <span className="text-2xl md:text-3xl font-bold text-[#ffd700] new-year-text">
                Frohes Neues Jahr 2026!
              </span>
              <Sparkles className="text-[#ffd700] animate-pulse" size={24} />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="max-w-3xl">
              <EditableText
                page="home"
                section="hero_title"
                defaultContent="Wir bringen Farbe in Ihr Leben"
                as="h1"
                className="text-4xl md:text-6xl font-bold mb-6 text-[#ffd700] new-year-text"
              />
              <EditableText
                page="home"
                section="hero_subtitle"
                defaultContent="Ihr Malerfachbetrieb in Schönwald - Starten Sie 2026 mit neuen Farben!"
                as="p"
                className="text-xl md:text-2xl mb-8 text-white/90"
              />
              <button
                onClick={scrollToContact}
                className="festive-gradient text-[#1a1f3a] px-8 py-4 rounded-lg font-bold text-lg hover:scale-105 transition-transform inline-flex items-center space-x-2 shadow-lg shadow-[#ffd700]/50"
              >
                <Phone size={24} />
                <span>Jetzt kontaktieren</span>
              </button>
            </div>
            <div className="hidden lg:flex justify-end items-center">
              <div className="relative w-[500px] h-[400px] flex items-center justify-center">
                <div className="absolute inset-0 bg-[#ffd700]/10 rounded-full blur-3xl"></div>
                <img
                  src="/e48083a5-33c2-4e82-9bfb-10683f40cf8d-removebg-preview.png"
                  alt="Malerbetrieb Bauer Logo"
                  className="w-4/5 h-auto object-contain relative z-10 drop-shadow-[0_0_30px_rgba(255,215,0,0.7)]"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white/5 to-transparent"></div>
      </section>

      <section className="py-16 bg-gradient-to-b from-white/5 to-[#1a1f3a]/30 backdrop-blur-sm relative z-10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <EditableText
              page="home"
              section="welcome_title"
              defaultContent="Willkommen bei Malerbetrieb Bauer"
              as="h2"
              className="text-3xl md:text-4xl font-bold text-[#ffd700] mb-6 text-center"
            />
            <div className="prose prose-lg max-w-none text-white space-y-4">
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

      <section className="py-16 bg-gradient-to-b from-[#1a1f3a]/30 to-[#0a0e27]/50 relative z-10">
        <div className="container mx-auto px-4">
          <EditableText
            page="home"
            section="services_title"
            defaultContent="Unsere Leistungen"
            as="h2"
            className="text-3xl md:text-4xl font-bold text-[#ffd700] mb-12 text-center"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-[#1a1f3a] to-[#0a0e27] p-6 rounded-lg border-2 border-[#ffd700]/30 hover:border-[#ffd700] transition-all hover:scale-105 shadow-lg"
              >
                <div className="festive-gradient w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <service.icon className="text-[#1a1f3a]" size={32} />
                </div>
                <h3 className="text-xl font-bold text-[#ffd700] mb-3">{service.title}</h3>
                <p className="text-white/80">{service.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <button
              onClick={() => onNavigate('services')}
              className="festive-gradient text-[#1a1f3a] px-8 py-3 rounded-lg font-bold hover:scale-105 transition-transform shadow-lg shadow-[#ffd700]/50"
            >
              Alle Leistungen ansehen
            </button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-b from-[#0a0e27]/50 to-[#1a1f3a]/30 relative z-10">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-[#ffd700] mb-12 text-center">
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
          <p className="text-center text-white/80 max-w-2xl mx-auto">
            Professionelle Dachreinigung - Schieben Sie den Regler, um den Unterschied zu sehen
          </p>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-b from-[#1a1f3a]/30 to-[#0a0e27]/50 relative z-10">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-[#ffd700] mb-12 text-center">
            Unsere Werte
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="festive-gradient w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-[#ffd700]/50">
                  <span className="text-3xl font-bold text-[#1a1f3a]">{index + 1}</span>
                </div>
                <h3 className="text-xl font-bold text-[#ffd700] mb-2">{value.title}</h3>
                <p className="text-white/80">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {partners.length > 0 && <PartnerSlider partners={partners} />}

      <section className="py-16 bg-gradient-to-b from-[#0a0e27]/50 to-[#1a1f3a] text-white relative z-10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#ffd700]">
            Starten Sie 2026 mit neuen Farben!
          </h2>
          <p className="text-xl mb-8 text-white/80">
            Kontaktieren Sie uns für ein unverbindliches Beratungsgespräch
          </p>
          <button
            onClick={scrollToContact}
            className="festive-gradient text-[#1a1f3a] px-8 py-4 rounded-lg font-bold text-lg hover:scale-105 transition-transform inline-flex items-center space-x-2 shadow-lg shadow-[#ffd700]/50"
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
