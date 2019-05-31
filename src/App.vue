<template>
  <v-app id="inspire">
    <Aside :drawer="drawer"/>
    <Header @toggleAside="toggleAside"/>
    <v-content>
      <router-view></router-view>
    </v-content>
    <v-footer color="indigo" app>
      <span class="white--text">&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
import Aside from './components/Aside'
import Header from './components/Header'

export default {
  data: () => ({
    drawer: false
  }),
  components: {
    Aside,
    Header
  },
  props: {
    source: String
  },
  methods: {
    toggleAside () {
      this.drawer = !this.drawer;
    }
  }
}
</script>
