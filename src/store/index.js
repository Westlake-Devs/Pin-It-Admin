import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: null
  },
  mutations: {
    setUser: (state, payload) => {
      state.currentUser = payload
    }
  },
  actions: {
    setUser: (context, payload) => {
      context.commit('setUser', payload)
    }
  },
  modules: {
  }
})
