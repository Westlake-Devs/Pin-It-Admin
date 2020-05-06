<template>
  <v-content>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card class="elevation-12">
            <v-card-actions class = "justify-center">
              <v-btn color="primary">Login</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
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
