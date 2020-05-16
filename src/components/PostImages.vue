<template>
  <v-card
    outlined=""
    max-width="400"
    :loading="!urls"
    class="grey lighten-3"
  >
    <v-carousel>
      <v-carousel-item
        v-for="(item,i) in urls"
        :key="i"
        :src="item"
        cycle
        hide-delimiter-background
        show-arrows-on-hover
        contain
      ></v-carousel-item>
    </v-carousel>
  </v-card>
</template>

<script>
import manager from '@/api/firebase/post-manager.js'

export default {
  name: 'PostImages',
  props: {
    post: { type: Object, required: true }
  },
  created () {
    this.previewImagesOf(this.post)
  },
  data () {
    return { urls: null }
  },
  methods: {
    async previewImagesOf (post) {
      this.urls = await manager.fetechPostImageURLs(post)
    }
  }
}
</script>
