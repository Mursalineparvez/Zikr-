import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Silently catch and suppress expected WebSocket and Firestore internal assertion messages
if (typeof window !== 'undefined') {
  window.addEventListener('unhandledrejection', (event) => {
    const msg = String(event.reason?.message || event.reason || '');
    if (
      msg.includes('WebSocket') ||
      msg.includes('websocket') ||
      msg.includes('FIRESTORE') ||
      msg.includes('INTERNAL ASSERTION FAILED') ||
      msg.includes('da08')
    ) {
      event.preventDefault();
      event.stopPropagation();
    }
  });

  window.addEventListener('error', (event) => {
    const msg = String(event.message || event.error?.message || event.error || '');
    if (
      msg.includes('WebSocket') ||
      msg.includes('websocket') ||
      msg.includes('FIRESTORE') ||
      msg.includes('INTERNAL ASSERTION FAILED') ||
      msg.includes('da08')
    ) {
      event.preventDefault();
      event.stopPropagation();
    }
  });

  // Register Service Worker non-blockingly during idle time to prevent network contention on launch
  if ('serviceWorker' in navigator) {
    const registerSW = () => {
      navigator.serviceWorker.register('/sw.js', { updateViaCache: 'none' }).catch(() => {});
    };

    window.addEventListener('load', () => {
      if (typeof (window as any).requestIdleCallback === 'function') {
        (window as any).requestIdleCallback(registerSW, { timeout: 2500 });
      } else {
        setTimeout(registerSW, 1200);
      }
    });
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
