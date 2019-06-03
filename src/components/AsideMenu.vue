<template>
  <div>
    <h2>Catalog</h2>
    <v-list class="categories">

      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-title>
            <v-btn class="menu-link" @click="getAllItems">All items</v-btn>
          </v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

      <v-list-tile
        v-for="item in categories"
        :key="item"
      >
        <v-list-tile-content>
          <v-list-tile-title>
            <v-btn class="menu-link" @click="getItemsByCategory(item)">{{ item }}</v-btn>
          </v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </div>
</template>

<script>
  export default {
    computed: {
      categories () {
        return this.$store.getters.getCategories
      }
    },
    methods: {
      getAllItems () {
        this.$store.dispatch('selectAllItems')
      },
      getItemsByCategory(cat) {
        return this.$store.dispatch('getItemsByCategory', cat);
      }
    }
  }
</script>

<style scoped lang="scss">
  .v-list.categories {
    background-color: transparent;
  }

  .menu-link {
    text-transform: capitalize;
  }

  .categories .v-list__tile__title {
    height: auto;
  }
</style>
