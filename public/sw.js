// Service Worker for Zikr+ PWA (Offline Audio & App Caching)
const CACHE_NAME = 'zikrmate-v6';
const AUDIO_CACHE_NAME = 'zikrmate-audio-v2';

const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon.svg',
  'https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    Promise.all([
      caches.open(CACHE_NAME).then((cache) => {
        return cache.addAll(ASSETS_TO_CACHE).catch(() => {
          // Fallback gracefully if CDNs are blocked during install
        });
      }),
      caches.open(AUDIO_CACHE_NAME)
    ]).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME && key !== AUDIO_CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Helper: Check if request is for Quran Audio or MP3 files
function isAudioOrMediaRequest(request) {
  const url = request.url.toLowerCase();
  return (
    url.endsWith('.mp3') ||
    url.endsWith('.wav') ||
    url.endsWith('.m4a') ||
    url.includes('.mp3?') ||
    url.includes('cdn.islamic.network') ||
    url.includes('mp3quran.net') ||
    url.includes('everyayah.com') ||
    url.includes('api.quran.com/api/v4/verses') ||
    url.includes('api.alquran.cloud') ||
    request.destination === 'audio'
  );
}

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  // 1. Audio & Quran Recitation Requests: CacheFirst strategy with auto-cache
  if (isAudioOrMediaRequest(event.request)) {
    event.respondWith(
      caches.open(AUDIO_CACHE_NAME).then((audioCache) => {
        return audioCache.match(event.request, { ignoreSearch: false }).then((cachedResponse) => {
          if (cachedResponse) {
            // Serve instantly from offline cache storage
            return cachedResponse;
          }

          // Fetch from network, clone and cache for offline listening
          return fetch(event.request)
            .then((networkResponse) => {
              if (
                networkResponse &&
                (networkResponse.status === 200 || networkResponse.type === 'opaque' || networkResponse.type === 'cors')
              ) {
                try {
                  audioCache.put(event.request, networkResponse.clone());
                } catch (e) {
                  // Ignore quota exceeded errors
                }
              }
              return networkResponse;
            })
            .catch(() => {
              // Return a fallback response if completely offline and not in cache
              return new Response(null, { status: 404, statusText: 'Audio Not Cached Offline' });
            });
        });
      })
    );
    return;
  }

  // 2. Standard App Assets - NetworkFirst Strategy with Offline Fallback
  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      })
      .catch(() => {
        return caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) return cachedResponse;
          return caches.match('/');
        });
      })
  );
});
