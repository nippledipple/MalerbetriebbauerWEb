import React, { useEffect, useRef, useState } from 'react';

interface Partner {
  id: string;
  name: string;
  logo_url: string;
}

interface PartnerSliderProps {
  partners: Partner[];
  onClickSlider: () => void;
}

export const PartnerSlider: React.FC<PartnerSliderProps> = ({ partners, onClickSlider }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer || partners.length === 0) return;

    let animationId: number;
    let scrollPosition = 0;
    const scrollSpeed = 0.5;

    const animate = () => {
      if (!isPaused && scrollContainer) {
        scrollPosition += scrollSpeed;

        if (scrollPosition >= scrollContainer.scrollWidth / 2) {
          scrollPosition = 0;
        }

        scrollContainer.scrollLeft = scrollPosition;
      }
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [isPaused, partners]);

  if (partners.length === 0) {
    return null;
  }

  const duplicatedPartners = [...partners, ...partners];

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-[#585858] text-center mb-8">
          Unsere Partner & Kooperationen
        </h2>

        <div
          className="relative cursor-pointer group"
          onClick={onClickSlider}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            ref={scrollContainerRef}
            className="overflow-x-auto scrollbar-hide"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            <div className="flex space-x-12 py-6">
              {duplicatedPartners.map((partner, index) => (
                <div
                  key={`${partner.id}-${index}`}
                  className="flex-shrink-0 w-48 h-24 flex items-center justify-center transition-all duration-300 group-hover:scale-105"
                >
                  <img
                    src={partner.logo_url}
                    alt={partner.name}
                    className="max-w-full max-h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="absolute inset-0 bg-gradient-to-r from-gray-50 via-transparent to-gray-50 pointer-events-none" />

          <div className="text-center mt-4 text-sm text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Klicken Sie hier, um alle Partner zu sehen
          </div>
        </div>
      </div>
    </div>
  );
};
