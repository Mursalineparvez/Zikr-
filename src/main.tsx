import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Silently catch and suppress expected Vite preview WebSocket HMR connection messages
if (typeof window !== 'undefined') {
  window.addEventListener('unhandledrejection', (event) => {
    const msg = event.reason?.message || event.reason?.toString() || '';
    if (msg.includes('WebSocket') || msg.includes('websocket')) {
      event.preventDefault();
      event.stopPropagation();
    }
  });

  window.addEventListener('error', (event) => {
    const msg = event.message || event.error?.message || '';
    if (msg.includes('WebSocket') || msg.includes('websocket')) {
      event.preventDefault();
      event.stopPropagation();
    }
  });

  // Register Service Worker for Instant App Shell & Audio Caching
  if ('serviceWorker' in navigator) {
    const registerSW = () => {
      navigator.serviceWorker.register('/sw.js').catch(() => {});
    };
    if (document.readyState === 'complete') {
      registerSW();
    } else {
      window.addEventListener('load', registerSW);
    }
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
