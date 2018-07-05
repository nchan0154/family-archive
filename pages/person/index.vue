<template>
  <div class="people">
    <nuxt-link
      :to="{name: 'person-name', params: { name: slugify(person.fields.name) } }"
      v-for="person in people"
      :key="person.fields.name"
      class="people__person"
    >
      <div :style="{ backgroundImage: `url('${person.fields.photo.fields.file.url}?w=600')` }" class="people__image"></div>
      <span class="person__name">{{ person.fields.name }}</span>
    </nuxt-link>
    <div class="overlay"></div>
  </div>
</template>

<script>
import {createClient} from '~/plugins/contentful.js';

const client = createClient();

export default {
  asyncData ({ env, route }) {
      return client.getEntries({
      'content_type': 'person',
      'order': 'fields.birthYear'
    }).then((people) => {
      return {
        people: people.items,
      }
    }).catch(console.error);
  }
}
</script>

<style lang="scss">
.people {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  margin-left: -1.5rem;
}

.people__person {
  display: block;
  flex: 0 1 50%;
  margin-bottom: 1.5rem;
  padding-left: 1.5rem;
  text-align: center;
  text-decoration: none;
  color: #000;

  &:hover, &:active, &:focus {
    z-index: 1;

    & ~ .overlay {
      opacity: 1;
    }
  }
}

.people__image {
  margin-bottom: 1rem;
  padding-top: 140%;
  background-size: cover;
}

@media(min-width:48em) {
  .people__person {
    flex: 0 1 25%;
  }
}

</style>
