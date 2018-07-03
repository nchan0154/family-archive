<template>
  <figure class="single-photo">
    <div class="single-photo__image-wrapper">
      <img class="single-photo__image" :src="`${photo.fields.photo.fields.file.url}?w=1000`">
    </div>
    <div class="single-photo__text-wrapper">
      <figcaption class="single-photo__caption" v-html="getImageCaption(photo.fields)">
      </figcaption>
      <div class="tags">
        <span class="tags__label">tags:</span>
        <nuxt-link
          :to="{name: 'person-name', params: { name: person.fields.name.toLowerCase() } }"
          class="tags__tag"
          :key="person.fields.name"
          v-for="person in photo.fields.people"
        >
          {{ person.fields.name }}
        </nuxt-link>
        <nuxt-link
          :to="{name: 'time-decade', params: { decade: photo.fields.decade } }"
          class="tags__tag"
        >
          {{ photo.fields.decade }}s
        </nuxt-link>
        <template v-if="photo.fields.place">
          <nuxt-link
            :to="{name: 'place-name', params: { name: photo.fields.place.fields.name.toLowerCase() } }"
            class="tags__tag"
          >
            {{ photo.fields.place.fields.name }}
          </nuxt-link>
        </template>
      </div>
    </div>
  </figure>
</template>

<script>
import {createClient} from '~/plugins/contentful.js';
import GridHorizontal from '~/components/GridHorizontal.vue';

const client = createClient();

export default {
  asyncData ({env, route}) {
    return Promise.all([
      client.getEntries({
        'sys.id': route.params.id,
      }),
    ]).then(([photo]) => {
      return {
        photo: photo.items[0]
      }
    }).catch(console.error)
  },
  components: {
    GridHorizontal
  }
}
</script>

<style lang="scss">
.single-photo {
  margin: 0;
}

.single-photo__image-wrapper {
  text-align: center;
}

.single-photo__image {
  max-width: 100%;
  max-height: 90vh;
}

.single-photo__text-wrapper {
  margin-top: 1rem;
  font-size: 0.875rem;
}

.tags {
  margin-top: 2rem;
}

.tags__label {
  display: block;
  margin-bottom: 0.5rem;
}

.tags__tag {
  display: inline-block;
  margin-right: 0.25rem;
  margin-bottom: 0.25rem;
  padding: 0.125rem 0.25rem;
  color: $red;
  border: 1px solid $red;
  text-decoration: none;
}

@media (min-width: 48em) {
  .single-photo {
    display: flex;
    flex-wrap: wrap;
  }

  .single-photo__image-wrapper {
    flex: 1 1 60%;
  }

  .single-photo__text-wrapper {
    flex: 0 1 17.5rem;
    margin: 0;
    padding-left: 2rem;
  }

  .tags {
    margin-top: 4rem;
  }
}

@media (min-width: 85em) {
  .single-photo__image-wrapper {
    text-align: right;
  }
}

</style>
