/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: '#FAFAFA',
        gray: '#737373',
        'low-gray': '#D9D9D9',
        error: { main: '#FF3939', light: '#efcbcb', lighter: '#f1dcdc' },
        purple: {
          main: '#633CFF',
          light: '#BEADFF',
          lighter: '#EFEBFF',
        },
      },
      boxShadow: {
        inputs: 'rgba(99, 60, 255, 0.1) 0px 4px 12px',
        cards: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
      },
      screens: {
        tablet: '550px',
      },
      keyframes: {
        overlayShow: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        contentShow: {
          from: { opacity: '0', transform: 'translate(-50%, -48%) scale(0.96)' },
          to: { opacity: '1', transform: 'translate(-50%, -50%) scale(1)' },
        },
      },
      animation: {
        overlayShow: 'overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
        contentShow: 'contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}
