<template>
  <v-container>
    <v-layout row>
      <v-flex md8 class="catalog-item">
        <h2 class="catalog-item-title">{{ catalogItem.name }}</h2>
        <v-img :src="catalogItem.imageUrl" aspect-ratio="0.8" />
        <span v-if="catalogItem.new" class="new-label">New!</span>
        <p class="catalog-item-price">Price: {{ catalogItem.price }}$</p>
      </v-flex>

      <v-flex md4 pt-5>
        <div class="catalog-item-sizes">
          <v-btn flat v-for="size in getSizes">{{ size }}</v-btn>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    computed: {
      catalogItem () {
        return this.$store.getters.getCurrentItem
      },
      getSizes () {
        return Object.keys(this.catalogItem.sizes).filter(size => {
          return this.catalogItem.sizes[size] === true
        })
      }
    },
    created() {
      this.$store.dispatch('getCurrentItem', this.$route.params.id)
    }
  }
</script>

<style scoped lang="scss">
  @import "@/styles/variables.scss";

  .catalog-item {
    text-align: center;
  }

  .catalog-item-title {
    text-align: center;
    margin-top: 40px;
    margin-bottom: 20px;
    font-size: 36px;
  }

  .catalog-item-price {
    margin-top: 20px;
    font-size: 22px;
    font-weight: 700;
  }

  .new-label {
    display: inline-block;
    margin: 20px auto 0;
    padding: 10px 20px;
    font-weight: 700;
    color: $black;
    font-size: 12px;
    border-radius: 20px;
    background-color: #CFD8DC;
    text-transform: uppercase;
  }
</style>
