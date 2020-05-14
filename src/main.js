import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase'
import firebaseConfig from './firebase/firebaseConfig.js'
import vuetify from './plugins/vuetify'

// init firebase
firebase.initializeApp(firebaseConfig)

Vue.config.productionTip = false

firebase.auth().onAuthStateChanged(user => {
  console.log('Auth state change')
  console.log(user)
  store.dispatch('setUser', user)
  new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
  }).$mount('#app')
})
