<template>
    <div class="container">
    </div>
</template>

<script>
import manager from '@/api/firebase/post-manager.js'

export default {
  async created () {
    this.pendingPosts = await manager.fetchPendingPosts()
  },
  data () {
    return {
      pendingPosts: null
    }
  },
  methods: {
  }
}
</script>

<style scoped>

</style>
