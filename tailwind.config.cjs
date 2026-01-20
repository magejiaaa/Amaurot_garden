/* eslint-env node */
/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: 'class',
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
          100: '#E6EBF3',   // 微微暖一點，避免太冷
          300: '#9FB1CC',
          500: '#6A86B3',
          800: '#3E516E',
        },
        blueGreen: {
          100: '#E8F1F0',
          300: '#BFD8D4',
          500: '#95BEB7',
          800: '#5E8C85',
          900: '#1C2E2A',   // 改成偏冷灰綠黑
        },
        darkYellow: {
          100: '#F3DFC8',
          300: '#EAC39A',
          500: '#D8A66E',   // 降彩度、偏灰
          800: '#A86A2F',
        }
      },
      fontFamily: {
        default: [ 'Rubik', '"Noto Sans TC"', '"M PLUS Rounded 1c"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
