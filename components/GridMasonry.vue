<template>
  <div class="masonry">
    <nuxt-link
      class="masonry__link"
      v-for="photo in photos"
      :key="photo.fields.photo.fields.title"
      :to="{ name: 'photo-id', params: { id: photo.sys.id } }"
    >
      <figure class="masonry__item">
        <img class="masonry__image" :src="`${photo.fields.photo.fields.file.url}?w=500`" />
        <figcaption class="masonry__caption" v-html="getImageCaption(photo.fields)">
        </figcaption>
      </figure>
    </nuxt-link>
    <div class="overlay"></div>
  </div>
</template>

<script>
export default {
  props: {
    photos: { type: Array },
  }
}
</script>

<style lang="scss">
.masonry {
  position: relative;
  column-gap: 1.5rem;
  column-width: 18rem;
}

.masonry__link {
  position: relative;
  display: block;

  &:hover, &:active, &:focus {
    z-index: 1;

    .masonry__caption {
      transform: none;
    }

    & ~ .overlay {
      opacity: 1;
    }
  }
}

.masonry__item {
  position: relative;
  margin: 0;
  margin-bottom: 1.5rem;
  overflow:hidden
}

.masonry__caption {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 0.75rem;
  border: 1px solid $red;
  font-size: 0.875rem;
  background-color: #fff;
  color: $red;
  transform: translateY(100%);
  transition: all 0.3s ease;
}

</style>
