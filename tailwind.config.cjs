/* eslint-env node */
/** @type {import('tailwindcss').Config} */
const colorVar = (name) => `rgb(var(${name}) / <alpha-value>)`;
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  safelist: [
    // grayBlue 主題
    'text-grayBlue-800',
    'text-grayBlue-500',
    'bg-grayBlue-100',
    'bg-grayBlue-400',
    'bg-grayBlue-500',
    'hover:bg-grayBlue-600',
    'focus-visible:border-grayBlue-500',
    'border-grayBlue-500',
    'focus:ring-grayBlue-500',
    // blueGreen 主題
    'text-blueGreen-800',
    'text-blueGreen-500',
    'bg-blueGreen-100',
    'bg-blueGreen-400',
    'bg-blueGreen-500',
    'hover:bg-blueGreen-600',
    'focus-visible:border-blueGreen-500',
    'border-blueGreen-500',
    'focus:ring-blueGreen-500',
  ],
  theme: {
    extend: {
      colors: {
        white: colorVar("--color-white"),
        black: colorVar("--color-black"),

        grayBlue: {
          50: colorVar("--color-grayBlue-50"),
          100: colorVar("--color-grayBlue-100"),
          200: colorVar("--color-grayBlue-200"),
          300: colorVar("--color-grayBlue-300"),
          400: colorVar("--color-grayBlue-400"),
          500: colorVar("--color-grayBlue-500"),
          600: colorVar("--color-grayBlue-600"),
          700: colorVar("--color-grayBlue-700"),
          800: colorVar("--color-grayBlue-800"),
          900: colorVar("--color-grayBlue-900"),
        },

        blueGreen: {
          50: colorVar("--color-blueGreen-50"),
          100: colorVar("--color-blueGreen-100"),
          200: colorVar("--color-blueGreen-200"),
          300: colorVar("--color-blueGreen-300"),
          400: colorVar("--color-blueGreen-400"),
          500: colorVar("--color-blueGreen-500"),
          600: colorVar("--color-blueGreen-600"),
          700: colorVar("--color-blueGreen-700"),
          800: colorVar("--color-blueGreen-800"),
          900: colorVar("--color-blueGreen-900"),
        },

        darkYellow: {
          50: colorVar("--color-darkYellow-50"),
          100: colorVar("--color-darkYellow-100"),
          200: colorVar("--color-darkYellow-200"),
          300: colorVar("--color-darkYellow-300"),
          400: colorVar("--color-darkYellow-400"),
          500: colorVar("--color-darkYellow-500"),
          600: colorVar("--color-darkYellow-600"),
          700: colorVar("--color-darkYellow-700"),
          800: colorVar("--color-darkYellow-800"),
          900: colorVar("--color-darkYellow-900"),
        }
      },
      fontFamily: {
        default: [ 'Rubik', '"Noto Sans TC"', '"M PLUS Rounded 1c"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
