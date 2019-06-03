<template>
  <v-dialog
    v-model="menu"
    fullscreen
  >
    <div class="main-menu">

      <v-layout row pa-3>
        <v-flex md1>
          <v-btn color="pink"
                 flat="flat"
                 class="menu-btn"
                 @click="toggleMenu">
            <i class="material-icons">
              close
            </i>
          </v-btn>
        </v-flex>
        <v-flex md10>
          <h2 class="menu-title">Fashion</h2>
        </v-flex>
        <v-flex md1 class="main-menu-right">
          <v-btn color="pink"
                 flat="flat"
                 class="menu-btn">
            <router-link to="cart" class="link-btn">
              <i class="material-icons">
                shopping_cart
              </i>
            </router-link>
          </v-btn>
        </v-flex>
      </v-layout>

      <v-layout row pa-5>
        <v-list class="menu-list">
          <v-list-group>
            <template v-slot:activator>
              <v-list-tile>
                <v-list-tile-content>
                  <v-list-tile-title class="catalog-title">Catalog</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </template>

            <v-list-tile
              v-for="item in categories"
              :key="item"
            >
              <v-list-tile-content>
                <v-list-tile-title>
                  <router-link to="/catalog" class="menu-link">{{ item }}</router-link>
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>

          <v-divider />

          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title>
                <router-link to="/about" class="menu-link">About</router-link>
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title>
                <router-link to="/contacts" class="menu-link">Contacts</router-link>
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title>
                <router-link to="/login" class="menu-link">Login</router-link>
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title>
                <router-link to="/singup" class="menu-link">Signup</router-link>
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-layout>

    </div>
  </v-dialog>
</template>

<script>
export default {
  computed: {
    menu () {
      return this.$store.getters.showMenu
    },
    categories () {
      return this.$store.getters.getCategories
    }
  },
  methods: {
    toggleMenu () {
      this.$store.dispatch('displayMenu')
    }
  }
}
</script>

<style scoped lang="scss">
  @import "@/styles/variables.scss";

  .main-menu {
    height: 100%;
    background-color: $white;
    &-right {
      text-align: right;
    }
  }

  .menu-btn {
    padding: 0 10px;
    min-width: auto;
  }

  .menu-title {
    padding: 10px 0;
    text-align: center;
    text-transform: uppercase;
    color: $black;
  }

  .menu-list {
    width: 100%;
  }

  .catalog-title {
    text-transform: uppercase;
  }

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
</style>
