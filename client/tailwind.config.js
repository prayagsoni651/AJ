/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'wingo-green': '#00b8a9',
        'wingo-red': '#f6416c',
        'wingo-violet': '#9c27b0',
        'wingo-bg': '#0f172a',
      }
    },
  },
  plugins: [],
}
