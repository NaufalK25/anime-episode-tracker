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
        15: 'repeat(15, minmax(0, 1fr))',
        20: 'repeat(20, minmax(0, 1fr))',
        auto: 'auto auto auto'
      }
    }
  },
  plugins: []
};
