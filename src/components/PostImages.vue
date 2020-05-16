<template>
  <div>
    <v-img v-for="img in urls" :src="img" :key="img" max-width="300" contain></v-img>
  </div>
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
      console.log('images loaded')
      console.log(this.urls)
    }
  }
}
</script>
