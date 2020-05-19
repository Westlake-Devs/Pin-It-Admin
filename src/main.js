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

const initApp = () => {
  new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
  }).$mount('#app')
}

firebase.auth().onIdTokenChanged(async (user) => {
  // console.log(`token refreshed ${JSON.stringify(user)}`)
  if (user) {
    const token = await user.getIdTokenResult(false)
    if (token.claims.admin) { // if user is logged in as admin, reinit app to load in admin panel
      store.dispatch('setUser', user)
      initApp()
    } else store.dispatch('setUser', null)
  } else {
    store.dispatch('setUser', null)
  }
})

initApp()
