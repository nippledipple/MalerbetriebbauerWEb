import React, { useState } from 'react';
import { ExternalLink } from 'lucide-react';

interface Partner {
  id: string;
  name: string;
  logo_url: string;
  website_url?: string;
  description?: string;
}

const PARTNERS: Partner[] = [
  {
    id: '1',
    name: 'Farben Volz',
    logo_url: '/farben-volz-logo-quer-rgb.png',
    website_url: 'https://www.farben-volz.de',
    description: 'Farben Volz ist ein zuverlässiger Partner des Malerbetrieb Bauer und unterstützt uns bei der Umsetzung hochwertiger Projekte mit professionellen Farben, Lacken und Materialien. Durch die langjährige Erfahrung und die hohe Produktqualität von Farben Volz können wir unseren Kunden erstklassige Ergebnisse und langlebige Beschichtungen bieten. Die enge Zusammenarbeit ermöglicht uns eine optimale Materialauswahl und eine fachkundige Beratung für jedes Projekt.'
  }
];

const PartnersPage: React.FC = () => {
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);

  return (
    <>
      {selectedPartner && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedPartner(null)}
        >
          <div
            className="bg-white rounded-lg max-w-2xl w-full p-8 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedPartner(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl leading-none"
            >
              &times;
            </button>
            <div className="w-full h-48 flex items-center justify-center mb-6">
              <img
                src={selectedPartner.logo_url}
                alt={selectedPartner.name}
                className="max-w-full max-h-full object-contain"
              />
            </div>
            <h2 className="text-3xl font-bold text-[#585858] mb-4">
              {selectedPartner.name}
            </h2>
            {selectedPartner.description && (
              <p className="text-gray-700 mb-6 leading-relaxed">
                {selectedPartner.description}
              </p>
            )}
            {selectedPartner.website_url && (
              <a
                href={selectedPartner.website_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-[#ffd900] hover:bg-[#e6c200] text-[#585858] font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                <span>Website besuchen</span>
                <ExternalLink size={18} />
              </a>
            )}
          </div>
        </div>
      )}
      <div className="min-h-screen bg-gray-50">
      <section className="py-16 bg-gradient-to-br from-[#ffd900] via-[#fffe34] to-[#ca9922]">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-[#585858] mb-4 text-center">
            Unsere Partner
          </h1>
          <p className="text-xl text-[#585858]/90 text-center max-w-3xl mx-auto">
            Wir arbeiten mit erstklassigen Partnern zusammen, um Ihnen die beste Qualität und Service zu bieten.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {PARTNERS.map((partner) => (
              <div
                key={partner.id}
                onClick={() => setSelectedPartner(partner)}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-8 flex flex-col items-center justify-center cursor-pointer"
              >
                <div className="w-full h-40 flex items-center justify-center mb-6 p-4">
                  <img
                    src={partner.logo_url}
                    alt={partner.name}
                    className="max-w-full max-h-full object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                </div>
                <h3 className="text-xl font-bold text-[#585858] mb-4 text-center">
                  {partner.name}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
    </>
  );
};

export default PartnersPage;
