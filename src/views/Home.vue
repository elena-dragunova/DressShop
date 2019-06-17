<template>
  <v-container>
    <v-layout column>
      <h1 class="my-4">Home page</h1>

      <v-carousel>
        <v-carousel-item
          v-for="(item,i) in promoItems"
          :key="i"
          :src="item.imageSrc"
        ></v-carousel-item>
      </v-carousel>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  computed: {
    promoItems () {
      return this.$store.getters.getPromoItems
    }
  },
  created () {
    this.$store.dispatch('getPromoItems')
  }
}
</script>
