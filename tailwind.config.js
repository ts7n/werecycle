const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
        fontFamily: {
            cursive: ['Fuzzy Bubbles', ...defaultTheme.fontFamily.serif]
        }
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}
