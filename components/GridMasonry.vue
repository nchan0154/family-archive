<template>
  <div class="masonry">
    <nuxt-link
      class="masonry__link"
      v-for="photo in photos"
      :key="photo.fields.photo.fields.title"
      :to="{ name: 'photo-id', params: { id: photo.sys.id } }"
    >
      <figure class="masonry__item">
        <img class="masonry__image" :src="`${photo.fields.photo.fields.file.url}?w=600`" />
        <figcaption class="masonry__caption" v-html="getImageCaption(photo.fields)">
        </figcaption>
      </figure>
    </nuxt-link>
    <div class="masonry__overlay"></div>
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

    & ~ .masonry__overlay {
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

.masonry__overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.5);
  opacity: 0;
  pointer-events: none;
  transition: all 0.3s ease;
  z-index: 0;
}
</style>
