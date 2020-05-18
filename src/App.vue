<template>
  <v-app>
    <navbar />
    <v-content class="grey lighten-3">
      <keep-alive>
        <router-view/>
      </keep-alive>
    </v-content>
  </v-app>
</template>

<script>
import Navbar from '@/components/Navbar'

export default {
  name: 'App',
  components: { navbar: Navbar },
  data: () => ({
    //
  })
}
</script>
