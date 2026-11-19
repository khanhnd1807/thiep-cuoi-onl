/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ivory: '#FAF7F2',
        champagne: '#F3ECE1',
        linen: '#EAE0D2',
        burgundy: {
          DEFAULT: '#6E1E2B',
          deep: '#4D131D',
          soft: '#8E3545',
        },
        gold: {
          DEFAULT: '#C49A6C',
          light: '#DFC19A',
          dark: '#9A7247',
        },
        espresso: '#2C2220',
        taupe: '#6D605B',
        sage: '#6E7C68',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        script: ['"Dancing Script"', 'cursive'],
        sans: ['"Be Vietnam Pro"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        editorial: '0 24px 60px -18px rgba(44, 34, 32, 0.14)',
        wax: '0 10px 24px -4px rgba(77, 19, 29, 0.45), inset 0 2px 6px rgba(255, 225, 225, 0.35)',
        card: '0 12px 35px -10px rgba(110, 30, 43, 0.08)',
      },
      backgroundImage: {
        'paper-grain':
          'radial-gradient(rgba(196, 154, 108, 0.08) 1px, transparent 0)',
      },
    },
  },
  plugins: [],
};
