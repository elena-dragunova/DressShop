<template>
  <v-container>
    <v-layout column>
      <h1>My Cart</h1>
      <v-data-table
        :headers="headers"
        :items="getCartItems"
        class="elevation-1 cart-table mt-5"
        hide-actions
      >
        <template v-slot:items="props">
          <td>{{ props.item.name }}</td>
          <td>{{ props.item.size }}</td>
          <td>{{ props.item.price }}</td>
          <td>{{ props.item.quantity }}</td>
          <td>{{ props.item.sumPrice }}</td>
          <td>
            <v-btn>Delete</v-btn>
          </td>
        </template>
      </v-data-table>

      <h4 class="mt-3 text-xs-right total-price">Total Price: {{ getTotalPrice }}$</h4>

      <v-flex>
        <v-btn color="#F06292" class="white--text">Send Order</v-btn>
        <v-btn color="#F06292" flat>Back To Catalog</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      headers: [
        {
          text: 'Name',
          sortable: false,
          value: 'name'
        },
        { text: 'Size', value: 'size' },
        { text: 'Price for one', value: 'price' },
        { text: 'Quantity', value: 'quantity' },
        { text: 'Price', value: 'sumPrice' },
        { sortable: false, value: 'delete' }
      ]
    }
  },
  computed: {
    getCartItems () {
      return this.$store.getters.getCartItems
    },
    getTotalPrice () {
      return 200
    }
  }
}
</script>

<style lang="scss">
  .cart-table table.v-table thead th {
    font-size: 16px;
  }

  .total-price {
    font-size: 18px;
  }
</style>
