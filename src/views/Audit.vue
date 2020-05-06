<template>
    <div class="container">
    </div>
</template>

<script>
import manager from '@/api/firebase/post-manager.js'

export default {
  async created () {
    this.pendinPosts = await manager.fetchPendingPosts()
  },
  data () {
    return {
      pendinPosts: null
    }
  },
  methods: {
  }
}
</script>

<style scoped>

</style>
