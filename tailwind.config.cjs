/* eslint-env node */
/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  safelist: [
    // grayBlue 主題
    'text-grayBlue-800',
    'text-grayBlue-500',
    'bg-grayBlue-100',
    'bg-grayBlue-300',
    'bg-grayBlue-500',
    'hover:bg-grayBlue-500',
    'focus-visible:border-grayBlue-500',
    'border-grayBlue-500',
    'focus:ring-grayBlue-500',
    // blueGreen 主題
    'text-blueGreen-800',
    'text-blueGreen-500',
    'bg-blueGreen-100',
    'bg-blueGreen-300',
    'bg-blueGreen-500',
    'hover:bg-blueGreen-500',
    'focus-visible:border-blueGreen-500',
    'border-blueGreen-500',
    'focus:ring-blueGreen-500',
  ],
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
