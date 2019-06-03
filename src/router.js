import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import Login from './views/Login.vue'
import Signup from './views/Signup.vue'
import Catalog from './views/Catalog.vue'
import Cart from './views/Cart.vue'
import Contacts from './views/Contacts.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup
    },
    {
      path: '/catalog',
      name: 'catalog',
      component: Catalog
    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart
    },
    {
      path: '/contacts',
      name: 'contacts',
      component: Contacts
    }
  ]
})

