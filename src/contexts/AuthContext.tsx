import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { localDb } from '../lib/localDb';

interface User {
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const SESSION_KEY = 'auth_session';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        await localDb.init();
        await localDb.initializeDefaultAdmin();

        const sessionData = localStorage.getItem(SESSION_KEY);
        if (sessionData) {
          try {
            const userData = JSON.parse(sessionData);
            setUser(userData);
          } catch (e) {
            localStorage.removeItem(SESSION_KEY);
          }
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const signIn = async (email: string, password: string) => {
    const adminUser = await localDb.getAdminUser(email);

    if (!adminUser) {
      throw new Error('Invalid login credentials');
    }

    const isValid = await localDb.verifyPassword(password, adminUser.passwordHash);

    if (!isValid) {
      throw new Error('Invalid login credentials');
    }

    const userData: User = {
      email: adminUser.email,
      name: adminUser.name,
    };

    localStorage.setItem(SESSION_KEY, JSON.stringify(userData));
    localStorage.setItem('admin_authenticated', 'true');
    setUser(userData);
  };

  const signOut = async () => {
    localStorage.removeItem(SESSION_KEY);
    localStorage.removeItem('admin_authenticated');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
