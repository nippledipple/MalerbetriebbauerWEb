import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import { EditableText } from './EditableText';

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
            <EditableText
              page="footer"
              section="company_title"
              defaultContent="Malerbetrieb Bauer"
              as="h3"
              className="text-xl font-bold mb-4 text-[#ffd900]"
            />
            <EditableText
              page="footer"
              section="company_description"
              defaultContent="Ihr zuverlässiger Partner für Malerarbeiten in Schönwald und Umgebung."
              as="p"
              className="text-gray-300 mb-4"
              multiline
            />
          </div>

          <div>
            <EditableText
              page="footer"
              section="contact_title"
              defaultContent="Kontakt"
              as="h3"
              className="text-xl font-bold mb-4 text-[#ffd900]"
            />
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin size={20} className="text-[#ffd900] mt-1 flex-shrink-0" />
                <div>
                  <EditableText
                    page="footer"
                    section="address_line1"
                    defaultContent="Neue Str. 19"
                    as="p"
                  />
                  <EditableText
                    page="footer"
                    section="address_line2"
                    defaultContent="95173 Schönwald"
                    as="p"
                  />
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={20} className="text-[#ffd900] flex-shrink-0" />
                <EditableText
                  page="footer"
                  section="phone"
                  defaultContent="+49 171 8852058"
                  as="a"
                  className="hover:text-[#ffd900] transition-colors"
                />
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={20} className="text-[#ffd900] flex-shrink-0" />
                <EditableText
                  page="footer"
                  section="email"
                  defaultContent="malerbauer1468@gmx.de"
                  as="a"
                  className="hover:text-[#ffd900] transition-colors"
                />
              </div>
            </div>
          </div>

          <div>
            <EditableText
              page="footer"
              section="legal_title"
              defaultContent="Rechtliches"
              as="h3"
              className="text-xl font-bold mb-4 text-[#ffd900]"
            />
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
            </div>
          </div>
        </div>

        <div className="border-t border-gray-600 mt-8 pt-8 text-center text-gray-400">
          <EditableText
            page="footer"
            section="copyright"
            defaultContent={`© ${new Date().getFullYear()} Malerbetrieb Bauer. Alle Rechte vorbehalten.`}
            as="p"
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
