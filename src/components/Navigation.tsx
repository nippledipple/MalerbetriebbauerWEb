import React, { useState } from 'react';
import { Menu, X, User, LogOut, Edit } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import LoginModal from './LoginModal';

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentPage, onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { user, signOut } = useAuth();

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'Über uns' },
    { id: 'services', label: 'Leistungen' },
    { id: 'contact', label: 'Kontakt' },
  ];

  const handleSignOut = async () => {
    try {
      await signOut();
      onNavigate('home');
    } catch (error) {
      console.error('Fehler beim Abmelden:', error);
    }
  };

  return (
    <>
      <nav className="bg-gradient-to-r from-[#1a1f3a] via-[#0a0e27] to-[#1a1f3a] shadow-lg border-b-2 border-[#ffd700] sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <div
              className="flex items-center space-x-3 cursor-pointer group"
              onClick={() => onNavigate('home')}
            >
              <img
                src="/e48083a5-33c2-4e82-9bfb-10683f40cf8d-removebg-preview.png"
                alt="Malerbetrieb Bauer Logo"
                className="h-16 w-auto object-contain drop-shadow-[0_0_10px_rgba(255,215,0,0.5)]"
              />
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-[#ffd700] new-year-text">
                  Malerbetrieb Bauer
                </span>
                <span className="text-xs text-[#ffd700]/80 font-semibold">Frohes Neues Jahr 2026!</span>
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-6">
              {user && (
                <div className="flex items-center space-x-2 px-3 py-1.5 bg-gradient-to-r from-[#ffd700] to-[#f0c419] text-[#1a1f3a] rounded-full text-sm font-medium shadow-lg">
                  <Edit size={16} />
                  <span>Bearbeitungsmodus</span>
                </div>
              )}
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`font-medium transition-all hover:text-[#ffd700] hover:scale-110 ${
                    currentPage === item.id ? 'text-[#ffd700] scale-110' : 'text-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}

              {user ? (
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => onNavigate('admin')}
                    className="flex items-center space-x-2 text-white hover:text-[#ffd700] transition-all hover:scale-110"
                  >
                    <User size={20} />
                    <span>Dashboard</span>
                  </button>
                  <button
                    onClick={handleSignOut}
                    className="flex items-center space-x-2 text-white hover:text-[#ffd700] transition-all hover:scale-110"
                  >
                    <LogOut size={20} />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="flex items-center space-x-2 text-white hover:text-[#ffd700] transition-all hover:scale-110"
                >
                  <User size={20} />
                  <span>Login</span>
                </button>
              )}
            </div>

            <button
              className="md:hidden text-[#ffd700]"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {isMenuOpen && (
            <div className="md:hidden pb-4">
              <div className="flex flex-col space-y-3">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      onNavigate(item.id);
                      setIsMenuOpen(false);
                    }}
                    className={`text-left py-2 px-4 rounded transition-colors ${
                      currentPage === item.id
                        ? 'bg-gradient-to-r from-[#ffd700] to-[#f0c419] text-[#1a1f3a] font-semibold'
                        : 'text-white hover:bg-[#1a1f3a]/50'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}

                {user ? (
                  <>
                    <button
                      onClick={() => {
                        onNavigate('admin');
                        setIsMenuOpen(false);
                      }}
                      className="text-left py-2 px-4 rounded text-white hover:bg-[#1a1f3a]/50"
                    >
                      Dashboard
                    </button>
                    <button
                      onClick={() => {
                        handleSignOut();
                        setIsMenuOpen(false);
                      }}
                      className="text-left py-2 px-4 rounded text-white hover:bg-[#1a1f3a]/50"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => {
                      setShowLoginModal(true);
                      setIsMenuOpen(false);
                    }}
                    className="text-left py-2 px-4 rounded text-white hover:bg-[#1a1f3a]/50"
                  >
                    Login
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </>
  );
};

export default Navigation;
