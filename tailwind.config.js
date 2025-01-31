/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#9a1b39', // red color 
        primary50: '#9a1b395e',
        secondary: '#463a85', // blue color
        secondary20: '#463a85a6',
        grey: '#86888a'
      },
      fontFamily: {
        roboto: ["Roboto", "Playwrite HU", "serif"],
      },
    },
  },
  plugins: [],
}