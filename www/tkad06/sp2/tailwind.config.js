const defaultTheme = require('tailwindcss/defaultTheme')
/*
 ** TailwindCSS Configuration File
 **
 ** Docs: https://tailwindcss.com/docs/configuration
 ** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
 */
module.exports = {
  experimental: {
    applyComplexClasses: true,
  },
  theme: {
    colors: {
      primary: {
        default: defaultTheme.colors.red[400],
        light: defaultTheme.colors.red[200],
      },
      secondary: {
        default: defaultTheme.colors.gray[800],
        light: defaultTheme.colors.gray[200],
      },
      transparent: defaultTheme.colors.transparent,
      white: defaultTheme.colors.white,
      black: defaultTheme.colors.black,
    },
    extend: {
      padding: {
        0.5: '0.125rem',
      },
      margin: {
        0.5: '0.125rem',
      },
      maxWidth: {
        '7xl': '80rem',
        '9xl': '120rem',
      },
      boxShadow: {
        'inner-bottom': 'inset 0px -15px 10px -15px rgba(227,227,227,1)',
      },
      outline: {
        'primary-light': `2px solid ${defaultTheme.colors.red[200]}`,
      },
      animation: {
        shake: 'shake 2s infinite',
      },
      keyframes: {
        shake: {
          '0%': {
            transform: 'rotate(0deg)',
          },
          '10%': {
            transform: 'rotate(14deg)',
          },
          /* The following five values can be played with to make the shaking more or less extreme */
          '20%': {
            transform: 'rotate(-8deg)',
          },
          '30%': {
            transform: 'rotate(14deg)',
          },
          '40%': {
            transform: 'rotate(-4deg)',
          },
          '50%': {
            transform: 'rotate(10deg)',
          },
          '60%': {
            transform: 'rotate(0deg)',
          },
          /* Reset for the last half to pause */
          '100%': {
            transform: 'rotate(0deg)',
          },
        },
      },
    },
  },
  variants: {
    animation: ['responsive', 'motion-safe', 'motion-reduce'],
  },
  plugins: [require('@tailwindcss/forms')],
  purge: {
    // Learn more on https://tailwindcss.com/docs/controlling-file-size/#removing-unused-css
    enabled: process.env.NODE_ENV === 'production',
    content: [
      'components/**/*.vue',
      'layouts/**/*.vue',
      'pages/**/*.vue',
      'plugins/**/*.js',
      'nuxt.config.js',
    ],
  },
}
