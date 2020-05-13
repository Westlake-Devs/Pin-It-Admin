<template>
  <v-container fluid fill-height>
    <v-snackbar v-model="snackbar" color="error" :timeout="9000" top>
      <span>{{ error }}</span>
      <v-btn color="error white--text" depressed @click="snackbar = false">
        close
      </v-btn>
    </v-snackbar>

    <v-snackbar v-model="successSnackbar" color="success" :timeout="3000" top>
      <span>User logged in with admin permissions.</span>
      <v-btn color="success white--text" depressed @click="successSnackbar = false">
        close
      </v-btn>
    </v-snackbar>

    <v-layout align-center justify-center>
      <v-card class="elevation-12">
        <v-toolbar color="primary" dark flat>
          <v-toolbar-title>Sign In To View Auditor</v-toolbar-title>
        </v-toolbar>
        <br>
        <v-card-actions class = "justify-center">
          <v-btn depressed @click="login" class="info white--text" :loading="loggingIn">
            <v-icon left>email</v-icon>
            <span>Login</span>
          </v-btn>
        </v-card-actions>
        <br>
      </v-card>
    </v-layout>
  </v-container>
</template>

<script>
import firebase from 'firebase'
require('@/assets/styles/forms.css')

export default {
  data () {
    return {
      error: null,
      currentUser: null,
      snackbar: false,
      successSnackbar: false,
      loggingIn: false
    }
  },
  methods: {
    async login () {
      try {
        this.loggingIn = true

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
        this.successSnackbar = true
      } catch (err) {
        console.log('error while logging in and requesting permissions')
        console.log(err)
        if (err.code.includes('auth')) { return }
        await this.logout()
        this.error = err
        this.snackbar = true
      } finally {
        this.loggingIn = false
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
