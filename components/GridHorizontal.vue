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
      <div
        class="grid__item"
        v-for="photo in group"
        :key="photo.photo.fields.title"
        :style="{ backgroundImage: `url('${photo.photo.fields.file.url}?w=200')`}"
      >
      </div>
    </template>
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

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    width: calc(100% + 1rem);
    height: 1px;
    grid-row: 1 / 1;
    background-color: $red;
  }
}

.grid__item {
  position: relative;
  display: inline-block;
  width: 7.5rem;
  margin-top: 1.5rem;
  margin-left: 1.5rem;
  height: 7.5rem;
  background-color: #fff;
  background-size: cover;
  background-position: center;
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

@media (min-width: 40rem) {
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

@supports (display: grid){
  .grid {
    display: grid;
    grid-gap: 1.5rem;
    gap: 1.5rem;
    grid-template-columns: repeat(auto-fill, minmax(5rem, 1fr));
    justify-content: flex-start;
    margin: 0;
  }

  .grid__item {
    margin: 0;
    width: auto;
    padding-top: 100%;
    height: auto;
  }

  @media (min-width: 62em) {
    .grid {
      grid-template-columns: repeat(auto-fill, minmax(7.5rem, 1fr));
    }
  }
}
</style>
