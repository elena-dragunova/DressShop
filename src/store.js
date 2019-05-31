import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    displayMenu: false,
    categories: [
      'Dresses',
      'Blouses',
      'Skirts',
      'Trousers'
    ]
  },
  getters: {
    showMenu (state) {
      return state.displayMenu
    },
    getCategoties (state) {
      return state.categories
    }
  },
  mutations: {
    displayMenu (state) {
      state.displayMenu = !state.displayMenu
    }
  },
  actions: {
    displayMenu ({ commit }) {
      commit('displayMenu')
    }
  }
})
