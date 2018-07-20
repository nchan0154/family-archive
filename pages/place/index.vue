<template>
  <div class="places">
    <nuxt-link
      class="places__link"
      v-for="place in places"
      :key="place.fields.name"
      :style="{ left: place.fields.left + '%', top: place.fields.top + '%' }"
      :to="{name: 'place-name', params: { name: slugify(place.fields.name) } }"
    >
      <span class="places__label">{{ place.fields.name }}</span>
    </nuxt-link>
    <div class="overlay"></div>
  </div>
</template>

<script>
import {createClient} from '~/plugins/contentful.js';
import slugify from '~/assets/helpers.js';

const client = createClient();

export default {
  asyncData ({ env, route }) {
      return client.getEntries({
      'content_type': 'place',
    }).then((places) => {
      return {
        places: places.items,
      }
    }).catch(console.error);
  }
}
</script>

<style lang="scss">
  .places__link {
    display: block;
    margin-top: 1rem;
    color: $red;
    text-decoration: none;
    transition: none;
  }

  @media (min-width: 62em) {

    .places {
      position: absolute;
      top: 9rem;
      left: 0;
      right: 0;
      padding-top: 46.278%;
      background-image: url('/map.svg');
      background-size: 100% auto;
    }

    .places__link {
      position: absolute;
      margin: 0;
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
      background: $red;
      transform: translate(-.5rem, -.5rem);
      cursor: pointer;

      &:hover, &:active, &:focus {
        z-index: 1;

        .places__label {
          opacity: 1;
        }

        & ~ .overlay {
          opacity: 1;
        }
      }
    }

    .places__label {
      display: inline-block;
      position: absolute;
      left: 50%;
      font-size: 0.875rem;
      white-space: nowrap;
      transform: translate(-50%, -1.5rem);
      color: $red;
      opacity: 0;
      transition: opacity 0.3s ease;
      pointer-events: none;
    }
  }
</style>
