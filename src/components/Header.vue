<template>
  <v-toolbar color="pink" dark fixed app>
    <v-toolbar-side-icon @click.stop="toggleMenu" class="hidden-sm-and-up"></v-toolbar-side-icon>
    <v-toolbar-title>
      <router-link to="/" class="link-btn">Fashion</router-link>
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
          <v-list-tile-title class="menu-btn">
            <v-btn flat class="menu-link" @click="showCatalogCategory(item)">{{ item }}</v-btn>
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
    <v-btn class="hidden-xs-only cart-btn" flat>
      <router-link to="/cart" class="link-btn">
        <i class="material-icons">
          shopping_cart
        </i>
      </router-link>
    </v-btn>
  </v-toolbar>
</template>

<script>
export default {
  computed: {
    categories () {
      return this.$store.getters.getCategories
    }
  },
  methods: {
    toggleMenu () {
      this.$store.dispatch('displayMenu')
    },
    showCatalogCategory(cat) {
      this.$store.dispatch('getItemsByCategory', cat);
      this.$router.push({name: 'catalog'});
    }
  }
}
</script>

<style lang="scss">
  @import "@/styles/variables.scss";

  .menu-link {
    text-decoration: none;
    text-transform: capitalize;
    color: $blue-grey;
  }

  .link-btn {
    text-decoration: none;
    color: inherit;
    font: inherit;
  }

  .cart-btn {
    padding: 0 10px;
    min-width: auto;
  }

  .menu-btn {
    height: auto;
  }
</style>
