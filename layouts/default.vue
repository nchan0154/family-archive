<template>
  <div>
    <Header />
    <main tabindex="0" ref="main">
      <!-- Can't just put this on the parent element because it's weird in IE for some reason-->
      <div class="container">
        <nuxt/>
      </div>
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

.overlay {
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
