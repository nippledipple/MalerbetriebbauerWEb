import React, { useEffect, useState } from 'react';
import { ExternalLink, ArrowLeft } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Partner {
  id: string;
  name: string;
  logo_url: string;
  description: string;
  website_url: string | null;
  display_order: number;
}

interface PartnersPageProps {
  onNavigate: (page: string) => void;
}

const PartnersPage: React.FC<PartnersPageProps> = ({ onNavigate }) => {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);

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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center space-x-2 text-[#585858] hover:text-[#ffd900] transition-colors mb-8"
          >
            <ArrowLeft size={20} />
            <span>Zurück zur Startseite</span>
          </button>

          <h1 className="text-4xl md:text-5xl font-bold text-[#585858] mb-6">
            Unsere Partner & Kooperationen
          </h1>

          <p className="text-lg text-gray-600 mb-12">
            Wir sind stolz darauf, mit führenden Unternehmen und Institutionen zusammenzuarbeiten.
            Diese Partnerschaften ermöglichen es uns, Ihnen stets die besten Produkte und Dienstleistungen anzubieten.
          </p>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ffd900]"></div>
            </div>
          ) : partners.length === 0 ? (
            <div className="text-center py-20 text-gray-500">
              Derzeit sind keine Partner verfügbar.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {partners.map((partner) => (
                <div
                  key={partner.id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="bg-gray-50 p-8 flex items-center justify-center h-48">
                    <img
                      src={partner.logo_url}
                      alt={partner.name}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-[#585858] mb-3">
                      {partner.name}
                    </h3>

                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {partner.description}
                    </p>

                    {partner.website_url && (
                      <a
                        href={partner.website_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-2 bg-[#ffd900] text-[#585858] font-semibold px-6 py-3 rounded-lg hover:bg-[#e6c200] transition-colors"
                      >
                        <span>Zur Website</span>
                        <ExternalLink size={18} />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PartnersPage;
