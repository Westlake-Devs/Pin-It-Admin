<template>
  <panel title="Recently Viewed Songs">
    <v-data-table
      :headers="headers"
      :sort-by="[date]"
      :sort-desc="[true]"
      :items="pins">
      <template v-slot:item.actions="{ item }">
        <v-icon
          small
          class="mr-2"
          @click="viewMore(item)"
        >
          mdi-clipboard-account
        </v-icon>
        <v-icon
          small
          @click="deleteItem(item)"
        >
          mdi-delete
        </v-icon>
      </template>
      <template v-slot:item.visible="{ item }">
        <v-simple-checkbox v-model="item.glutenfree"></v-simple-checkbox>
      </template>
    </v-data-table>
  </panel>
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
          value: 'date'
        },
        {
          text: 'Actions',
          value: 'actions',
          sortable: false
        },
        {
          text: 'Visibility',
          value: 'visible',
          sortable: false
        }
      ],
      pins: [
        {
          title: 'sssssss',
          date: 'sksksksksk'
        }
      ],
      pendingPosts: null
    }
  },
  methods: {
    viewMore (item) {

    },
    deleteItem (item) {

    }
  }
}
</script>

<style scoped>

</style>
