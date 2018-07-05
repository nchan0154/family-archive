<template>
  <GridMasonry :photos="photos" />
</template>

<script>
import {createClient} from '~/plugins/contentful.js';
import constants from '~/constants/data.js';
import {deslugify} from '~/assets/helpers.js'
import GridMasonry from '~/components/GridMasonry.vue';

const client = createClient();

export default {
  validate ({ params }) {
    return constants.places.indexOf(deslugify(params.name)) > -1;
  },
  asyncData ({ env, route }) {
      return client.getEntries({
      'content_type': 'photo',
      'fields.place.sys.contentType.sys.id': 'place',
      'fields.place.fields.name': deslugify(route.params.name)
    }).then((photos) => {
      return {
        photos: photos.items,
      }
    }).catch(console.error);
  },
  components: {
    GridMasonry
  }
}
</script>
