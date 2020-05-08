<template>
  <v-container fluid fill-height>
    <div v-if="error">
      <v-row>
        <v-layout align-center justify-center>
          <v-alert dismissible type="error" :value = "error">{{ error }}</v-alert>
        </v-layout>
      </v-row>
    </div>
    <v-row>
      <v-layout align-center justify-center>
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Sign In To View Auditor</v-toolbar-title>
          </v-toolbar>
          <br>
          <v-card-actions class = "justify-center">
            <v-btn depressed @click="login" class="info white--text">
              <v-icon left>email</v-icon>
              Login
            </v-btn>
          </v-card-actions>
          <br>
        </v-card>
      </v-layout>
    </v-row>
  </v-container>
</template>

<script>
import firebase from 'firebase'
require('@/assets/styles/forms.css')

export default {
  data () {
    return {
      error: null,
      currentUser: null
    }
  },
  methods: {
    async login () {
      try {
        const functions = firebase.functions()
        const provider = new firebase.auth.GoogleAuthProvider()
        const res = await firebase.auth().signInWithPopup(provider)
        console.log('user logged in')
        console.log(res)

        console.log('requesting admin permissions')
        var grantAdminPermissions = functions.httpsCallable('grantAdminPermissions')
        const permRes = await grantAdminPermissions()
        console.log(permRes)
        this.error = null
        this.currentUser = firebase.auth().currentUser
      } catch (err) {
        console.log('error while logging in and requesting permissions')
        console.log(err)
        await this.logout()
        this.error = err
      }
    },
    async logout () {
      await firebase.auth().signOut()
      this.currentUser = null
      this.error = null
    }
  }
}
</script>

<style scoped>

</style>
