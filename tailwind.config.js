/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Deep maroon / wine palette (Primary: #5C0E1E to #7A1B2E)
        maroon: {
          50: '#fdf5f6',
          100: '#f9e4e7',
          200: '#f2ccd3',
          300: '#e5a5b1',
          400: '#d37184',
          500: '#ba445c',
          600: '#9b2b43',
          700: '#7A1B2E', // Upper primary wine
          800: '#5C0E1E', // Primary deep maroon / wine
          900: '#460814', // Deepest velvet wine
          950: '#2b040b',
          DEFAULT: '#5C0E1E',
        },
        // Warm gold / brass palette (Accent: #C9A15A to #D4AF6A)
        gold: {
          50: '#fdfbf7',
          100: '#f8f1de',
          200: '#f1e2bc',
          300: '#e7cf93',
          400: '#D4AF6A', // Bright brass accent
          500: '#C9A15A', // Primary warm gold
          600: '#b28643',
          700: '#916730',
          800: '#765229',
          900: '#614324',
          DEFAULT: '#C9A15A',
        },
        // Warm ivory / cream palette (Background: #F5EDE0)
        cream: {
          50: '#fdfcf9',
          100: '#FAF6EF', // Light card ivory
          200: '#F5EDE0', // Primary background ivory/cream
          300: '#ece0cb',
          400: '#dec9a8',
          500: '#cbb085',
          600: '#b59667',
          DEFAULT: '#F5EDE0',
        },
        // Charcoal near-black for body text
        charcoal: {
          800: '#2D2021',
          900: '#1E1617', // Near-black body text
          DEFAULT: '#1E1617',
        },
        // Mapped heritage tones for seamless backward compatibility
        terracotta: {
          50: '#fdf5f6',
          100: '#f9e4e7',
          200: '#f2ccd3',
          300: '#e5a5b1',
          400: '#D4AF6A',
          500: '#C9A15A',
          600: '#7A1B2E',
          700: '#5C0E1E',
          800: '#460814',
          900: '#2b040b',
        },
        wood: {
          50: '#fdfcf9',
          100: '#FAF6EF',
          200: '#F5EDE0',
          300: '#ece0cb',
          400: '#b28643',
          500: '#8b642a',
          600: '#68481e',
          700: '#460814',
          800: '#35050e',
          900: '#1E1617',
          950: '#130e0e',
        },
        sand: {
          50: '#fdfbf7',
          100: '#f8f1de',
          200: '#f1e2bc',
          300: '#e7cf93',
          400: '#D4AF6A',
          500: '#C9A15A',
          600: '#b28643',
          700: '#916730',
          800: '#765229',
          900: '#614324',
        },
        forest: {
          50: '#f2f8f4',
          100: '#e1f0e5',
          500: '#2d6a4f',
          600: '#1b4332',
          700: '#143527',
          800: '#0d251b',
          900: '#081811',
        },
        deepteal: {
          50: '#f0f7f6',
          100: '#d7ece8',
          500: '#226b64',
          600: '#17514b',
          700: '#103e39',
          800: '#0b2e2a',
          900: '#071f1c',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['Cormorant Garamond', 'Playfair Display', 'Cinzel', 'serif'],
        display: ['Playfair Display', 'Cormorant Garamond', 'serif'],
        cinzel: ['Cinzel', 'serif'],
        cormorant: ['Cormorant Garamond', 'serif'],
        hindi: ['Noto Sans Devanagari', 'sans-serif'],
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'wave': 'wave 1.5s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s infinite',
      },
      keyframes: {
        wave: {
          '0%, 100%': { transform: 'scaleY(0.4)' },
          '50%': { transform: 'scaleY(1.0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
}
