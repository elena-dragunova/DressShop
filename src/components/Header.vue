<template>
  <v-toolbar color="indigo" dark fixed app>
    <v-toolbar-side-icon @click.stop="toggleAside"></v-toolbar-side-icon>
    <v-toolbar-title>DressShop</v-toolbar-title>
  </v-toolbar>
</template>

<script>
export default {
  methods: {
    toggleAside () {
      this.$emit('toggleAside', event.target);
    }
  }
}
</script>
