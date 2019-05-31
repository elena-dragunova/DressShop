<template>
  <v-app id="inspire">
    <MainMenu />
    <Header />
    <v-content>
      <router-view></router-view>
    </v-content>
    <v-footer color="pink" app>
      <span class="white--text">&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
import MainMenu from './components/MainMenu'
import Header from './components/Header'

export default {
  components: {
    MainMenu,
    Header
  }
}
</script>
