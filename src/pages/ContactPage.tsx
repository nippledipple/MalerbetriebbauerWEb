import React from 'react';
import { MapPin, Phone, Mail, Clock, ExternalLink, MessageCircle } from 'lucide-react';
import { EditableText } from '../components/EditableText';

interface ContactPageProps {
  onNavigate: (page: string) => void;
}

const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const handleCheck24Click = () => {
    window.open('https://www.check24.de/profis/maler-bauer-schoenwald/', '_blank', 'noopener,noreferrer');
  };

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/491718852058', '_blank', 'noopener,noreferrer');
  };

  const handleEmailClick = () => {
    window.location.href = 'mailto:malerbauer1468@gmx.de';
  };

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <EditableText
            page="contact"
            section="title"
            defaultContent="Kontakt"
            as="h1"
            className="text-4xl md:text-5xl font-bold text-[#585858] mb-8 text-center"
          />

          <div className="bg-gradient-to-br from-[#ffd900] to-[#ca9922] rounded-lg p-8 mb-12 text-[#585858] relative overflow-hidden">
            <img
              src="/e48083a5-33c2-4e82-9bfb-10683f40cf8d-removebg-preview.png"
              alt="Malerbetrieb Bauer Logo"
              className="absolute right-8 top-1/2 -translate-y-1/2 h-32 w-auto object-contain opacity-30"
            />
            <EditableText
              page="contact"
              section="tagline"
              defaultContent="Wir freuen uns auf Ihre Anfrage!"
              as="p"
              className="text-xl md:text-2xl font-semibold text-center relative z-10"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
            <div>
              <h2 className="text-2xl font-bold text-[#585858] mb-6">
                Kontaktinformationen
              </h2>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-[#ffd900] w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="text-[#585858]" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#585858] mb-1">Adresse</h3>
                    <p className="text-gray-600">Neue Str. 19</p>
                    <p className="text-gray-600">95173 Schönwald</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-[#ffd900] w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="text-[#585858]" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#585858] mb-1">Telefon</h3>
                    <a
                      href="tel:+491718852058"
                      className="text-gray-600 hover:text-[#ffd900] transition-colors"
                    >
                      +49 171 8852058
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-[#ffd900] w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="text-[#585858]" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#585858] mb-1">E-Mail</h3>
                    <a
                      href="mailto:malerbauer1468@gmx.de"
                      className="text-gray-600 hover:text-[#ffd900] transition-colors"
                    >
                      malerbauer1468@gmx.de
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-[#ffd900] w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="text-[#585858]" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#585858] mb-1">Öffnungszeiten</h3>
                    <p className="text-gray-600">Montag - Freitag: 08:00 - 17:00 Uhr</p>
                    <p className="text-gray-600">Samstag: Nach Vereinbarung</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[#585858] mb-4">
                Kontakt aufnehmen
              </h2>
              <p className="text-gray-600 mb-8">
                Du möchtest ein Angebot anfragen oder hast Fragen? Wähle einfach den passenden Kontaktweg:
              </p>

              <div className="space-y-4">
                <button
                  onClick={handleCheck24Click}
                  className="group w-full bg-[#0070f3] hover:bg-[#0051cc] text-white font-bold py-6 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center justify-between"
                >
                  <div className="flex items-center space-x-4">
                    <div className="bg-white/20 p-3 rounded-xl">
                      <ExternalLink className="text-white" size={28} />
                    </div>
                    <div className="text-left">
                      <div className="text-xl font-bold">Angebot über CHECK24 anfragen</div>
                      <div className="text-sm text-white/80 mt-1">
                        Du kannst dort direkt eine Angebotsanfrage stellen.
                      </div>
                    </div>
                  </div>
                  <ExternalLink className="text-white opacity-50 group-hover:opacity-100 transition-opacity" size={24} />
                </button>

                <button
                  onClick={handleWhatsAppClick}
                  className="group w-full bg-[#25D366] hover:bg-[#1da851] text-white font-bold py-5 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-between"
                >
                  <div className="flex items-center space-x-4">
                    <div className="bg-white/20 p-3 rounded-xl">
                      <MessageCircle className="text-white" size={26} />
                    </div>
                    <div className="text-left">
                      <div className="text-lg font-bold">WhatsApp Nachricht senden</div>
                    </div>
                  </div>
                  <ExternalLink className="text-white opacity-50 group-hover:opacity-100 transition-opacity" size={20} />
                </button>

                <button
                  onClick={handleEmailClick}
                  className="group w-full bg-white hover:bg-gray-50 text-[#585858] font-bold py-5 px-8 rounded-2xl border-2 border-gray-300 hover:border-gray-400 transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-between"
                >
                  <div className="flex items-center space-x-4">
                    <div className="bg-gray-100 p-3 rounded-xl">
                      <Mail className="text-[#585858]" size={26} />
                    </div>
                    <div className="text-left">
                      <div className="text-lg font-bold">E-Mail schreiben</div>
                    </div>
                  </div>
                  <Mail className="text-gray-400 group-hover:text-[#585858] transition-colors" size={20} />
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg overflow-hidden shadow-lg">
            <div className="aspect-video w-full">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2569.896447843924!2d11.889126!3d50.244167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a1a1e8e8e8e8e8%3A0x1234567890abcdef!2sNeue%20Str.%2019%2C%2095173%20Sch%C3%B6nwald!5e0!3m2!1sde!2sde!4v1234567890123"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Standort Malerbetrieb Bauer"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
