/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: 'var(--color-bg)',
        surface: 'var(--color-surface)',
        'surface-elevated': 'var(--color-surface-elevated)',
        accent: 'var(--color-accent)',
        'accent-hover': 'var(--color-accent-hover)',
        'accent-pressed': 'var(--color-accent-pressed)',
        'accent-soft': 'var(--color-accent-soft)',
        text: 'var(--color-text)',
        'text-muted': 'var(--color-text-muted)',
        'text-dim': 'var(--color-text-dim)',
        'text-ghost': 'var(--color-text-ghost)',
        'text-inverted': 'var(--color-text-inverted)',
        border: 'var(--color-border)',
        'border-strong': 'var(--color-border-strong)',
        'overlay-top': 'var(--color-overlay-top)',
        'overlay-bottom': 'var(--color-overlay-bottom)',
        success: 'var(--color-success)',
        warning: 'var(--color-warning)',
        error: 'var(--color-error)',
      },
      fontFamily: {
        heading: ['Anton', 'sans-serif'],
        'heading-italic': ['Oswald', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
};
