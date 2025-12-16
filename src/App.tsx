import React, { useState, useEffect } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { CookieProvider, useCookies } from './contexts/CookieContext';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import CookieBanner from './components/CookieBanner';
import ChatBot from './components/ChatBot';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ContactPage from './pages/ContactPage';
import AdminDashboard from './pages/AdminDashboard';
import ImpressumPage from './pages/ImpressumPage';
import DatenschutzPage from './pages/DatenschutzPage';
import PartnersPage from './pages/PartnersPage';
import { useTracking } from './hooks/useTracking';
import { useAuth } from './contexts/AuthContext';
import { localDb } from './lib/localDb';

type PageType =
  | 'home'
  | 'about'
  | 'services'
  | 'contact'
  | 'admin'
  | 'impressum'
  | 'datenschutz'
  | 'partners';

const AppContent: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const { openSettings } = useCookies();
  const { user } = useAuth();

  useEffect(() => {
    localDb.init().then(async () => {
      await localDb.initializeDefaultAdmin();
      await localDb.setPageContent('footer', 'phone', 'text', '+49 171 8852058');
      await localDb.setPageContent('footer', 'email', 'text', 'malerbauer1468@gmx.de');
      await localDb.setPageContent('impressum', 'phone', 'text', '+49 171 8852058');
    }).catch(error => {
      console.error('Database initialization error:', error);
    });
  }, []);

  useTracking(currentPage);

  const handleNavigate = (page: string) => {
    if (page === 'admin' && !user) {
      alert('Bitte melden Sie sich an, um auf das Admin-Dashboard zuzugreifen.');
      return;
    }
    setCurrentPage(page as PageType);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} />;
      case 'about':
        return <AboutPage />;
      case 'services':
        return <ServicesPage />;
      case 'contact':
        return <ContactPage onNavigate={handleNavigate} />;
      case 'admin':
        return user ? <AdminDashboard /> : <HomePage onNavigate={handleNavigate} />;
      case 'impressum':
        return <ImpressumPage />;
      case 'datenschutz':
        return <DatenschutzPage />;
      case 'partners':
        return <PartnersPage onNavigate={handleNavigate} />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation currentPage={currentPage} onNavigate={handleNavigate} />
      <main className="flex-grow">{renderPage()}</main>
      <Footer onNavigate={handleNavigate} onOpenCookieSettings={openSettings} />
      <CookieBanner />
      <ChatBot />
    </div>
  );
};

function App() {
  return (
    <CookieProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </CookieProvider>
  );
}

export default App;
