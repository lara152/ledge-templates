/** @type {import('tailwindcss').Config} */
/*
 * Every color/typography/radius token below points at a CSS variable that is set
 * from site.config.json at render time (see components/BrandStyle.tsx and app/globals.css).
 * A client is fully re-themed by editing config alone — no component or config-in-code edits.
 * Never hardcode a hex value in a component; always use a semantic token from here.
 */
module.exports = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand palette — sourced from config.brand.colors, with fallbacks in globals.css.
        primary: {
          DEFAULT: 'var(--brand-primary)',
          fg: 'var(--brand-primary-fg)',
          soft: 'var(--brand-primary-soft)',
          hover: 'var(--brand-primary-hover)',
        },
        secondary: {
          DEFAULT: 'var(--brand-secondary)',
          fg: 'var(--brand-secondary-fg)',
        },
        accent: {
          DEFAULT: 'var(--brand-accent)',
          fg: 'var(--brand-accent-fg)',
        },
        // Neutral / surface system — derived from a single ink hue.
        ink: {
          DEFAULT: 'var(--ink)',
          muted: 'var(--ink-muted)',
          subtle: 'var(--ink-subtle)',
        },
        surface: {
          DEFAULT: 'var(--surface)',
          raised: 'var(--surface-raised)',
          sunken: 'var(--surface-sunken)',
          contrast: 'var(--surface-contrast)',
        },
        line: 'var(--line)',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        sans: ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        card: 'var(--radius)',
        control: 'calc(var(--radius) * 0.6)',
        pill: '9999px',
      },
      maxWidth: {
        content: '76rem',
        prose: '42rem',
      },
      boxShadow: {
        soft: '0 1px 2px rgba(15, 23, 42, 0.04), 0 8px 24px -12px rgba(15, 23, 42, 0.12)',
        lift: '0 2px 4px rgba(15, 23, 42, 0.05), 0 24px 48px -20px rgba(15, 23, 42, 0.22)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s cubic-bezier(0.22, 1, 0.36, 1) both',
      },
    },
  },
  plugins: [],
};
