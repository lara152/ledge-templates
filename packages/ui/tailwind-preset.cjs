/**
 * @ledge/ui — Tailwind PRESET (primitivos compartidos).
 *
 * NOTA (interna): aquí viven SOLO los tokens semánticos y la escala compartida.
 * Cada token de color/tipografía apunta a una CSS variable; los VALORES (la paleta
 * y las fuentes de cada marca) los pone cada app en su propio index.css. Así los
 * Legos de @ledge/ui adoptan la identidad de cada app sin tocar este paquete.
 */
module.exports = {
  theme: {
    extend: {
      colors: {
        // Superficies / texto (neutrales por app)
        bg: 'var(--color-bg)',
        surface: 'var(--color-surface)',
        'surface-2': 'var(--color-surface-2)',
        ink: 'var(--color-ink)',
        muted: 'var(--color-muted)',
        line: 'var(--color-line)',
        // Identidad de marca (cada app la define)
        brand: {
          DEFAULT: 'var(--color-brand)',
          fg: 'var(--color-brand-fg)',
        },
        accent: {
          DEFAULT: 'var(--color-accent)',
          fg: 'var(--color-accent-fg)',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        card: 'var(--radius-card)',
        control: 'var(--radius-control)',
      },
      maxWidth: {
        container: 'var(--container-max, 80rem)',
      },
      boxShadow: {
        soft: '0 1px 2px rgba(0,0,0,0.05), 0 12px 32px -16px rgba(0,0,0,0.24)',
        lift: '0 2px 6px rgba(0,0,0,0.06), 0 28px 60px -24px rgba(0,0,0,0.34)',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s cubic-bezier(0.16,1,0.3,1) both',
        'fade-in': 'fade-in 0.8s ease both',
      },
    },
  },
};
