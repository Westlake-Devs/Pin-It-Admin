<template>
  <div>
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <v-card class = "info white--text">
        <v-card-title>
          Item Unavailable
        </v-card-title>
        <v-card-text class = "white--text">
          {{ error.message }}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="white"
            outlined
            @click="dialog = false"
          >
            Ok
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-data-table
      :headers="headers"
      :sort-desc="[true]"
      :items="items"
      :search="search"
      show-expand
      class="elevation-1"
    >

      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title> {{ title }} </v-toolbar-title>
          <v-spacer/>
          <v-btn depressed class="tertiary" @click="loadPosts()" :loading="loading">
              <span>refresh</span>
              <v-icon right>loop</v-icon>
          </v-btn>
        </v-toolbar>
        <v-toolbar flat>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-toolbar>
      </template>

      <template v-slot:item.approve="{ item }" v-if="requestApproval">
        <v-icon
          small
          class="mr-2"
          @click="approveItem(item)"
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
          mdi-close
        </v-icon>
      </template>

      <template v-slot:expanded-item="{ headers, item }">
        <td :colspan="headers.length">
          <br/>
          <v-card flat outlined>
            <div v-if="requestApproval">
              <v-card-title>
                Pending Action: {{ item.action.toUpperCase() }}
              </v-card-title>
              <v-card-subtitle>
                User {{ item.userName }} is attempting to {{ item.action }} post {{ item.id }}.<br/>
                The following will become public if approved.
              </v-card-subtitle>
              <v-divider/>
            </div>
            <v-card-title>Post Details</v-card-title>
            <v-card-subtitle>
              title: {{ item.title }}<br/>
              author: {{ item.userName }}<br/>
              description: {{ item.description }}<br/>
              coordinates: <a :href="mapsURL(item.userLat, item.userLong)" target="_blank">({{ item.userLat }}, {{ item.userLong }})</a><br/>
            </v-card-subtitle>
            <div v-if="item.action != 'edit' || !requestApproval">
              <v-card-title>Post Images</v-card-title>
              <v-card-subtitle>
                <post-images :post="item" :isPending="requestApproval"></post-images>
              </v-card-subtitle>
            </div>
          </v-card>
          <br/>
        </td>
      </template>

    </v-data-table>
  </div>
</template>

<script>
import PostImages from '@/components/PostImages.vue'

export default {
  async created () {
    this.$emit('loadPosts')
  },
  components: { 'post-images': PostImages },
  props: {
    title: { type: String, required: true },
    items: { type: Array, required: true },
    loading: { type: Boolean, required: true },
    error: { type: Error, required: true },
    requestApproval: { type: Boolean, required: true },
    headers: { type: Array, required: true }
  },
  computed: {
  },
  watch: {
    error: function (err) {
      if (err.type === 'PostManagerError') this.dialog = true
    }
  },
  data () {
    return {
      search: null,
      dialog: false
    }
  },
  methods: {
    mapsURL (lat, long) {
      return `https://www.google.com/maps/search/?api=1&query=${lat},${long}`
    },
    async loadPosts () {
      this.$emit('loadPosts')
    },
    async deleteItem (item) {
      this.$emit('deleteItem', item)
    },
    async approveItem (item) {
      this.$emit('approveItem', item)
    }
  }
}
</script>
