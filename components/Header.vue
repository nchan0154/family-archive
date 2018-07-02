<template>
  <header class="site-header">
    <div class="container">
      <h1 class="site-header__brand">
        <nuxt-link class="site-header__title" to="/">Before Mao</nuxt-link>
        <span class="site-header__subtitle">A Family Archive</span>
      </h1>
      <nuxt-link class="site-header__cta" to="/info">info</nuxt-link>
      <nav class="site-header__nav">
        <div class="dropdown">
          <nuxt-link class="site-nav__link" to="/">Time</nuxt-link>
          <ul class="dropdown__list">
            <li
              class="dropdown__item"
              v-for="year in years"
              :key="year"
            >
              <nuxt-link
                class="dropdown__link"
                :to="{name: 'time-year', params: { year: year } }"
              >
                {{ year }}s
              </nuxt-link>
            </li>
          </ul>
        </div>
        <div class="dropdown">
          <nuxt-link class="site-nav__link" to="/person">Person</nuxt-link>
          <ul class="dropdown__list">
            <li
              class="dropdown__item"
              v-for="person in people"
              :key="person"
            >
              <nuxt-link
                class="dropdown__link"
                :to="{name: 'person-name', params: { name: person.toLowerCase() } }"
              >
                {{ person }}
              </nuxt-link>
            </li>
          </ul>
        </div>
        <div class="dropdown">
          <nuxt-link class="site-nav__link" to="/place">Place</nuxt-link>
          <ul class="dropdown__list">
            <li
              class="dropdown__item"
              v-for="place in places"
              :key="place"
            >
              <nuxt-link
                class="dropdown__link"
                :to="{name: 'place-name', params: { name: place.toLowerCase() } }"
              >
                {{ place }}
              </nuxt-link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </header>
</template>

<script>
import constants from '~/constants/data.js';

export default {
  data: function() {
    return {
      years: constants.years,
      people: constants.people,
      places: constants.places,
    }
  }
}

</script>

<style lang="scss">
.site-header {
  padding-top: 2rem;
  padding-bottom: 2rem;
}

.site-header__brand {
  display: inline-block;
  margin: 0;
}

.site-header__title {
  font-size: 2rem;
  font-weight: 700;
  line-height: 1.4;
  text-transform: lowercase;
  text-decoration: none;
  color: #000;

  &:hover, &:active, &:focus {
    color: $red;
  }
}

.site-header__subtitle {
  display: block;
  font-size: 1.125rem;
  font-weight: 400;
}

.site-header__cta {
  float: right;
  margin-top: 0.75rem;
  color: $red;
  font-size: 1.125rem;
  text-decoration: none;

  &:hover, &:active, &:focus {
    opacity: 0.7;
  }
}

.site-header__nav {
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
}

.site-nav__link {
  font-size: 1.125rem;
  text-transform: uppercase;
  text-decoration: none;
  color: #000;

  &:hover, &:active, &:focus, &.nuxt-link-active {
    color: $red;
  }
}

.dropdown__list {
  display: none;
}

@media (min-width: 40em) {
  .site-header {
    padding-top: 4rem;
  }

  .site-header__title {
    font-size: 3rem;
  }

  .site-header__cta {
    margin-top: 1.25rem;
  }

  .site-header__nav {
    display: block;
  }

  .dropdown {
    position: relative;
    display: inline-block;
    z-index: 10;

    &:hover, &:focus-within {
      .dropdown__list {
        opacity: 1;
        visibility: visible;
      }
    }

    &:not(:first-child) {
      margin-left: 2.5rem;
    }
  }

  .dropdown__list {
    position: absolute;
    display: block;
    width: 10rem;
    margin: 0;
    margin-left: -0.75rem;
    padding: 0.75rem;
    list-style: none;
    background-color: rgba(255, 255, 255, 0.8);
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
  }

  .dropdown__link {
    line-height: 1.8;
    color: $red;
    text-decoration: none;
  }
}
</style>
