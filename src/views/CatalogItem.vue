<template>
  <v-container>
    <v-layout row>
      <v-flex md8 class="catalog-item">
        <h2 class="catalog-item-title">{{ catalogItem.name }}</h2>
        <span v-if="catalogItem.new" class="new-label">New!</span>
        <v-img :src="catalogItem.imageUrl" aspect-ratio="0.8" />
      </v-flex>

      <v-flex md4 mt-5 pt-5>
        <h4 class="sizes-title">Available sizes:</h4>
        <div class="catalog-item-sizes">
          <v-btn
            flat
            color="#F48FB1"
            v-for="size in getSizes"
            :key="size"
            :class="{ active: size === chosenSize }"
            @click="chosenSize = size"
            >{{ size }}</v-btn
          >
        </div>
        <p class="catalog-item-price">
          Price: <span>{{ catalogItem.price * quantity }}$</span>
        </p>

        <div v-if="chosenSize" class="buyInfo">
          <QuantityPicker
            class="quantity-picker"
            @increase="increaseQuantity"
            @decrease="decreaseQuantity"
          />

          <div class="buyButtons">
            <v-btn class="buyBtn white--text" color="#F06292" @click="addToCart"
              >Add to Cart</v-btn
            >
            <v-btn flat class="cancelBtn" @click="cancelChoice">Cancel</v-btn>
          </div>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import QuantityPicker from '../components/QuantityPicker.vue'

export default {
  data () {
    return {
      chosenSize: null,
      quantity: 1
    }
  },
  components: {
    QuantityPicker
  },
  computed: {
    catalogItem () {
      return this.$store.getters.getCurrentItem
    },
    getSizes () {
      return Object.keys(this.catalogItem.sizes).filter(size => {
        return this.catalogItem.sizes[size] === true
      })
    },
    getCartItems () {
      return this.$store.getters.cartItems
    }
  },
  methods: {
    cancelChoice () {
      this.chosenSize = null
      this.quantity = 1
    },
    increaseQuantity () {
      this.quantity++
    },
    decreaseQuantity () {
      this.quantity--
    },
    addToCart () {
      let cartItem = Object.create(this.catalogItem)

      cartItem.quantity = this.quantity
      cartItem.size = this.chosenSize
      cartItem.sumPrice = this.catalogItem.price * this.quantity

      this.$store.dispatch('addItemToCart', cartItem).then(() => console.log(this.$store.getters.getCartItems))
    }
  },
  created () {
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
  color: $blue-grey;
}

.catalog-item-price {
  margin-top: 20px;
  margin-bottom: 0;
  font-size: 20px;
  text-align: center;
  span {
    font-size: 22px;
    font-weight: 700;
    color: $blue-grey;
  }
}

.new-label {
  display: inline-block;
  margin: 0 auto 20px;
  padding: 10px 20px;
  font-weight: 700;
  color: $black;
  font-size: 12px;
  border-radius: 20px;
  background-color: $light-grey;
  text-transform: uppercase;
}

.sizes-title {
  text-align: center;
  margin: 20px 0;
  font-size: 22px;
  color: $blue-grey;
}

.catalog-item-sizes {
  display: flex;
  justify-content: center;
  button {
    border: 1px solid $pink-buttons;
    &.active {
      background-color: $pink-buttons;
      color: $white !important;
    }
  }
}

.buyButtons {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  .buyBtn {
    margin-left: 20px;
  }
}
</style>
