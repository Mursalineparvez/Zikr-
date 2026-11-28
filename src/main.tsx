import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { ErrorBoundary } from './components/ErrorBoundary';
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

  // Register Service Worker non-blockingly and auto-apply updates cleanly
  if ('serviceWorker' in navigator) {
    const registerSW = () => {
      const hadController = Boolean(navigator.serviceWorker.controller);
      let reloading = false;
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (!hadController || reloading) return;
        try {
          if (sessionStorage.getItem('zikrmate_sw_reloaded_v46') === '1') return;
          sessionStorage.setItem('zikrmate_sw_reloaded_v46', '1');
        } catch {}
        reloading = true;
        window.location.reload();
      });

      navigator.serviceWorker
        .register('/sw.js', { updateViaCache: 'none' })
        .then((reg) => {
          if (reg.waiting) {
            reg.waiting.postMessage({ type: 'SKIP_WAITING' });
          }
          reg.addEventListener('updatefound', () => {
            const installing = reg.installing;
            if (!installing) return;
            installing.addEventListener('statechange', () => {
              if (installing.state === 'installed' && navigator.serviceWorker.controller) {
                installing.postMessage({ type: 'SKIP_WAITING' });
              }
            });
          });
          reg.update().catch(() => {});
        })
        .catch(() => {});
    };

    window.addEventListener('load', () => {
      if (typeof (window as any).requestIdleCallback === 'function') {
        (window as any).requestIdleCallback(registerSW, { timeout: 2500 });
      } else {
        setTimeout(registerSW, 800);
      }
    });
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>
);
