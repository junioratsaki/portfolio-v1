/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        light: {
          bg: '#ffffff',
          surface: '#f8f9fa',
          text: '#1a202c',
        },
        dark: {
          bg: '#0f172a',
          surface: '#1e293b',
        },
      },
    },
  },
  plugins: [],
};
