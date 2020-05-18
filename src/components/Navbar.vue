<template>
  <nav>
    <v-toolbar depressed class="primary text-uppercase white--text">
      <span class = "font-weight-light title">PinIt</span>
      <span class = "font-weight-bold title">Auditor</span>
      <v-spacer />
      <v-tabs background-color="primary"
              v-show="currentUser"
              v-model="active_tab"
              centered
              dark
      >
        <v-tab v-for="tab of tabs" :key="tab.id">
          {{ tab.name }}
        </v-tab>
      </v-tabs>
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
  created () {
    const currentRoute = this.$router.currentRoute.name
    this.tabs.forEach((tab, i) => {
      if (tab.route === currentRoute) this.active_tab = i
    })
  },
  computed: {
    currentUser () {
      return this.$store.state.currentUser
    }
  },
  data () {
    return {
      active_tab: 0,
      tabs: [
        { id: 1, name: 'Pending Posts', route: 'Auditor' },
        { id: 2, name: 'Public Posts', route: 'PublicPreview' }
      ]
    }
  },
  watch: {
    active_tab: function (tab) {
      const route = this.tabs[tab].route
      this.$router.push({ name: route })
    }
  },
  methods: {
    async logout () {
      await firebase.auth().signOut()
      await this.$router.push({ name: 'Login' })
    }
  }
}
</script>
