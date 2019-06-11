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
    currentItem: {},
    cartItems: [],
    order: {}
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
    },
    getCartItems (state) {
      return state.cartItems
    },
    getTotalPrice (state) {
      let total = 0
      state.cartItems.forEach(item => {
        total += item.sumPrice
      })
      return total
    },
    getTotalQuantity (state) {
      let quantity = 0
      state.cartItems.forEach(item => {
        quantity += item.quantity
      })
      return quantity
    }
  },
  mutations: {
    displayMenu (state) {
      state.displayMenu = !state.displayMenu
    },
    closeMenu (state) {
      state.displayMenu = false
    },
    storeCatalog (state, catalog) {
      state.catalogItems = catalog
    },
    storeCategories (state, categories) {
      state.categories = categories
    },
    getItemsByCategory (state, category) {
      state.selectedItems = state.catalogItems.filter(item => {
        return item.category === category
      })
    },
    selectAllItems (state) {
      state.selectedItems = state.catalogItems
    },
    storeCurrent (state, current) {
      state.currentItem = current
    },
    addItemToCart (state, item) {
      const key = item.id + item.size
      const added = state.cartItems.find(cartItem => cartItem.key === key)
      if (!added) {
        item.key = key
        state.cartItems.push(item)
      } else {
        added.quantity += item.quantity
        added.sumPrice += item.sumPrice
      }
    },
    deleteItemByKey (state, key) {
      const itemToDelete = state.cartItems.find(cartItem => cartItem.key === key)
      if (itemToDelete) {
        state.cartItems.splice(state.cartItems.indexOf(itemToDelete), 1)
      }
    }
  },
  actions: {
    displayMenu ({ commit }) {
      commit('displayMenu')
    },
    closeMenu ({ commit }) {
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
    selectAllItems ({ commit }) {
      commit('selectAllItems')
    },
    getCurrentItem ({ commit, state }, id) {
      const current = state.catalogItems.filter(item => {
        return item.id === id
      })
      commit('storeCurrent', current)
    },
    addItemToCart ({ commit }, item) {
      commit('addItemToCart', item)
    },
    deleteItem ({ commit }, id) {
      commit('deleteItemByKey', id)
    }
  }
})
