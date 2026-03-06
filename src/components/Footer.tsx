import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
  onOpenCookieSettings: () => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenCookieSettings }) => {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-blue-500">
              Malerbetrieb Bauer
            </h3>
            <p className="text-gray-400 mb-4">
              Ihr zuverlässiger Partner für Malerarbeiten in Schönwald und Umgebung.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4 text-blue-500">
              Kontakt
            </h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin size={20} className="text-blue-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">Neue Str. 19</p>
                  <p className="text-gray-300">95173 Schönwald</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={20} className="text-blue-500 flex-shrink-0" />
                <a href="tel:+4917188520588" className="text-gray-400 hover:text-blue-400 transition-colors">
                  +49 171 8852058
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={20} className="text-blue-500 flex-shrink-0" />
                <a href="mailto:malerbauer1468@gmx.de" className="text-gray-400 hover:text-blue-400 transition-colors">
                  malerbauer1468@gmx.de
                </a>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4 text-blue-500">
              Rechtliches
            </h3>
            <div className="space-y-2">
              <button
                onClick={() => onNavigate('impressum')}
                className="block text-gray-400 hover:text-blue-400 transition-colors"
              >
                Impressum
              </button>
              <button
                onClick={() => onNavigate('datenschutz')}
                className="block text-gray-400 hover:text-blue-400 transition-colors"
              >
                Datenschutz
              </button>
              <button
                onClick={onOpenCookieSettings}
                className="block text-gray-400 hover:text-blue-400 transition-colors"
              >
                Cookie-Einstellungen
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
          <p>© {new Date().getFullYear()} Malerbetrieb Bauer. Alle Rechte vorbehalten.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
