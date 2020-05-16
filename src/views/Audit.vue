<template>
  <v-data-table
    :headers="headers"
    :sort-desc="[true]"
    :items="pendingPosts"
    sort-by="date"
    show-expand
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Pending User Posts</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn depressed class="tertiary" @click="loadPosts()" :loading="loading">
            <span>refresh</span>
            <v-icon right>loop</v-icon>
        </v-btn>
      </v-toolbar>
    </template>

    <template v-slot:item.approve="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="approve(item)"
      >
        mdi-check
      </v-icon>
    </template>
    <template v-slot:item.delete="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="deleteItem(item)"
      >
        mdi-trash-can-outline
      </v-icon>
    </template>
    <template v-slot:expanded-item="{ headers, item }">
      <td :colspan="headers.length">More info about {{ item.title }}</td>
    </template>
  </v-data-table>
</template>

<script>
import manager from '@/api/firebase/post-manager.js'

export default {
  async created () {
    await this.loadPosts()
  },
  data () {
    return {
      loading: false,
      headers: [
        {
          text: 'Title',
          value: 'title'
        },
        {
          text: 'Date',
          value: 'timestamp.seconds'
        },
        {
          text: 'Approve',
          value: 'approve',
          sortable: false
        },
        {
          text: 'Delete',
          value: 'delete',
          sortable: false
        }
      ],
      pendingPosts: [
      ]
    }
  },
  methods: {
    async loadPosts () {
      this.loading = true
      this.pendingPosts = await manager.fetchPendingPosts()
      this.loading = false
    },
    viewMore (item) {
    },
    deleteItem (item) {
      manager.rejectPendingPost(item)
      const index = this.pendingPosts.indexOf(item)
      this.pendingPosts.splice(index, 1)
    },
    approve (item) {
      manager.approvePendingPost(item)
      const index = this.pendingPosts.indexOf(item)
      this.pendingPosts.splice(index, 1)
    }
  }
}
</script>

<style scoped>

</style>
