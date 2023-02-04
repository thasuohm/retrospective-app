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
        'sanam-deklen': ['var(--font-sanam-deklen), var(--font-five-yearsold)'],
        'five-yearsold': [
          'var(--font-five-yearsold), var(--font-sanam-deklen)',
        ],
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
}
