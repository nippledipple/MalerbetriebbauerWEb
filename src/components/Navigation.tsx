import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentPage, onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', href: '/' },
    { id: 'about', label: 'Über uns', href: '/about' },
    { id: 'services', label: 'Leistungen', href: '/services' },
    { id: 'partners', label: 'Partner', href: '/partners' },
    { id: 'contact', label: 'Kontakt', href: '/contact' },
  ];

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, pageId: string) => {
    e.preventDefault();
    onNavigate(pageId);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <a
            href="/"
            className="flex items-center space-x-3 cursor-pointer"
            onClick={(e) => handleClick(e, 'home')}
          >
            <img
              src="/e48083a5-33c2-4e82-9bfb-10683f40cf8d-removebg-preview.png"
              alt="Malerbetrieb Bauer Logo"
              className="h-16 w-auto object-contain"
            />
            <span className="text-2xl font-bold text-[#585858]">
              Malerbetrieb Bauer
            </span>
          </a>

          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => handleClick(e, item.id)}
                className={`font-medium transition-colors hover:text-[#ffd900] ${
                  currentPage === item.id ? 'text-[#ffd900]' : 'text-[#585858]'
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>

          <button
            className="md:hidden text-[#585858]"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => {
                    handleClick(e, item.id);
                    setIsMenuOpen(false);
                  }}
                  className={`text-left font-medium transition-colors hover:text-[#ffd900] ${
                    currentPage === item.id ? 'text-[#ffd900]' : 'text-[#585858]'
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
