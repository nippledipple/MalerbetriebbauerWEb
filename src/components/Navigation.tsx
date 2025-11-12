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
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <div
              className="flex items-center space-x-3 cursor-pointer"
              onClick={() => onNavigate('home')}
            >
              <img
                src="/e48083a5-33c2-4e82-9bfb-10683f40-removebg-preview.png"
                alt="Malerbetrieb Bauer Logo"
                className="h-16 w-auto object-contain"
              />
              <span className="text-2xl font-bold text-[#585858]">
                Malerbetrieb Bauer
              </span>
            </div>

            <div className="hidden md:flex items-center space-x-6">
              {user && (
                <div className="flex items-center space-x-2 px-3 py-1.5 bg-[#ffd900] text-[#585858] rounded-full text-sm font-medium">
                  <Edit size={16} />
                  <span>Bearbeitungsmodus</span>
                </div>
              )}
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`font-medium transition-colors hover:text-[#ffd900] ${
                    currentPage === item.id ? 'text-[#ffd900]' : 'text-[#585858]'
                  }`}
                >
                  {item.label}
                </button>
              ))}

              {user ? (
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => onNavigate('admin')}
                    className="flex items-center space-x-2 text-[#585858] hover:text-[#ffd900] transition-colors"
                  >
                    <User size={20} />
                    <span>Dashboard</span>
                  </button>
                  <button
                    onClick={handleSignOut}
                    className="flex items-center space-x-2 text-[#585858] hover:text-[#ffd900] transition-colors"
                  >
                    <LogOut size={20} />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="flex items-center space-x-2 text-[#585858] hover:text-[#ffd900] transition-colors"
                >
                  <User size={20} />
                  <span>Login</span>
                </button>
              )}
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
                  <button
                    key={item.id}
                    onClick={() => {
                      onNavigate(item.id);
                      setIsMenuOpen(false);
                    }}
                    className={`text-left py-2 px-4 rounded transition-colors ${
                      currentPage === item.id
                        ? 'bg-[#ffd900] text-white'
                        : 'text-[#585858] hover:bg-gray-100'
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
                      className="text-left py-2 px-4 rounded text-[#585858] hover:bg-gray-100"
                    >
                      Dashboard
                    </button>
                    <button
                      onClick={() => {
                        handleSignOut();
                        setIsMenuOpen(false);
                      }}
                      className="text-left py-2 px-4 rounded text-[#585858] hover:bg-gray-100"
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
                    className="text-left py-2 px-4 rounded text-[#585858] hover:bg-gray-100"
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
