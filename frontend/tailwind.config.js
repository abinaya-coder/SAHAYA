/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#070F1E',
          900: '#0B192C',
          800: '#1E293B',
          700: '#334155',
          600: '#475569',
        },
        indigo: {
          950: '#0F172A',
          900: '#1E1B4B',
          800: '#312E81',
          700: '#4338CA',
          600: '#4F46E5',
          500: '#6366F1',
        },
        brand: {
          accent: '#4F46E5',
          dark: '#0B192C',
          light: '#F8FAFC',
          card: '#1E293B',
          border: '#334155'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
