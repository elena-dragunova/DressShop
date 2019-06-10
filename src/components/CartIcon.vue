<template>
  <router-link to="/cart" class="link-btn">
    <i class="material-icons">
      shopping_cart
    </i>
    <span>{{ getQuantity }}</span>
  </router-link>
</template>

<script>
export default {
  computed: {
    getQuantity () {
      return this.$store.getters.getTotalQuantity
    }
  }
}
</script>

<style scoped>

</style>
