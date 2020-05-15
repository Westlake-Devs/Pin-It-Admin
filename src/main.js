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

const onAuthorizationStatusChanged = user => {
  console.log('onAuthorizationStatusChanged, authorized user is:')
  console.log(user)
  store.dispatch('setUser', user)
  new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
  }).$mount('#app')
}

firebase.auth().onAuthStateChanged(async user => {
  console.log('Auth state change, user is:')
  console.log(user)

  try {
    // if user is unauthorized, we don't want to do anything
    const functions = firebase.functions()
    if (user) await functions.httpsCallable('isAuthorized')()
    if (user === store.state.currentUser) return

    onAuthorizationStatusChanged(user)
  } catch (err) {
    console.log('The user is not authorized to access the audit page')
    console.log(err)
  }
})
