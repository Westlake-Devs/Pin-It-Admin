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
          <v-card-title>
            Pending Action: {{ item.action.toUpperCase() }}
          </v-card-title>
          <v-card-subtitle>
            User {{ item.userName }} is attempting to {{ item.action }} post {{ item.id }}.<br/>
            The following will become public if approved.
          </v-card-subtitle>
          <v-divider/>
          <v-card-title>Post Details</v-card-title>
          <v-card-subtitle>
            title: {{ item.title }}<br/>
            author: {{ item.userName }}<br/>
            description: {{ item.description }}<br/>
            coordinates: <a :href="mapsURL(item.userLat, item.userLong)" target="_blank">({{ item.userLat }}, {{ item.userLong }})</a><br/>
          </v-card-subtitle>
          <div v-if="item.action != 'edit'">
            <v-card-title>Post Images</v-card-title>
            <v-card-subtitle>
              <PostImages :post="item"></PostImages>
            </v-card-subtitle>
          </div>
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
          value: 'displayDate'
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
    mapsURL (lat, long) {
      return `https://www.google.com/maps/search/?api=1&query=${lat},${long}`
    },
    async deleteItem (item) {
      await manager.rejectPendingPost(item)
      const index = this.pendingPosts.indexOf(item)
      this.pendingPosts.splice(index, 1)
    },
    async approve (item) {
      await manager.approvePendingPost(item)
      const index = this.pendingPosts.indexOf(item)
      this.pendingPosts.splice(index, 1)
    }
  }
}
</script>

<style scoped>

</style>
