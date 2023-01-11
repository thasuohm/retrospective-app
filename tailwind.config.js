/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'sanam-deklen': ['var(--font-sanam-deklen)'],
        'five-yearsold': ['var(--font-five-yearsold)'],
      },
    },
  },
  plugins: [],
}
