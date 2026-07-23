/** @type {import('tailwindcss').Config} */
const preset = require('@ledge/ui/tailwind-preset.cjs');

module.exports = {
  presets: [preset],
  content: ['./index.html', './src/**/*.{ts,tsx}', '../../packages/ui/src/**/*.{ts,tsx}'],
  theme: { extend: {} },
  plugins: [],
};
