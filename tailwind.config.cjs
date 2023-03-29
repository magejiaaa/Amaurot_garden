/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        grayBlue: {
          300: '#92a7c7',
          500: '#5d7dac',
          800: '#374c6c',
        }
      },
      fontFamily: {
        default: [ 'Rubik', '"Noto Sans TC"', '"M PLUS Rounded 1c"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
