<template>
  <items-list
    title = "Public Posts"
    :items="publicPosts"
    :loading="loading"
    :error="error"
    :requestApproval="false"
    :headers="headers"
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
      publicPosts: [],
      headers: [
        {
          text: 'Title',
          value: 'title'
        },
        {
          text: 'Date',
          value: 'displayDate'
        },
        {
          text: 'Delete',
          value: 'delete',
          sortable: false
        }
      ]
    }
  },
  computed: {
    currentUser () {
      return this.$store.state.currentUser
    }
  },
  watch: {
    currentUser: function (val) {
      if (!val) this.publicPosts = null
    }
  },
  methods: {
    async loadPosts () {
      this.loading = true
      this.publicPosts = await manager.fetchPosts(false)
      this.loading = false
    },
    removeFromRenderedList (item) {
      const index = this.publicPosts.indexOf(item)
      this.publicPosts.splice(index, 1)
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
      await this.processItem(item, manager.deletePublicPost)
    },
    approveItem (item) {}
  }
}
</script>
