import React from 'react';
import { Phone, Mail, MapPin, Star } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
  onOpenCookieSettings: () => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenCookieSettings }) => {
  return (
    <footer className="bg-[#585858] text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-[#ffd900]">
              Malerbetrieb Bauer
            </h3>
            <p className="text-gray-300 mb-4">
              Ihr zuverlässiger Partner für Malerarbeiten in Schönwald und Umgebung.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4 text-[#ffd900]">
              Kontakt
            </h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin size={20} className="text-[#ffd900] mt-1 flex-shrink-0" />
                <div>
                  <p>Neue Str. 19</p>
                  <p>95173 Schönwald</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={20} className="text-[#ffd900] flex-shrink-0" />
                <a href="tel:+4917188520588" className="hover:text-[#ffd900] transition-colors">
                  +49 171 8852058
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={20} className="text-[#ffd900] flex-shrink-0" />
                <a href="mailto:malerbauer1468@gmx.de" className="hover:text-[#ffd900] transition-colors">
                  malerbauer1468@gmx.de
                </a>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4 text-[#ffd900]">
              Rechtliches
            </h3>
            <div className="space-y-2">
              <button
                onClick={() => onNavigate('impressum')}
                className="block hover:text-[#ffd900] transition-colors"
              >
                Impressum
              </button>
              <button
                onClick={() => onNavigate('datenschutz')}
                className="block hover:text-[#ffd900] transition-colors"
              >
                Datenschutz
              </button>
              <button
                onClick={onOpenCookieSettings}
                className="block hover:text-[#ffd900] transition-colors"
              >
                Cookie-Einstellungen
              </button>
              <a
                href="https://g.page/r/YOUR_GOOGLE_PLACE_ID/review"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 mt-4 bg-[#ffd900] text-[#585858] px-4 py-2 rounded-lg font-semibold hover:bg-[#e6c200] transition-colors"
              >
                <Star size={20} />
                <span>Google Bewertung schreiben</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-600 mt-8 pt-8 text-center text-gray-400">
          <p>© {new Date().getFullYear()} Malerbetrieb Bauer. Alle Rechte vorbehalten.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
