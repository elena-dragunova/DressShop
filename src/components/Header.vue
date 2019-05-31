<template>
  <v-toolbar color="pink" dark fixed app>
    <v-toolbar-side-icon @click.stop="toggleMenu" class="hidden-sm-and-up"></v-toolbar-side-icon>
    <v-toolbar-title>
      <router-link to="/" class="link-btn">DressShop</router-link>
    </v-toolbar-title>
    <v-menu :nudge-width="100">
      <template v-slot:activator="{ on }">
        <v-toolbar-title v-on="on" class="hidden-xs-only">
          <span>Catalog</span>
          <v-icon dark>arrow_drop_down</v-icon>
        </v-toolbar-title>
      </template>

      <v-list>
        <v-list-tile
          v-for="item in categories"
          :key="item"
        >
          <v-list-tile-title>
            <router-link to="/catalog" class="menu-link">{{ item }}</router-link>
          </v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>

    <v-spacer />
    <v-btn class="hidden-xs-only" flat>
      <router-link to="/about" class="link-btn">About</router-link>
    </v-btn>
    <v-btn class="hidden-xs-only" flat>
      <router-link to="/login" class="link-btn">Login</router-link>
    </v-btn>
    <v-btn class="hidden-xs-only" flat>
      <router-link to="/signup" class="link-btn">Signup</router-link>
    </v-btn>
  </v-toolbar>
</template>

<script>
export default {
  computed: {
    categories () {
      return this.$store.getters.getCategoties
    }
  },
  methods: {
    toggleMenu () {
      this.$store.dispatch('displayMenu')
    }
  }
}
</script>

<style lang="scss">
  @import "@/styles/variables.scss";

  .menu-link {
    text-decoration: none !important;
    color: $blue-grey !important;
  }

  .link-btn {
    text-decoration: none;
    color: inherit;
    font: inherit;
  }
</style>
