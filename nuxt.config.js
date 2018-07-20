module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'Before Mao - A Family Archive',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Open+Sans:400,700'},
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#ed2124' },
  /*
  ** Build configuration
  */
  build: {
    vendor: ['contentful'],
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
  },
  env: {
    CTF_SPACE_ID: process.env.CTF_SPACE_ID,
    CTF_CDA_ACCESS_TOKEN: process.env.CTF_CDA_ACCESS_TOKEN,
  },
  modules: [
    ['nuxt-sass-resources-loader', [
        '@/assets/variables.scss',
    ]],
  ],
  plugins: [
    { src: '~/plugins/v-tooltip.js' },
    { src: '~/plugins/helpers.js' },
  ],
}
