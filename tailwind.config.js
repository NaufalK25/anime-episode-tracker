/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans-serif']
      },
      gridTemplateColumns: {
        20: 'repeat(20, minmax(0, 1fr))'
      }
    }
  },
  plugins: []
};
