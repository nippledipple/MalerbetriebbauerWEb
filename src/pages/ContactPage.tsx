import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, ExternalLink, MessageCircle } from 'lucide-react';
import { EditableText } from '../components/EditableText';

interface ContactPageProps {
  onNavigate: (page: string) => void;
}

interface RedirectOverlayProps {
  type: 'whatsapp' | 'email';
  onClose: () => void;
}

const RedirectOverlay: React.FC<RedirectOverlayProps> = ({ type, onClose }) => {
  const isWhatsApp = type === 'whatsapp';

  return (
    <div className="redirect-overlay-backdrop" onClick={onClose}>
      <div className="redirect-overlay-card" onClick={(e) => e.stopPropagation()}>
        <div className="redirect-icon-container">
          {isWhatsApp ? (
            <div className="redirect-icon whatsapp-icon">
              <MessageCircle size={40} strokeWidth={2} />
            </div>
          ) : (
            <div className="redirect-icon email-icon">
              <Mail size={40} strokeWidth={2} />
            </div>
          )}
        </div>

        <h3 className="redirect-headline">
          {isWhatsApp ? 'Weiterleitung zu WhatsApp…' : 'E-Mail wird geöffnet…'}
        </h3>

        <p className="redirect-subtext">
          {isWhatsApp
            ? 'Ihr Malerbetrieb Bauer öffnet WhatsApp für Ihre Anfrage.'
            : 'Ihr Malerbetrieb Bauer öffnet Ihr E-Mail-Programm.'}
        </p>

        <div className="redirect-spinner">
          <div className="spinner"></div>
        </div>

        <button
          className="redirect-fallback-button"
          onClick={() => {
            if (isWhatsApp) {
              window.open('https://wa.me/491746149335?text=Guten%20Tag%20Herr%20Wolfermann,%0Aich%20interessiere%20mich%20f%C3%BCr%20ein%20Angebot.%0A%0AMit%20freundlichen%20Gr%C3%BC%C3%9Fen', '_blank', 'noopener,noreferrer');
            } else {
              window.location.href = 'mailto:malerbauer.mer@gmail.com?subject=Anfrage%20Malerbetrieb%20Bauer';
            }
            onClose();
          }}
        >
          Falls nichts passiert, hier klicken
        </button>
      </div>
    </div>
  );
};

const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const [showRedirect, setShowRedirect] = useState<'whatsapp' | 'email' | null>(null);

  const handleWhatsAppClick = () => {
    setShowRedirect('whatsapp');
    setTimeout(() => {
      window.open('https://wa.me/491746149335?text=Guten%20Tag%20Herr%20Wolfermann,%0Aich%20interessiere%20mich%20f%C3%BCr%20ein%20Angebot.%0A%0AMit%20freundlichen%20Gr%C3%BC%C3%9Fen', '_blank', 'noopener,noreferrer');
      setShowRedirect(null);
    }, 1300);
  };

  const handleEmailClick = () => {
    setShowRedirect('email');
    setTimeout(() => {
      window.location.href = 'mailto:malerbauer.mer@gmail.com?subject=Anfrage%20Malerbetrieb%20Bauer';
      setShowRedirect(null);
    }, 1300);
  };

  return (
    <>
      {showRedirect && (
        <RedirectOverlay
          type={showRedirect}
          onClose={() => setShowRedirect(null)}
        />
      )}
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

          <div className="max-w-4xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-[#585858] mb-4 text-center">
              Wie möchten Sie uns erreichen?
            </h2>
            <p className="text-gray-600 mb-10 text-center text-lg">
              Wählen Sie einfach Ihren bevorzugten Kontaktweg
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
              <button
                onClick={handleWhatsAppClick}
                className="group bg-gradient-to-br from-[#25D366] to-[#128C7E] text-white rounded-2xl transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl p-8 flex flex-col items-center text-center"
                style={{
                  boxShadow: '0 10px 25px rgba(37, 211, 102, 0.3)',
                }}
              >
                <div className="bg-white/15 backdrop-blur-sm w-20 h-20 rounded-full flex items-center justify-center mb-4">
                  <MessageCircle className="w-10 h-10" />
                </div>
                <div className="text-xl font-bold mb-2">WhatsApp</div>
                <div className="text-sm text-white/90">
                  Sofortiger Chat
                </div>
              </button>

              <a
                href="tel:+491718852058"
                className="group bg-gradient-to-br from-[#ffd900] to-[#ca9922] text-[#585858] rounded-2xl transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl p-8 flex flex-col items-center text-center"
                style={{
                  boxShadow: '0 10px 25px rgba(255, 217, 0, 0.3)',
                }}
              >
                <div className="bg-white/20 backdrop-blur-sm w-20 h-20 rounded-full flex items-center justify-center mb-4">
                  <Phone className="w-10 h-10" />
                </div>
                <div className="text-xl font-bold mb-2">Anrufen</div>
                <div className="text-sm opacity-90">
                  +49 171 8852058
                </div>
              </a>

              <button
                onClick={handleEmailClick}
                className="group bg-white hover:bg-gray-50 text-gray-800 rounded-2xl border-2 border-gray-200 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl p-8 flex flex-col items-center text-center"
              >
                <div className="bg-blue-50 w-20 h-20 rounded-full flex items-center justify-center mb-4">
                  <Mail className="w-10 h-10 text-blue-600" />
                </div>
                <div className="text-xl font-bold mb-2">E-Mail</div>
                <div className="text-sm text-gray-600">
                  Schriftliche Anfrage
                </div>
              </button>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
              <h3 className="text-xl font-bold text-[#585858] mb-6 text-center">Weitere Informationen</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-[#ffd900] w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="text-[#585858]" size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#585858] mb-1">Adresse</h4>
                    <p className="text-gray-600">Neue Str. 19</p>
                    <p className="text-gray-600">95173 Schönwald</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-[#ffd900] w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="text-[#585858]" size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#585858] mb-1">E-Mail Adresse</h4>
                    <a
                      href="mailto:malerbauer1468@gmx.de"
                      className="text-gray-600 hover:text-[#ffd900] transition-colors break-all"
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
                    <h4 className="font-bold text-[#585858] mb-1">Öffnungszeiten</h4>
                    <p className="text-gray-600">Mo - Fr: 08:00 - 17:00 Uhr</p>
                    <p className="text-gray-600">Sa: Nach Vereinbarung</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-[#ffd900] w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                    <ExternalLink className="text-[#585858]" size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#585858] mb-1">Schnellkontakt</h4>
                    <p className="text-gray-600">WhatsApp: Sofortige Antwort</p>
                    <p className="text-gray-600">Telefon: Während Bürozeiten</p>
                  </div>
                </div>
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
    </>
  );
};

export default ContactPage;
