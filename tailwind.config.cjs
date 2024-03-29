/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        grayBlue: {
          100: '#E4E9F1',
          300: '#92a7c7',
          500: '#5d7dac',
          800: '#374c6c',
        },
        blueGreen: {
          100: '#E6EFEE',
          300: '#B4D0CC',
          500: '#8EB8B2',
          800: '#4F7D76',
        },
        darkYellow: {
          100: '#FADDC6',
          300: '#F6BB8D',
          500: '#F29550',
          800: '#BC5D10',
        }
      },
      fontFamily: {
        default: [ 'Rubik', '"Noto Sans TC"', '"M PLUS Rounded 1c"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
