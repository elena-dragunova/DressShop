import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    displayMenu: false,
    categories: [],
    catalogItems: []
  },
  getters: {
    showMenu (state) {
      return state.displayMenu
    },
    getCategoties (state) {
      return state.categories
    },
    getAllCatalogItems (state) {
      return state.catalogItems
    }
  },
  mutations: {
    displayMenu (state) {
      state.displayMenu = !state.displayMenu
    },
    storeCatalog (state, catalog) {
      state.catalogItems = catalog
    },
    storeCategories (state, categories) {
      state.categories = categories
    }
  },
  actions: {
    displayMenu ({ commit }) {
      commit('displayMenu')
    },
    getCatalogItems ({ commit }) {
      axios.get('/catalog.json')
        .then(res => {
          console.log(res)
          commit('storeCatalog', res.data)

          const categories = []
          res.data.forEach(item => {
            if (categories.indexOf(item.category) >= 0) {
              categories.push(item.category)
            }
          })
          commit('storeCategories', categories)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
})
