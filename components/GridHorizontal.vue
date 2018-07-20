<template>
  <div class="grid">
    <template
      v-for="(group, decade) in photos"
    >
      <nuxt-link
        class="grid__item grid__item--year"
        :key="decade"
        :to="{name: 'time-decade', params: { decade: decade } }"
      >
        <span class="grid__text">
          {{ decade }}
        </span>
      </nuxt-link>
      <nuxt-link
        v-tooltip.right-start="{ content: getImageCaption(photo), popperOptions: { style: { background: 'red' } } } "
        class="grid__item grid__item--photo"
        v-for="photo in group"
        :key="photo.photo.fields.title"
        :style="{ backgroundImage: `url('${photo.photo.fields.file.url}?w=200')`}"
        :to="{ name: 'photo-id', params: { id: photo.id } }"
      >
      </nuxt-link>
    </template>
    <div class="overlay"></div>
  </div>
</template>

<script>
export default {
  props: {
    photos: { type: Object },
  }
}
</script>

<style lang="scss">
.grid {
  position: relative;
  margin-top: -1.5rem;
  margin-left: -1.5rem;
}

.grid__item {
  display: inline-block;
  width: 7.5rem;
  margin-top: 1.5rem;
  margin-left: 1.5rem;
  height: 7.5rem;
  background-color: #fff;
  background-size: cover;
  background-position: center;
  -webkit-backface-visibility: hidden;
}

.grid__item--year {
  position: relative;
}

.grid__item--photo {
  border: 1px solid #fff;

  &:hover, &:active, &:focus {
    z-index: 1;
    border-color: $red;

    & ~ .overlay {
      opacity: 1;
    }
  }
}

.grid__text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  letter-spacing: 0.063em;
  color: #000;
  text-decoration: none;
}

.tooltip {
  margin: 0 1.5625rem;
  padding: 0.5rem;
  background: #fff;
  border: 1px solid $red;
  font-size: 0.875rem;
  color: $red;
}

@media (min-width: 40rem) {
  .tooltip {
    padding: 0.75rem;
  }
}

@supports (display: grid){
  .grid {
    display: grid;
    grid-gap: 1.5rem;
    gap: 1.5rem;
    grid-template-columns: repeat(auto-fill, minmax(5rem, 1fr));
    justify-content: flex-start;
    margin: 0;

    &::before {
      content: '';
      position: absolute;
      top: 50%;
      width: calc(100% + 1rem);
      height: 1px;
      grid-row: 1 / 1;
      background-color: $red;
      z-index: -1;
    }
  }

  .grid__item {
    margin: 0;
    width: auto;
    padding-top: 100%;
    height: auto;
  }

  @media (min-width: 48em) {
    .grid {
      &::before {
        width: calc(100% + 2rem)
      }

      &::after {
        content: '';
        position: absolute;
        top: 50%;
        right: -2rem;
        grid-row: 1 / 1;
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 0.313rem 0 0.313rem 1rem;
        border-color: transparent transparent transparent $red;
        transform: translateY(-50%);
      }
    }
  }

  @media (min-width: 62em) {
    .grid {
      grid-template-columns: repeat(auto-fill, minmax(7.5rem, 1fr));

    }
  }

  @media (min-width: 85em) {
    .tooltip {
      min-width: 8.125rem;
      min-height: 8.125rem;
      max-width: 17.75rem;
    }
  }
}
</style>
