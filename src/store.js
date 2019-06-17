import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import axiosInstance from './axios-auth'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    displayMenu: false,
    categories: [],
    catalogItems: [],
    selectedItems: [],
    currentItem: {},
    cartItems: [],
    order: {},
    promo: [],
    idToken: null,
    userId: null,
    user: null
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
    },
    getPromoItems (state) {
      return state.promo
    },
    getUser (state) {
      return state.user
    },
    isAuthenticated (state) {
      return state.idToken !== null
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
    },
    storePromoItems (state, promo) {
      state.promo = promo
    },
    authUser (state, userData) {
      state.idToken = userData.token
      state.userId = userData.userId
    },
    storeUser (state, user) {
      state.user = user
    },
    clearAuthData (state) {
      state.idToken = null
      state.userId = null
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
    },
    sendOrder ({ commit }, order) {
      axios.post('/orders.json', order)
        .then((res) => console.log(res))
        .catch((err) => console.log(err))
    },
    getPromoItems ({ commit }) {
      axios.get('/promo.json')
        .then(res => {
          commit('storePromoItems', res.data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    signUp ({ commit, dispatch }, authData) {
      axiosInstance.post('/signupNewUser?key=\n' +
        'AIzaSyDlZZACAOgFTyjEsasxd-jSFIOFT0AR3FI', {
        email: authData.email,
        password: authData.password,
        returnSecureToken: true
      })
        .then(res => {
          commit('authUser', {
            token: res.data.idToken,
            userId: res.data.localId
          })
          const now = new Date()
          const expDate = new Date(now.getTime() + res.data.expiresIn * 1000)
          localStorage.setItem('token', res.data.idToken)
          localStorage.setItem('expDate', expDate)
          localStorage.setItem('userId', res.data.localId)
          dispatch('storeUser', authData)
          dispatch('setLogoutTimer', res.data.expiresIn)
          dispatch('fetchUser')
        })
        .catch(error => console.log(error))
    },
    storeUser ({ commit, state }, userData) {
      if (!state.idToken) {
        return
      }
      axios.post('/users.json' + '?auth=' + state.idToken, userData)
        .then(res => {
          console.log('res ' + res)
        })
        .catch(error => console.log(error))
    },
    setLogoutTimer ({ commit }, expirationTime) {
      setTimeout(() => {
        commit('clearAuthData')
      }, expirationTime * 1000)
    },
    login ({ commit, dispatch, state }, authData) {
      axiosInstance.post('/verifyPassword?key=AIzaSyDlZZACAOgFTyjEsasxd-jSFIOFT0AR3FI', {
        email: authData.email,
        password: authData.password,
        returnSecureToken: true
      })
        .then(res => {
          commit('authUser', {
            token: res.data.idToken,
            userId: res.data.localId
          })
          const now = new Date()
          const expDate = new Date(now.getTime() + res.data.expiresIn * 1000)
          localStorage.setItem('token', res.data.idToken)
          localStorage.setItem('expDate', expDate)
          localStorage.setItem('userId', res.data.localId)
          dispatch('setLogoutTimer', res.data.expiresIn)
          dispatch('fetchUser')
        })
        .catch(error => console.log(error))
    },
    tryAutoLogin ({ commit }) {
      const token = localStorage.getItem('token')
      if (!token) {
        return
      }
      const expirationDate = localStorage.getItem('expDate')
      const now = new Date()
      if (now >= expirationDate) {
        return
      }
      const userId = localStorage.getItem('userId')
      commit('authUser', {
        token,
        userId
      })
    },
    fetchUser ({ commit, state }) {
      if (!state.idToken) {
        return
      }
      axios.get('/users.json' + '?auth=' + state.idToken)
        .then(res => {
          const data = res.data
          const users = []
          for (let key in data) {
            const user = data[key]
            user.id = key
            users.push(user)
          }
          commit('storeUser', users[0])
        })
        .catch(error => console.log(error))
    },
    logout ({ commit }) {
      commit('clearAuthData')
      localStorage.removeItem('expDate')
      localStorage.removeItem('token')
      localStorage.removeItem('userId')
    }
  }
})
