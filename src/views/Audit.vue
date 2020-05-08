<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar color="#4abdac" dark flat>
            <v-toolbar-title>Pins</v-toolbar-title>
          </v-toolbar>
          <v-card-actions class = "justify-center">
            <v-btn @click="goback" color="#f7b733" style = "color:white">Back</v-btn>
            <v-spacer></v-spacer>
            <v-btn @click="gonext" color="#f7b733" style = "color:white">Next</v-btn>
          </v-card-actions>
          <br>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
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
    goback () {
    },
    gonext () {
    }
  }
}
</script>

<style scoped>

</style>
