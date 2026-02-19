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

              <div className="space-y-4 max-w-[520px]">
                <button
                  onClick={handleWhatsAppClick}
                  className="whatsapp-premium-button group w-full bg-gradient-to-br from-[#25D366] to-[#128C7E] text-white rounded-2xl transition-all duration-300 ease-in-out flex items-center justify-between relative overflow-hidden"
                  style={{
                    padding: '20px 24px',
                    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
                  }}
                >
                  <div className="flex items-center space-x-4">
                    <div className="bg-white/15 backdrop-blur-sm w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0">
                      <img
                        src="/whatsapp-logo-green.svg"
                        alt="WhatsApp"
                        className="w-8 h-8 object-contain"
                      />
                    </div>
                    <div className="text-left">
                      <div className="text-lg font-bold leading-tight">WhatsApp Anfrage senden</div>
                      <div className="text-sm text-white/85 mt-1 font-normal">
                        Antwort innerhalb von 24 Stunden
                      </div>
                    </div>
                  </div>
                  <div className="flex-shrink-0 ml-4">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white opacity-90">
                      <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </button>

                <button
                  onClick={handleEmailClick}
                  className="group w-full bg-white hover:bg-gray-50 text-gray-800 rounded-2xl border border-gray-200 transition-all duration-300 ease-in-out transform hover:scale-[1.01] flex items-center justify-between"
                  style={{
                    padding: '20px 24px',
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.08)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.12)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.08)';
                  }}
                >
                  <div className="flex items-center space-x-4">
                    <div className="bg-blue-50 w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="text-blue-600" size={26} strokeWidth={2} />
                    </div>
                    <div className="text-left">
                      <div className="text-lg font-bold leading-tight text-gray-900">E-Mail schreiben</div>
                      <div className="text-sm text-gray-500 mt-1 font-normal">
                        Antwort so schnell wie möglich
                      </div>
                    </div>
                  </div>
                  <div className="flex-shrink-0 ml-4">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-gray-400 group-hover:text-gray-600 transition-colors">
                      <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
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
    </>
  );
};

export default ContactPage;
