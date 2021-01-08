export default {
  publicRuntimeConfig: {
    axios: {
      browserBaseURL: process.env.GOOGLE_API_URL,
    },
  },
  privateRuntimeConfig: {
    clientId: process.env.GOOGLE_CLIENT_ID,
    axios: {
      baseURL: process.env.GOOGLE_API_URL,
    },
  },
  target: 'static',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'Bookcaser',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          "Manage your Google Books shelves with Bookcase. Discover new literature and keep track of what you're reading. 📖",
      },
    ],
    link: [{ rel: 'icon', href: '/bookcaser-icon.svg' }],
  },

  loading: '~/components/Loader.vue',

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ['~/assets/css/style.css'],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: ['~/plugins/axios', '~/plugins/booksApi', '~/plugins/notifications'],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  router: {
    middleware: ['auth'],
  },

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: ['@nuxtjs/axios', '@nuxtjs/auth-next'],

  auth: {
    strategies: {
      google: {
        codeChallengeMethod: '',
        clientId: process.env.GOOGLE_CLIENT_ID,
        scope: [
          'openid',
          'profile',
          'email',
          'https://www.googleapis.com/auth/books',
        ],
      },
    },
    redirect: {
      login: '/',
      home: '/shelf',
      callback: '/',
      logout: '/',
    },
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},
}
