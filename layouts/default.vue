<template>
  <div>
    <Header />
    <nuxt/>
  </div>
</template>

<script>
import Header from '~/components/Header.vue';

export default {
  components: {
    Header
  }
}
</script>

<style>
html, body {
  margin: 0;
  line-height: 1.5;
}

*, *:before, *:after {
  box-sizing: border-box;
}

* {
  font-family: "Open Sans", sans-serif;
}

a {
  transition: all 0.3s ease;
}

.container {
  width: 90%;
  max-width: 75rem;
  margin: 0 auto;
}
</style>
