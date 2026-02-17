import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Paintbrush } from 'lucide-react';
import { findBestMatch, quickButtons } from '../lib/chatKnowledge';
import { supabase } from '../lib/supabase';
import { logError } from '../lib/errorLogger';

interface Message {
  id: string;
  text: string;
  sender: 'bot' | 'user';
  timestamp: Date;
}

interface OfferData {
  workType?: string;
  street?: string;
  zip?: string;
  city?: string;
  name?: string;
  contact?: string;
  photo?: string;
}

type OfferStep = 'workType' | 'street' | 'zip' | 'name' | 'contact' | 'photo' | 'complete';

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [showQuickButtons, setShowQuickButtons] = useState(true);
  const [isOfferFlow, setIsOfferFlow] = useState(false);
  const [offerStep, setOfferStep] = useState<OfferStep>('workType');
  const [offerData, setOfferData] = useState<OfferData>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      addBotMessage('Hallo! Ich bin der MALER-Bot. Wie kann ich dir heute helfen?');
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const addBotMessage = (text: string) => {
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      text,
      sender: 'bot',
      timestamp: new Date()
    }]);
  };

  const addUserMessage = (text: string) => {
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date()
    }]);
  };

  const handleQuickButton = (action: string) => {
    setShowQuickButtons(false);

    switch (action) {
      case 'hours':
        addUserMessage('Wie sind eure Öffnungszeiten?');
        addBotMessage('Unsere Öffnungszeiten sind: Montag bis Freitag von 08:00 bis 17:00 Uhr, Samstag nach Vereinbarung.');
        setTimeout(() => setShowQuickButtons(true), 1000);
        break;
      case 'services':
        addUserMessage('Welche Leistungen bietet ihr an?');
        addBotMessage('Wir bieten an: Innenanstrich, Fassadenarbeiten, Lackierungen, Tapezierarbeiten, Bodenbeschichtungen, Verputzarbeiten, Spachteltechniken und Sonderanstriche.');
        setTimeout(() => setShowQuickButtons(true), 1000);
        break;
      case 'phone':
        addUserMessage('Kann ich euch telefonisch erreichen?');
        addBotMessage('Natürlich! Du erreichst uns unter der Telefonnummer, die auf der Website angegeben ist. Falls du sie hier nicht siehst, findest du sie ganz unten auf der Seite.');
        setTimeout(() => setShowQuickButtons(true), 1000);
        break;
      case 'location':
        addUserMessage('Wo befindet sich euer Betrieb?');
        addBotMessage('Unser Betrieb befindet sich in der Neustraße 19, 95173 Schönwald. Klick hier, um uns auf Google Maps zu öffnen.');
        setTimeout(() => setShowQuickButtons(true), 1000);
        break;
      case 'offer':
        addUserMessage('Ich möchte ein Angebot anfordern');
        startOfferFlow();
        break;
    }
  };

  const startOfferFlow = () => {
    setIsOfferFlow(true);
    setOfferStep('workType');
    setOfferData({});
    addBotMessage('Super! Ich helfe dir gerne bei deiner Anfrage. Welche Art von Arbeit soll durchgeführt werden?');
  };

  const handleOfferResponse = async (response: string) => {
    addUserMessage(response);

    switch (offerStep) {
      case 'workType':
        setOfferData(prev => ({ ...prev, workType: response }));
        setOfferStep('street');
        addBotMessage('Perfekt! Wie lautet die Straße und Hausnummer?');
        break;
      case 'street':
        setOfferData(prev => ({ ...prev, street: response }));
        setOfferStep('zip');
        addBotMessage('Danke! Wie lautet die Postleitzahl und der Ort?');
        break;
      case 'zip':
        const parts = response.split(/[\s,]+/);
        const zip = parts[0];
        const city = parts.slice(1).join(' ');
        setOfferData(prev => ({ ...prev, zip, city }));
        setOfferStep('name');
        addBotMessage('Wie lautet dein Nachname?');
        break;
      case 'name':
        setOfferData(prev => ({ ...prev, name: response }));
        setOfferStep('contact');
        addBotMessage('Wie können wir dich erreichen? (Telefon oder E-Mail)');
        break;
      case 'contact':
        setOfferData(prev => ({ ...prev, contact: response }));
        setOfferStep('photo');
        addBotMessage('Möchtest du uns ein Foto oder einen Link zur Fläche schicken? (Optional - wenn nicht, schreibe einfach "Nein")');
        break;
      case 'photo':
        const finalData = { ...offerData, photo: response !== 'Nein' && response !== 'nein' ? response : undefined };
        setOfferData(finalData);
        await saveOfferToSupabase(finalData);
        setOfferStep('complete');
        addBotMessage('Vielen Dank! Deine Anfrage wurde weitergeleitet. Wir melden uns so schnell wie möglich bei dir.');
        setIsOfferFlow(false);
        setTimeout(() => setShowQuickButtons(true), 2000);
        break;
    }
  };

  const saveOfferToSupabase = async (data: OfferData) => {
    try {
      const isEmail = data.contact?.includes('@');
      const { error } = await supabase.from('ai_inquiries').insert({
        source: 'angebot',
        name: data.name || 'Unbekannt',
        phone: isEmail ? null : data.contact,
        email: isEmail ? data.contact : null,
        address_street: data.street,
        address_zip: data.zip,
        address_city: data.city,
        work_type: data.workType,
        message: data.photo ? `Foto/Link: ${data.photo}` : null,
        status: 'Neu'
      });

      if (error) throw error;
    } catch (error: any) {
      console.error('Error saving inquiry:', error);

      await logError({
        errorType: 'chat_bot_offer',
        errorMessage: error.message || 'Fehler beim Speichern der Angebotsanfrage',
        errorStack: error.stack,
        formData: {
          workType: data.workType,
          street: data.street,
          zip: data.zip,
          city: data.city,
          name: data.name,
          contactType: data.contact?.includes('@') ? 'email' : 'phone',
        },
        pageUrl: '/chatbot-offer',
      });

      addBotMessage('Es gab einen Fehler beim Speichern deiner Anfrage. Bitte versuche es später erneut oder kontaktiere uns direkt.');
    }
  };

  const handleSend = () => {
    if (!input.trim()) return;

    if (isOfferFlow) {
      handleOfferResponse(input);
    } else {
      addUserMessage(input);
      const response = findBestMatch(input);

      if (response) {
        setTimeout(() => addBotMessage(response), 500);
      } else {
        setTimeout(() => addBotMessage('Dazu liegen mir keine genauen Infos vor. Bitte wende dich direkt an Malerbetrieb Bauer unter der Telefonnummer, die unten auf der Website steht.'), 500);
      }

      setTimeout(() => setShowQuickButtons(true), 1500);
    }

    setInput('');
  };

  const workTypeOptions = [
    'Fassade',
    'Innenraum',
    'Decke',
    'Boden',
    'Lackierung',
    'Tapezieren',
    'Sonstiges'
  ];

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#FFD43B] text-gray-900 px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105 font-medium"
        >
          <Paintbrush className="w-5 h-5" />
          <span className="hidden sm:inline">MALER-Bot</span>
          <MessageCircle className="w-5 h-5 sm:hidden" />
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-3rem)] h-[600px] max-h-[calc(100vh-8rem)] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200">
          <div className="bg-gradient-to-r from-[#FFD43B] to-[#FFC107] p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white rounded-full p-2">
                <Paintbrush className="w-5 h-5 text-gray-900" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">MALER-Bot</h3>
                <p className="text-xs text-gray-700">Dein digitaler Ansprechpartner</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-900 hover:bg-white/20 p-1 rounded-lg transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] px-4 py-2 rounded-2xl ${
                    message.sender === 'user'
                      ? 'bg-[#1E3A8A] text-white rounded-br-md'
                      : 'bg-gray-100 text-gray-900 rounded-bl-md'
                  } shadow-sm animate-fade-in`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                </div>
              </div>
            ))}

            {showQuickButtons && !isOfferFlow && messages.length > 0 && (
              <div className="space-y-2 pt-2 animate-fade-in">
                <p className="text-xs text-gray-500 text-center">Häufige Fragen:</p>
                {quickButtons.map((button) => (
                  <button
                    key={button.id}
                    onClick={() => handleQuickButton(button.action)}
                    className="w-full text-left px-3 py-2 text-sm bg-gray-50 hover:bg-gray-100 rounded-lg transition border border-gray-200 text-gray-900"
                  >
                    {button.label}
                  </button>
                ))}
              </div>
            )}

            {isOfferFlow && offerStep === 'workType' && (
              <div className="space-y-2 pt-2 animate-fade-in">
                <p className="text-xs text-gray-500 text-center">Wähle eine Option:</p>
                {workTypeOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      setInput(option);
                      handleOfferResponse(option);
                    }}
                    className="w-full text-left px-3 py-2 text-sm bg-gray-50 hover:bg-gray-100 rounded-lg transition border border-gray-200 text-gray-900"
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t border-gray-200">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Schreibe eine Nachricht..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFD43B] bg-white text-gray-900"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim()}
                className="bg-[#FFD43B] text-gray-900 p-2 rounded-lg hover:bg-[#FFC107] transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </>
  );
}
