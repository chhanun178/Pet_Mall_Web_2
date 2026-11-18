/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app/**/*.{vue,js,ts,jsx,tsx}',
    './app.vue',
  ],
  theme: {
    fontFamily: {
      sans: ['"Google Sans"', 'sans-serif'],
    },
    extend: {
      colors: {
        brand: {
          50: '#FFF7ED',
          100: '#FFEDD5',
          200: '#FED7AA',
          300: '#FDBA74',
          400: '#FB923C',
          500: '#F97316',
          600: '#EA580C', // Warm terracotta / artisan orange
          700: '#C2410C',
          800: '#9A3412',
          900: '#7C2D12',
          950: '#431407',
        },
        warm: {
          50: '#FCFAF6',
          100: '#F8F5EE',
          200: '#EFEBE1',
          300: '#DFD9CB',
          400: '#BEB6A2',
          500: '#9C927B',
          600: '#7B725C',
          700: '#5C5443',
          800: '#3E382C',
          900: '#221F18',
        },
        petdark: '#141A23',
      },
      fontFamily: {
        sans: ['"Google Sans"', 'sans-serif'],
        'google-sans': ['"Google Sans"', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 3px 0 rgba(0, 0, 0, 0.04), 0 1px 2px -1px rgba(0, 0, 0, 0.02)',
        'card-hover': '0 4px 12px 0 rgba(0, 0, 0, 0.06)',
      }
    },
  },
  plugins: [],
}
