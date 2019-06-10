<template>
  <v-container>
    <v-layout>
      <v-flex md4 class="catalog-aside">
        <AsideMenu />
      </v-flex>

      <v-flex md8>
        <v-layout row wrap>
          <v-flex xs6 md4
                  pa-1
                  v-for="(item, index) in selectedItems"
                  :key="index">
            <v-card class="catalog-card">
              <div>
                <v-img :src="item.imageUrl" aspect-ratio="0.8"/>
                <v-card-title class="catalog-card-header">
                  <h3 class="catalog-item-title">{{ item.name }}</h3>
                  <span v-if="item.new" class="new-label">New!</span>
                </v-card-title>
              </div>

              <v-card-actions>
                <v-spacer />
                <v-btn flat color="pink">
                  <router-link :to="'/catalog/' + item.id" class="link-btn">More</router-link>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import AsideMenu from '../components/AsideMenu'

export default {
  components: {
    AsideMenu
  },
  computed: {
    catalog () {
      return this.$store.getters.getAllCatalogItems
    },
    selectedItems () {
      return this.$store.getters.getSelectedItems
    }
  }
}
</script>

<style scoped lang="scss">
  @import "@/styles/variables.scss";

  .catalog-card {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    &-header {
      padding-bottom: 0;
    }
  }

  .catalog-item-title {
    display: block;
    text-align: center;
    font-size: 18px;
    color: $blue-grey;
    width: 100%;
    text-transform: capitalize;
  }

  .new-label {
    display: block;
    margin: 0 auto;
    padding: 4px 10px;
    font-weight: 700;
    color: $black;
    font-size: 12px;
    border-radius: 20px;
    background-color: $light-grey;
    text-transform: uppercase;
  }

  .link-btn {
    text-decoration: none;
    color: inherit;
    font: inherit;
  }
</style>
