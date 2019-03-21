const { createClient } = require("./plugins/contentful");

const client = createClient();

// Probably shouldn't be here, but too lazy to sort this out at the moment
function slugify(text) {
  return text.toLowerCase().replace(" ", "-");
}

module.exports = {
  /*
   ** Headers of the page
   */
  head: {
    title: "Before Mao - A Family Archive",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "Nuxt.js project" }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css?family=Open+Sans:400,700"
      }
    ]
  },
  /*
   ** Customize the progress bar color
   */
  loading: { color: "#ed2124" },
  /*
   ** Build configuration
   */
  build: {
    vendor: ["contentful"],
    /*
     ** Run ESLint on save
     */
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/
        });
      }
    }
  },
  env: {
    CTF_SPACE_ID: process.env.CTF_SPACE_ID,
    CTF_CDA_ACCESS_TOKEN: process.env.CTF_CDA_ACCESS_TOKEN
  },
  modules: [["nuxt-sass-resources-loader", ["@/assets/variables.scss"]]],
  plugins: [{ src: "~/plugins/v-tooltip.js" }, { src: "~/plugins/helpers.js" }],
  generate: {
    routes: function() {
      return Promise.all([
        client.getEntries({
          content_type: "person"
        }),
        client.getEntries({
          content_type: "place"
        }),
        client.getEntries({
          content_type: "photo"
        })
      ]).then(([people, places, photos]) => {
        return [
          ...people.items.map(
            person => `/person/${slugify(person.fields.name)}`
          ),
          ...places.items.map(entry => `/place/${slugify(entry.fields.name)}`),
          ...photos.items.map(entry => `/photo/${entry.sys.id}`),
          // Using a set here lets us remove duplicate items. Neat!
          ...Array.from(
            new Set(photos.items.map(entry => entry.fields.decade))
          ).map(year => `/time/${year}`)
        ];
      });
    }
  }
};
