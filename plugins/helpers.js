import Vue from 'vue';
import { slugify, deslugify } from '~/assets/helpers.js';

Vue.mixin({
  methods: {
    getImageCaption: function (photo) {
      let descriptionParts = [];
      if (photo.description) descriptionParts.push(photo.description);
      if (photo.year) {
        descriptionParts.push(photo.year);
      } else {
        descriptionParts.push(photo.decade + 's')
      }
      if (photo.place) {
        descriptionParts.push(photo.place.fields.name + ', ' + photo.place.fields.country);
      }
      return descriptionParts.join('<br />');
    },
    slugify,
    deslugify
  }
})
