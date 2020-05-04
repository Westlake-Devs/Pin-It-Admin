<template>
    <div class="container">
        <div v-if="currentUser">
          <form class="general-form" @submit.prevent="logout">
            <div class="form-item">You are logged in as admin user {{currentUser.displayName}}</div>
            <div class="form-item"><button class="button-red" type="submit">Log Out</button></div>
          </form>
        </div>
        <div v-else>
          <form class="general-form" @submit.prevent="login">
              <div class="form-item">Login to Access Admin Dashboard</div>
              <div class="form-item"><button class="button" type="submit">Login</button></div>
          </form>
        </div>
        <div v-if="error" class="error">{{error}}</div>
    </div>
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
