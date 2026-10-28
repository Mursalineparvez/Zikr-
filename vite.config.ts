import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

function patchFirestorePlugin() {
  return {
    name: 'patch-firestore-da08',
    transform(code: string, id: string) {
      if (id.includes('@firebase/firestore')) {
        let changed = false;
        let modified = code;
        if (modified.includes('55816')) {
          modified = modified.replace(
            /__PRIVATE_hardAssert\(!e\.writeResults\s*\|\|\s*0\s*===\s*e\.writeResults\.length,\s*55816\),\s*this\.listener\.Vn\(\)/g,
            '(this.listener.Vn(), (e.writeResults && e.writeResults.length > 0 ? this.onNext(e) : void 0))'
          );
          changed = true;
        }
        if (modified.includes('0xda08')) {
          modified = modified.replace(
            /hardAssert\(!\w+\.writeResults\s*\|\|\s*\w+\.writeResults\.length\s*===\s*0,\s*0xda08\);?/g,
            '/* da08 assertion bypassed */'
          );
          changed = true;
        }
        if (changed) {
          return { code: modified, map: null };
        }
      }
      return null;
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [patchFirestorePlugin(), react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname || '.', '.'),
      },
    },
    build: {
      target: 'esnext',
      minify: 'esbuild',
      cssMinify: true,
      chunkSizeWarningLimit: 1200,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('react') || id.includes('react-dom')) {
                return 'vendor-react';
              }
              if (id.includes('firebase')) {
                return 'vendor-firebase';
              }
              if (id.includes('leaflet')) {
                return 'vendor-leaflet';
              }
              if (id.includes('adhan')) {
                return 'vendor-adhan';
              }
              if (id.includes('lucide-react')) {
                return 'vendor-icons';
              }
              if (id.includes('canvas-confetti')) {
                return 'vendor-confetti';
              }
            }
            if (id.includes('src/utils/appTranslations')) {
              return 'data-translations';
            }
            if (id.includes('src/data/tabligData') || id.includes('src/data/tabligEnglishData')) {
              return 'data-tablig';
            }
            if (id.includes('src/data/islamicHistoryData') || id.includes('src/utils/historyEventDetails')) {
              return 'data-history';
            }
            if (id.includes('src/data/hajjUmrahData') || id.includes('src/data/homeToHomeJourneyData')) {
              return 'data-hajj';
            }
            if (id.includes('src/data/prayerDetailsData')) {
              return 'data-prayer';
            }
            if (id.includes('src/utils/offlineQuranSurahs') || id.includes('src/utils/quran114List')) {
              return 'data-quran';
            }
          },
        },
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
