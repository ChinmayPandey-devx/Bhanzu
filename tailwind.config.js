/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bhanzu: {
          orange: '#FF6B35',
          'orange-hover': '#FF7A45',
          navy: '#1A2B4C',
          'navy-light': '#223355',
          gray: '#FAFAF8',
        }
      }
    },
  },
  plugins: [],
}
