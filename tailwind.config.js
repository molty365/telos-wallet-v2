/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        telos: {
          purple: '#571AFF',
          cyan: '#00F2FE',
          dark: '#0a0a0f',
          gray: {
            900: '#111118',
            800: '#1a1a24',
            700: '#252532',
            600: '#3a3a4a',
          }
        }
      }
    },
  },
  plugins: [],
}
