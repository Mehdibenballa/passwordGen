/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center : true,
      default :'1rem',
      sm :'2rem',
      lg :'3rem',
      xl :'4rem',
    },
    extend: {
      colors: {
        gen: '#83818d',
        fisrt : '#0c0b10',
          green: '#a3ffae',
          yellow: '#f8cb63',
          orange: '#fb7a56',
          red: '#f74b4b',
          dark: '#e7e6eb',
          darker: '#807c92',
          dark: '#24232b',
          darker: '#131219',
      },
    },
    },
  plugins: [],
}

