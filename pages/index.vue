<template>
  <GridHorizontal :photos="photos" />
</template>

<script>
import {createClient} from '~/plugins/contentful.js';
import GridHorizontal from '~/components/GridHorizontal.vue';

const client = createClient();

export default {
  asyncData ({env}) {
    return Promise.all([
      client.getEntries({
        'content_type': 'photo',
      }),
    ]).then(([photos]) => {
      const items = photos.items.map(({fields, sys}) => {
        fields.id = sys.id;
        return fields;
      });

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
    GridHorizontal
  }
}
</script>
