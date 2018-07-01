<template>
  <main class="container">
    <div>
      <app-logo/>
      <h1 class="title">
        family-archive
      </h1>
      <h2 class="subtitle">
        Nuxt.js project
      </h2>
      <div class="links">
        <a
          href="https://nuxtjs.org/"
          target="_blank"
          class="button--green">Documentation</a>
        <a
          href="https://github.com/nuxt/nuxt.js"
          target="_blank"
          class="button--grey">GitHub</a>
      </div>
    </div>
  </main>
</template>

<script>
import {createClient} from '~/plugins/contentful.js';
import AppLogo from '~/components/AppLogo.vue';

const client = createClient();


export default {
  asyncData ({env}) {
    return Promise.all([
      client.getEntries({
        'content_type': 'photo',
      }),
    ]).then(([photos]) => {
      const items = photos.items.map(({fields}) => fields);

      let groupedByDecade = {};
      items.map(item => {
        let list = groupedByDecade[item.decade];

        if(list){
            list.push(item);
        } else{
           groupedByDecade[item.decade] = [item];
        }
      });

      return {
        photos: groupedByDecade,
      }
    }).catch(console.error)
  },
  components: {
    AppLogo
  }
}
</script>

<style>

</style>
