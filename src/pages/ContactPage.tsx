import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useCookies } from '../contexts/CookieContext';
import { EditableText } from '../components/EditableText';
import { logError } from '../lib/errorLogger';

interface ContactPageProps {
  onNavigate: (page: string) => void;
}

const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    consent: false,
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const { consent } = useCookies();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    if (!formData.consent) {
      setErrorMessage('Bitte stimmen Sie der Datenverarbeitung zu.');
      setStatus('error');
      return;
    }

    try {
      const { error } = await supabase
        .from('contact_requests')
        .insert([{
          name: formData.name,
          email: formData.email,
          phone: formData.phone || null,
          message: `${formData.subject ? `Betreff: ${formData.subject}\n\n` : ''}${formData.message}`,
          status: 'open',
        }]);

      if (error) throw error;

      if (consent.statistics) {
        const sessionId = localStorage.getItem('sessionId') || crypto.randomUUID();
        localStorage.setItem('sessionId', sessionId);

        await supabase
          .from('visitor_stats')
          .insert([{
            page_url: '/contact-form-submit',
            referrer: document.referrer,
            user_agent: navigator.userAgent,
            session_id: sessionId,
          }]);
      }

      setStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        consent: false,
      });

      setTimeout(() => {
        setStatus('idle');
      }, 5000);
    } catch (error: any) {
      console.error('Error submitting form:', error);

      await logError({
        errorType: 'contact_form',
        errorMessage: error.message || 'Unbekannter Fehler beim Kontaktformular',
        errorStack: error.stack,
        formData: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          messageLength: formData.message.length,
        },
        pageUrl: '/contact',
      });

      setErrorMessage(
        'Es ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.'
      );
      setStatus('error');
    }
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
              <h2 className="text-2xl font-bold text-[#585858] mb-6">
                Kontaktformular
              </h2>

              {status === 'success' && (
                <div className="mb-6 p-4 bg-green-100 border border-green-300 rounded-lg flex items-start space-x-3">
                  <CheckCircle className="text-green-600 flex-shrink-0" size={24} />
                  <div>
                    <p className="text-green-800 font-semibold">Nachricht gesendet!</p>
                    <p className="text-green-700 text-sm">
                      Vielen Dank für Ihre Anfrage. Wir melden uns zeitnah bei Ihnen.
                    </p>
                  </div>
                </div>
              )}

              {status === 'error' && (
                <div className="mb-6 p-4 bg-red-100 border border-red-300 rounded-lg flex items-start space-x-3">
                  <AlertCircle className="text-red-600 flex-shrink-0" size={24} />
                  <div>
                    <p className="text-red-800 font-semibold">Fehler</p>
                    <p className="text-red-700 text-sm">{errorMessage}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ffd900] focus:border-transparent"
                    required
                    disabled={status === 'loading'}
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    E-Mail *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ffd900] focus:border-transparent"
                    required
                    disabled={status === 'loading'}
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Telefonnummer (optional)
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ffd900] focus:border-transparent"
                    disabled={status === 'loading'}
                  />
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Betreff (optional)
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ffd900] focus:border-transparent"
                    disabled={status === 'loading'}
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Nachricht *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ffd900] focus:border-transparent resize-none"
                    required
                    disabled={status === 'loading'}
                  />
                </div>

                <div className="flex items-start space-x-2">
                  <input
                    type="checkbox"
                    id="consent"
                    name="consent"
                    checked={formData.consent}
                    onChange={handleChange}
                    className="mt-1"
                    required
                    disabled={status === 'loading'}
                  />
                  <label htmlFor="consent" className="text-sm text-gray-600">
                    Ich stimme der Verarbeitung meiner Daten gemäß{' '}
                    <button
                      type="button"
                      onClick={() => onNavigate('datenschutz')}
                      className="text-[#ffd900] hover:underline"
                    >
                      Datenschutzbestimmungen
                    </button>{' '}
                    zu. *
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full bg-[#ffd900] text-[#585858] font-bold py-3 rounded-lg hover:bg-[#e6c200] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  <Send size={20} />
                  <span>{status === 'loading' ? 'Wird gesendet...' : 'Nachricht senden'}</span>
                </button>
              </form>
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
