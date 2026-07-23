/** @type {import('tailwindcss').Config} */
// Usa el preset compartido (@ledge/ui) y añade SOLO lo propio de esta marca.
const preset = require('@ledge/ui/tailwind-preset.cjs');

module.exports = {
  presets: [preset],
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
    // ¡Importante! Escanea también los Legos compartidos para generar sus clases.
    '../../packages/ui/src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
