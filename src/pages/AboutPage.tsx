import React from 'react';
import { Users, Award, Target, Heart } from 'lucide-react';
import { EditableText } from '../components/EditableText';

const AboutPage: React.FC = () => {
  const team = [
    {
      name: 'Ralf Wolfermann',
      role: 'Gründer & Maler',
      description:
        'Mit über 30 Jahren Erfahrung im Malerhandwerk leitet Ralf den Betrieb mit Leidenschaft und Expertise.',
    },
    {
      name: 'Unser Team',
      role: 'Qualifizierte Fachkräfte',
      description:
        'Ein eingespieltes Team aus Gesellen und Malern sorgt für erstklassige Ergebnisse bei jedem Projekt.',
    },
  ];

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <EditableText
            page="about"
            section="title"
            defaultContent="Über uns"
            as="h1"
            className="text-4xl md:text-5xl font-bold text-[#585858] mb-8 text-center"
          />

          <div className="bg-gradient-to-br from-[#ffd900] to-[#ca9922] rounded-lg p-8 mb-12 text-[#585858]">
            <EditableText
              page="about"
              section="tagline"
              defaultContent="Tradition trifft Innovation – Seit 2004 Ihr verlässlicher Partner für Malerarbeiten in Schönwald"
              as="p"
              className="text-xl md:text-2xl font-semibold text-center"
              multiline
            />
          </div>

          <div className="prose prose-lg max-w-none text-gray-700 space-y-6 mb-16">
            <h2 className="text-3xl font-bold text-[#585858] flex items-center space-x-3">
              <Award className="text-[#ffd900]" size={36} />
              <span>Unsere Geschichte</span>
            </h2>
            <EditableText
              page="about"
              section="history_paragraph1"
              defaultContent="Im Jahr 2004 gründete Malermeister Ralf Wolfermann den Malerbetrieb Bauer mit einer klaren Vision: Hochwertige Handwerkskunst mit persönlichem Service zu verbinden. Was mit einem kleinen Team begann, hat sich über die Jahre zu einem anerkannten Meisterbetrieb entwickelt, der für Qualität und Zuverlässigkeit steht."
              as="p"
              multiline
            />
            <EditableText
              page="about"
              section="history_paragraph2"
              defaultContent="Heute sind wir stolz darauf, mit einem erfahrenen Team aus qualifizierten Malern und Gesellen arbeiten zu dürfen. Jedes Mitglied unseres Teams bringt seine individuellen Stärken ein und trägt dazu bei, dass wir auch die anspruchsvollsten Projekte erfolgreich realisieren können."
              as="p"
              multiline
            />

            <h2 className="text-3xl font-bold text-[#585858] flex items-center space-x-3 mt-12">
              <Target className="text-[#ffd900]" size={36} />
              <span>Unsere Mission</span>
            </h2>
            <EditableText
              page="about"
              section="mission_paragraph"
              defaultContent="Unser Ziel ist es, jedem Kunden nicht nur einen perfekt gestrichenen Raum oder eine renovierte Fassade zu übergeben, sondern ein Gesamterlebnis zu bieten, das von Anfang bis Ende überzeugt. Wir nehmen uns Zeit für Ihre Wünsche, beraten Sie kompetent und setzen Ihre Vorstellungen mit höchster Präzision um."
              as="p"
              multiline
            />

            <h2 className="text-3xl font-bold text-[#585858] flex items-center space-x-3 mt-12">
              <Heart className="text-[#ffd900]" size={36} />
              <span>Unsere Werte</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-bold text-[#585858] text-xl mb-2">Qualität</h3>
                <p>
                  Wir verwenden ausschließlich hochwertige Materialien und arbeiten nach den
                  neuesten Standards des Handwerks.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-bold text-[#585858] text-xl mb-2">Zuverlässigkeit</h3>
                <p>
                  Termintreue und saubere Ausführung sind für uns selbstverständlich. Wir
                  halten, was wir versprechen.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-bold text-[#585858] text-xl mb-2">Erfahrung</h3>
                <p>
                  Mit über 20 Jahren Erfahrung kennen wir die Herausforderungen jedes
                  Projekts und finden stets die beste Lösung.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-bold text-[#585858] text-xl mb-2">Sauberkeit</h3>
                <p>
                  Wir arbeiten ordentlich und hinterlassen Ihre Räume sauber und bereit zum
                  Einzug.
                </p>
              </div>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold text-[#585858] mb-8 flex items-center space-x-3">
              <Users className="text-[#ffd900]" size={36} />
              <span>Unser Team</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {team.map((member, index) => (
                <div
                  key={index}
                  className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-[#ffd900] transition-colors"
                >
                  <div className="bg-[#ffd900] w-20 h-20 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <Users className="text-[#585858]" size={40} />
                  </div>
                  <h3 className="text-xl font-bold text-[#585858] mb-2 text-center">
                    {member.name}
                  </h3>
                  <p className="text-[#ffd900] font-semibold mb-3 text-center">{member.role}</p>
                  <p className="text-gray-600 text-center">{member.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#585858] text-white rounded-lg p-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Werden Sie Teil unserer Erfolgsgeschichte
            </h2>
            <p className="text-lg text-gray-300 mb-6">
              Lassen Sie uns gemeinsam Ihr nächstes Projekt verwirklichen. Wir freuen uns
              darauf, Sie kennenzulernen!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
