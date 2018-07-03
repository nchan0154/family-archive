<template>
  <div>
    <Header />
    <main class="container" tabindex="0" ref="main">
      <nuxt/>
    </main>
  </div>
</template>

<script>
import Header from '~/components/Header.vue';

export default {
  watch: {
    '$route.path': function() {
      this.$refs.main.focus();
    }
  },
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

body {
  margin-bottom: 2rem;
}

*, *:before, *:after {
  box-sizing: border-box;
}

* {
  font-family: "Open Sans", sans-serif;
}

main {
  outline: none;
}

img {
  max-width: 100%;
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
