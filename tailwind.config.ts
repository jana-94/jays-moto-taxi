import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#F2A900',
          dark: '#B97800',
          light: '#FFD166'
        },
        ink: {
          DEFAULT: 'var(--ink)',
          light: 'var(--ink-light)',
          softer: 'var(--ink-softer)'
        }
      },
      backgroundColor: {
        base: 'var(--bg)',
        'base-light': 'var(--base-light)',
        card: 'var(--card-bg)'
      },
      textColor: {
        base: 'var(--text)'
      },
      borderColor: {
        base: 'var(--base-border)',
        card: 'var(--card-border)'
      },
      boxShadow: {
        soft: '0 10px 25px rgba(0,0,0,0.08)'
      },
      backgroundImage: {
        'grid-dark':
          'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.06) 1px, transparent 0)',
        'grid-light':
          'radial-gradient(circle at 1px 1px, rgba(0,0,0,0.06) 1px, transparent 0)'
      }
    }
  },
  plugins: []
};

export default config;
