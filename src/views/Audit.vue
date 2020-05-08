<template>
    <v-data-table
      :headers="headers"
      sort-by="date"
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
      </template>
      <template v-slot:item.visible="{ item }">
        <v-checkbox v-model="item.visible" disabled></v-checkbox>
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
          date: 'sksksksksk',
          visible: true
        }
      ],
      pendingPosts: null
    }
  },
  methods: {
    viewMore (item) {
      console.log(item.title)
    },
    deleteItem (item) {
    },
    toggleVisibility (item) {
      console.log(item.visible)
    }
  }
}
</script>

<style scoped>

</style>
