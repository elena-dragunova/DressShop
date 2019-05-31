<template>
  <v-navigation-drawer
    v-model="drawer"
    fixed
    app
  >
    <div>Aside Menu</div>
  </v-navigation-drawer>
</template>

<script>
export default {
  props: {
    drawer: {
      type: Boolean,
      default: false,
    }
  }
}
</script>
