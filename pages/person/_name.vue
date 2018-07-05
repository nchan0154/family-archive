<template>
  <GridMasonry :photos="photos" />
</template>

<script>
import {createClient} from '~/plugins/contentful.js';
import constants from '~/constants/data.js';
import {deslugify} from '~/assets/helpers.js';
import GridMasonry from '~/components/GridMasonry.vue';

const client = createClient();

export default {
  validate ({ params }) {
    return constants.people.indexOf(deslugify(params.name)) > -1;
  },
  asyncData ({ env, route }) {
    return client.getEntries({
      'content_type': 'person',
      'fields.name': deslugify(route.params.name),
    }).then(person => {
      const id = person.items[0].sys.id;
      return client.getEntries({
        'content_type': 'photo',
        'fields.people.sys.id': id,
      }).then((photos) => {
        return {
          person: person.items[0],
          photos: photos.items,
        }
      })
    }).catch(console.error);
  },
  components: {
    GridMasonry
  }
}
</script>
