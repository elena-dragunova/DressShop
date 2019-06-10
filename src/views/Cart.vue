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
            <v-btn @click="deleteItem(props.item.id)">Delete</v-btn>
          </td>
        </template>
      </v-data-table>

      <h4 class="mt-3 text-xs-right total-price">
        Total Price: {{ getTotalPrice }}$
      </h4>

      <v-flex>
        <v-btn color="#F06292"
               class="white--text"
               @click="showForm">Send Order</v-btn>
        <v-btn color="#F06292"
               flat
               @click="backToCatalog"
          >Back To Catalog</v-btn
        >
      </v-flex>

      <form v-if="isFormVisible" class="order-form mt-4">
        <v-layout row wrap>
          <v-flex xs6 pa-3>
            <v-text-field label="Your Name *"
                          color="#37474F"/>
          </v-flex>

          <v-flex xs6 pa-3>
            <v-text-field label="Your Email *"
                          color="#37474F"/>
          </v-flex>

          <v-flex xs6 pa-3>
            <v-text-field label="Your Phone *"
                          color="#37474F"/>
          </v-flex>

          <v-flex xs6 pa-3>
            <v-text-field label="Your Address *"
                          color="#37474F"/>
          </v-flex>

          <v-flex xs12 pa2>
            <v-btn color="#F06292"
                   class="white--text">Send</v-btn>
            <v-btn color="#F06292"
                   flat
                   @click="hideForm">Cancel</v-btn>
          </v-flex>
        </v-layout>
      </form>

    </v-layout>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      isFormVisible: true,
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
  methods: {
    backToCatalog () {
      this.$router.push({ name: 'catalog' })
      this.$store.dispatch('selectAllItems')
    },
    deleteItem (id) {
      this.$store.dispatch('deleteItem', id)
    },
    showForm () {
      this.isFormVisible = true
    },
    hideForm () {
      this.isFormVisible = false
    }
  },
  computed: {
    getCartItems () {
      return this.$store.getters.getCartItems
    },
    getTotalPrice () {
      return this.$store.getters.getTotalPrice
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
