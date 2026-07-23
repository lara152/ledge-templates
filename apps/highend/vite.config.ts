import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

// El código compartido (@ledge/ui) se resuelve por ALIAS a su fuente, así Vite lo
// compila como si fuera del app (una sola copia de React vía dedupe).
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@ledge/ui': fileURLToPath(new URL('../../packages/ui/src', import.meta.url)),
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
    dedupe: ['react', 'react-dom'],
  },
});
