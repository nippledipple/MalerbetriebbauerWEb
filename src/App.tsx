import React, { useState, useEffect } from 'react';
import { CookieProvider, useCookies } from './contexts/CookieContext';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import CookieBanner from './components/CookieBanner';
import DatabaseNotification from './components/DatabaseNotification';
import { HubSpotIntegration } from './components/HubSpotIntegration';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ContactPage from './pages/ContactPage';
import ImpressumPage from './pages/ImpressumPage';
import DatenschutzPage from './pages/DatenschutzPage';
import PartnersPage from './pages/PartnersPage';
import { useTracking } from './hooks/useTracking';
import { localDb } from './lib/localDb';

type PageType =
  | 'home'
  | 'about'
  | 'services'
  | 'contact'
  | 'impressum'
  | 'datenschutz'
  | 'partners';

const validPages: PageType[] = ['home', 'about', 'services', 'contact', 'impressum', 'datenschutz', 'partners'];

function getPageFromPath(pathname: string): PageType {
  const path = pathname.replace(/^\/+|\/+$/g, '').toLowerCase();
  if (!path || path === 'home') return 'home';
  if (validPages.includes(path as PageType)) return path as PageType;
  return 'home';
}

function getPathFromPage(page: PageType): string {
  return page === 'home' ? '/' : `/${page}`;
}

const AppContent: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageType>(() => getPageFromPath(window.location.pathname));
  const { openSettings } = useCookies();

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

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPage(getPageFromPath(window.location.pathname));
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useTracking(currentPage);

  const handleNavigate = (page: string) => {
    const pageType = page as PageType;
    setCurrentPage(pageType);
    window.history.pushState(null, '', getPathFromPage(pageType));
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
      case 'impressum':
        return <ImpressumPage />;
      case 'datenschutz':
        return <DatenschutzPage />;
      case 'partners':
        return <PartnersPage />;
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
      <DatabaseNotification />
      <HubSpotIntegration />
    </div>
  );
};

function App() {
  return (
    <CookieProvider>
      <AppContent />
    </CookieProvider>
  );
}

export default App;
