const withOpacity = (variable) => ({ opacityValue }) => {
  if (opacityValue !== undefined) {
    return `rgb(var(${variable}) / ${opacityValue})`
  }
  return `rgb(var(${variable}))`
}

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: withOpacity('--color-brand-base-rgb'),
          light: withOpacity('--color-brand-light-rgb'),
          dark: withOpacity('--color-brand-dark-rgb'),
        },
        accent: withOpacity('--color-accent-rgb'),
        text: {
          primary: withOpacity('--color-text-primary-rgb'),
          secondary: withOpacity('--color-text-secondary-rgb'),
          muted: withOpacity('--color-text-muted-rgb'),
        },
        surface: {
          base: 'var(--color-surface)',
          muted: 'var(--color-surface-muted)',
        },
        border: {
          subtle: 'var(--color-border-subtle)',
          strong: 'var(--color-border-strong)',
        },
      },
      backgroundImage: {
        'page-gradient': 'var(--gradient-page)',
        'hero-gradient': 'var(--gradient-hero)',
        'section-spotlight': 'var(--gradient-spotlight)',
        'device-gradient': 'var(--gradient-device)',
        'button-gradient': 'var(--gradient-button)',
      },
      boxShadow: {
        'theme-soft': 'var(--shadow-soft)',
        'theme-strong': 'var(--shadow-strong)',
      },
    },
  },
  plugins: [],
}
