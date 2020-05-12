<template>
    <v-data-table
      :headers="headers"
      sort-by="date"
      :sort-desc="[true]"
      :items="pendingPosts">
      <template v-slot:item.view="{ item }">
        <v-icon
          small
          class="mr-2"
          @click="viewMore(item)"
        >
          mdi-clipboard-account
        </v-icon>
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
    </v-data-table>
</template>

<script>
import manager from '@/api/firebase/post-manager.js'

export default {
  async created () {
    this.pendingPosts = await manager.fetchPendingPosts()
  },
  data () {
    return {
      headers: [
        {
          text: 'Title',
          value: 'title',
          sortable: false
        },
        {
          text: 'Date',
          value: 'timestamp.seconds'
        },
        {
          text: 'View More',
          value: 'view',
          sortable: false
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
      pins: [
        {
          title: 'sssssss',
          timestamp: {
            seconds: 'sksksksksk'
          }
        }
      ],
      pendingPosts: [
      ]
    }
  },
  methods: {
    viewMore (item) {
    },
    deleteItem (item) {
      manager.rejectPendingPost(item)
    },
    approve (item) {
      manager.approvePendingPost(item)
    }
  }
}
</script>

<style scoped>

</style>
