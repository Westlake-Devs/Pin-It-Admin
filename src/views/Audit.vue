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
      <td :colspan="headers.length">
        <br/>
        <v-card flat outlined>
          <v-card-title>Author</v-card-title>
          <v-card-subtitle>
            name: {{ item.userName }}<br/>
            uid: {{ item.owner }}
          </v-card-subtitle>
          <v-card-title>Post</v-card-title>
          <v-card-subtitle>
            action: {{ item.action }}<br/>
            title: {{ item.title }}<br/>
            description: {{ item.description }}
          </v-card-subtitle>
          <v-card-title>Post Coordinates</v-card-title>
          <v-card-subtitle>
            latitude: {{ item.userLat }}<br/>
            longitude: {{ item.userLong }}
          </v-card-subtitle>
          <v-card-title>Images</v-card-title>
          <v-card-subtitle>
            <PostImages :post='item'></PostImages>
          </v-card-subtitle>
        </v-card>
        <br/>
      </td>
    </template>

  </v-data-table>
</template>

<script>
import manager from '@/api/firebase/post-manager.js'
import PostImages from '@/components/PostImages.vue'

export default {
  async created () {
    await this.loadPosts()
  },
  components: { PostImages },
  data () {
    return {
      loading: false,
      images: ['https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg'],
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
