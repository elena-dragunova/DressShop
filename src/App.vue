<template>
  <v-app id="inspire">
    <MainMenu />
    <Header />
    <v-content>
      <router-view></router-view>
    </v-content>
    <Footer />
  </v-app>
</template>

<script>
import MainMenu from './components/MainMenu'
import Header from './components/Header'
import Footer from './components/Footer'

export default {
  components: {
    MainMenu,
    Header,
    Footer
  },
  created () {
    this.$store.dispatch('getCatalogItems')
    this.$store.dispatch('tryAutoLogin')
  }
}
</script>
