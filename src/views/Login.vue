<template>
    <div class="container">
        <div v-if="error" class="error">{{erorr.message}}</div>
        <form class="general-form" @submit.prevent="login">
            <div class="form-item">Login</div>
            <!-- <div class="form-item"><input type="email" v-model="email" placeholder="noobmaster69@protonmail.com"></div> -->
            <!-- <div class="form-item"><input type="password" v-model="password" placeholder="password"></div> -->
            <div class="form-item"><button class="button" type="submit">Login</button></div>
        </form>
    </div>
</template>

<script>
import firebase from 'firebase'
require('@/assets/styles/forms.css')

export default {
  data () {
    return {
      email: null,
      password: null,
      error: null
    }
  },
  methods: {
    async login () {
      try {
        const provider = new firebase.auth.GoogleAuthProvider()
        const res = await firebase.auth().signInWithPopup(provider)
        console.log('user logged in')
        console.log(res)
      } catch (err) {
        console.log('Error loggin in')
        console.log(err)
      }
    }
  }
}
</script>

<style scoped>

</style>
