module.exports = {
  purge: ['./pages/**/*.js', './components/**/*.js'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {},
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
}