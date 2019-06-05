import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    displayMenu: false,
    categories: [],
    catalogItems: [],
    selectedItems: [],
    currentItem: {}
  },
  getters: {
    showMenu (state) {
      return state.displayMenu
    },
    getCategories (state) {
      return state.categories
    },
    getAllCatalogItems (state) {
      return state.catalogItems
    },
    getSelectedItems (state) {
      return state.selectedItems
    },
    getCurrentItem (state) {
      return state.currentItem[0]
    }
  },
  mutations: {
    displayMenu (state) {
      state.displayMenu = !state.displayMenu
    },
    closeMenu (state) {
      state.displayMenu = false;
    },
    storeCatalog (state, catalog) {
      state.catalogItems = catalog
    },
    storeCategories (state, categories) {
      state.categories = categories
    },
    getItemsByCategory (state, category) {
      state.selectedItems =  state.catalogItems.filter( item => {
        return item.category === category;
      })
    },
    selectAllItems (state) {
      state.selectedItems = state.catalogItems
    },
    storeCurrent(state, current) {
      state.currentItem = current
    }
  },
  actions: {
    displayMenu ({ commit }) {
      commit('displayMenu')
    },
    closeMenu({commit}) {
      commit('closeMenu')
    },
    getCatalogItems ({ commit }) {
      axios.get('/catalog.json')
        .then(res => {
          commit('storeCatalog', res.data)
          commit('selectAllItems')

          const categories = []
          res.data.forEach(item => {
            if (categories.indexOf(item.category) === -1) {
              categories.push(item.category)
            }
          })
          commit('storeCategories', categories)
        })
        .catch(err => {
          console.log(err)
        })
    },
    getItemsByCategory ({ commit }, category) {
      commit('getItemsByCategory', category)
    },
    selectAllItems({commit}) {
      commit('selectAllItems')
    },
    getCurrentItem({commit, state}, id) {
      console.log(state.catalogItems)
      const current = state.catalogItems.filter(item => {
        return item.id === id;
      })
      console.log(current)
      commit('storeCurrent', current);
    }
  }
})
