<template>
  <main class="container">
    <GridHorizontal :photos="photos" />
  </main>
</template>

<script>
import {createClient} from '~/plugins/contentful.js';
import GridHorizontal from '~/components/GridHorizontal.vue';

const client = createClient();

export default {
  asyncData ({env, route}) {
    return Promise.all([
      client.getEntries({
        'content_type': 'photo',
        'fields.decade': route.params.decade,
      }),
    ]).then(([photos]) => {
      const items = photos.items.map(({fields, sys}) => {
        fields.id = sys.id;
        return fields;
      });

      let decadePhotos = {};
      decadePhotos[route.params.decade] = items;

      return {
        photos: decadePhotos,
      }
    }).catch(console.error)
  },
  components: {
    GridHorizontal
  }
}
</script>
