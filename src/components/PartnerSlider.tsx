import React, { useEffect, useState } from 'react';

interface Partner {
  id: string;
  name: string;
  logo_url: string;
  website_url?: string;
}

interface PartnerSliderProps {
  partners: Partner[];
}

const PartnerSlider: React.FC<PartnerSliderProps> = ({ partners }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (partners.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % partners.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [partners.length]);

  if (partners.length === 0) return null;

  const visiblePartners = partners.length === 1
    ? [partners[0]]
    : [
        partners[currentIndex],
        partners[(currentIndex + 1) % partners.length],
        partners[(currentIndex + 2) % partners.length],
      ];

  return (
    <section className="py-12 bg-white border-t border-gray-200">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-[#585858] mb-8 text-center">
          Unsere Partner
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {visiblePartners.map((partner) => (
            <div
              key={partner.id}
              className="flex items-center justify-center p-6 bg-gray-50 rounded-lg hover:shadow-lg transition-shadow"
            >
              {partner.website_url ? (
                <a
                  href={partner.website_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full h-24 flex items-center justify-center"
                >
                  <img
                    src={partner.logo_url}
                    alt={partner.name}
                    className="max-w-full max-h-full object-contain filter grayscale hover:grayscale-0 transition-all"
                  />
                </a>
              ) : (
                <div className="w-full h-24 flex items-center justify-center">
                  <img
                    src={partner.logo_url}
                    alt={partner.name}
                    className="max-w-full max-h-full object-contain filter grayscale"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnerSlider;
