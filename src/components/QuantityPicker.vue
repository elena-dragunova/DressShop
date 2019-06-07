<template>
  <div class="quantity-picker">
    <v-btn flat class="quantity-button" @click="decrease">-</v-btn>
    <span>{{ quantity }}</span>
    <v-btn flat class="quantity-button" @click="increase">+</v-btn>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        quantity: 1,
      }
    },
    methods: {
      decrease () {
        if (this.quantity >1) {
          this.quantity--;
          this.$emit('decrease')
        }
      },
      increase () {
        this.quantity++;
        this.$emit('increase')
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "@/styles/variables.scss";

  .quantity-picker {
    text-align: center;
    .quantity-button {
      width: 40px;
      height: 40px;
      min-width: 0;
      border: 1px solid $light-grey;
      border-radius: 50%;
      margin: 10px;
    }
  }
</style>
