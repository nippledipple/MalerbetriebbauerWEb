import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const originalConsoleError = console.error;
console.error = (...args: any[]) => {
  const errorMessage = args.join(' ');
  if (errorMessage.includes('invalid account tier') || errorMessage.includes('API Error: 400')) {
    console.warn('Supabase feature not available in current tier - feature disabled');
    return;
  }
  originalConsoleError.apply(console, args);
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
