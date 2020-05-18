<template>
  <items-list
    title = "Pending Posts"
    :items="pendingPosts"
    :loading="loading"
    :error="error"
    @loadPosts="loadPosts"
    @deleteItem="deleteItem"
    @approveItem="approveItem"
  />
</template>

<script>
import manager from '@/api/firebase/post-manager.js'
import ItemsList from '@/components/ItemsList.vue'

export default {
  components: { 'items-list': ItemsList },
  data () {
    return {
      loading: false,
      error: new Error(),
      pendingPosts: []
    }
  },
  methods: {
    async loadPosts () {
      this.loading = true
      this.pendingPosts = await manager.fetchPendingPosts()
      this.loading = false
    },
    removeFromRenderedList (item) {
      const index = this.pendingPosts.indexOf(item)
      this.pendingPosts.splice(index, 1)
    },
    async processItem (item, callback) {
      try {
        await callback(item)
        this.removeFromRenderedList(item)
      } catch (err) {
        this.error = err
        if (err.type === 'PostManagerError') {
          this.removeFromRenderedList(item)
        }
        console.log(`Error, actions to this post could not be accomplished ${err}`)
        console.log(err)
      }
    },
    async deleteItem (item) {
      await this.processItem(item, manager.rejectPendingPost)
    },
    async approveItem (item) {
      await this.processItem(item, manager.approvePendingPost)
    }
  }
}
</script>
