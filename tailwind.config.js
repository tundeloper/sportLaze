/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#9a1b39', // red color 
        secondary: '#463a85', // blue color
      },
    },
  },
  plugins: [],
}