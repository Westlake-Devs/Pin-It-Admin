<template>
    <nav>
        <v-toolbar depressed class="primary text-uppercase white--text">
            <span class = "font-weight-light title">PinIt</span>
            <span class = "font-weight-bold title">Auditor</span>
            <v-spacer />
            <v-btn depressed class="primary white--text" v-show="currentUser" @click="logout">
                <span>Sign Out</span>
                <v-icon right>exit_to_app</v-icon>
            </v-btn>
        </v-toolbar>
    </nav>
</template>

<script>
import firebase from 'firebase'

export default {
  computed: {
    currentUser () {
      return this.$store.state.currentUser
    }
  },
  methods: {
    async logout () {
      await firebase.auth().signOut()
    }
  }
}
</script>
