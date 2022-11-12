export default {
  mode: 'universal',
  target: 'server',
  head: {
    title: 'Wisuda Oktober ITB 2020',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Website resmi perayaan wisuda oktober 2020 Institut Teknologi Bandung' }
    ],
    link: [
      {
        href:"https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap", 
        rel:"stylesheet"
      },
      { rel: "icon", href: "/img/logo.png" }
    ],
  },
  env: {
    youtubeApiKey: process.env.YOUTUBE_API_KEY
  },
  loading: { color: "#fff" },
  css: [
    "@/assets/scss/main.scss",
    "@/assets/scss/fonts.scss",
  ],
  plugins: [
    "~/plugins/loading",
  ],
  components: true,
  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/google-analytics'
  ],
  modules: [
    [
      '@nuxtjs/firebase',
      {
        config: {
          apiKey: process.env.FIREBASE_API_KEY,
          authDomain: process.env.FIREBASE_AUTH_DOMAIN,
          databaseURL: process.env.FIREBASE_DATABASE_URL,
          projectId: process.env.FIREBASE_PROJECT_ID,
          storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
          messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
          appId: process.env.FIREBASE_APP_ID,
          measurementId: process.env.FIREBASE_MEASUREMENT_ID
        },
        services: {
          firestore: true,
          storage: true,
          auth: true
        }
      }
    ],
    ['nuxt-fontawesome', {
      component: 'fa',
      imports: [
        {
          set: '@fortawesome/free-solid-svg-icons',
          icons: ['faChevronRight','faChevronLeft', 'faTimes', 'faThumbsUp','faBars']
        },
        {
          set: '@fortawesome/free-brands-svg-icons',
          icons: ['faTwitter', 'faInstagram', 'faYoutube','faFacebook']
        }
      ]
    }]
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {},
  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  generate: {
    fallback: true
  },
  build: {
  },
  googleAnalytics: {
    id: process.env.GOOGLE_ANALYTIC_ID,
  }
}
