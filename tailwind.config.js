/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'gallery-bg': '#F2F2F0',
        'gallery-text': '#1A1A1A',
        'accent-metal': '#A1A1AA',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      fontWeight: {
        light: '300',
      }
    },
  },
  plugins: [],
}
