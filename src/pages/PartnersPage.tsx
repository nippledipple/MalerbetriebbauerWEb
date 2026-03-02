import React, { useEffect, useState } from 'react';
import { supabase, logSupabaseError } from '../lib/supabase';
import { ExternalLink } from 'lucide-react';

interface Partner {
  id: string;
  name: string;
  logo_url: string;
  website_url?: string;
}

const PartnersPage: React.FC = () => {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPartners();
  }, []);

  const loadPartners = async () => {
    if (!supabase) {
      setLoading(false);
      return;
    }
    try {
      const { data, error } = await supabase
        .from('partners')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true })
        .order('created_at', { ascending: true });

      if (error) {
        logSupabaseError('partners select', error);
        setPartners([]);
        return;
      }
      setPartners(data || []);
    } catch (error) {
      console.error('Error loading partners:', error);
      setPartners([]);
    } finally {
      setLoading(false);
    }
  };

  return (
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
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#ffd900]"></div>
              <p className="mt-4 text-gray-600">Lade Partner...</p>
            </div>
          ) : partners.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">Derzeit sind keine Partner verfügbar.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {partners.map((partner) => (
                <div
                  key={partner.id}
                  className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-8 flex flex-col items-center justify-center"
                >
                  <div className="w-full h-32 flex items-center justify-center mb-4">
                    <img
                      src={partner.logo_url}
                      alt={partner.name}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-[#585858] mb-4 text-center">
                    {partner.name}
                  </h3>
                  {partner.website_url && (
                    <a
                      href={partner.website_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 text-[#ffd900] hover:text-[#e6c200] transition-colors font-semibold"
                    >
                      <span>Website besuchen</span>
                      <ExternalLink size={18} />
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default PartnersPage;
