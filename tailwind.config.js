/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'osd-purple': '#6F2BCC',
        'osd-dark': '#2b017c',
        'osd-cyan': '#01FADA',
      },
      screens: {
        'xs': '380px',
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
