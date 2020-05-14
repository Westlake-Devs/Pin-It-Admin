import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase'
import firebaseConfig from './firebase/firebaseConfig.js'
import vuetify from './plugins/vuetify'
import vuex from 'vuex'

// init firebase
firebase.initializeApp(firebaseConfig)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  vuex,
  render: h => h(App)
}).$mount('#app')
