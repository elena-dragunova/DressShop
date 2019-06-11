<template>
  <form class="order-form mt-4">
    <v-layout row wrap>
      <v-flex xs6 px-3>
        <v-text-field label="Your Name *"
                      color="#37474F"
                      v-model="$v.name.$model"
                      :class="{'error-field': $v.name.$error}"/>
        <p v-if="!$v.name.required && $v.name.$error"
           class="error-message">Name is required</p>
      </v-flex>

      <v-flex xs6 px-3>
        <v-text-field label="Your Email *"
                      color="#37474F"
                      v-model="$v.email.$model"
                      :class="{'error-field': $v.email.$error}"/>
        <p v-if="!$v.email.required && $v.email.$error"
           class="error-message">Email is required</p>
        <p v-if="!$v.email.email && $v.email.$error"
           class="error-message">Email is invalid</p>
      </v-flex>

      <v-flex xs6 px-3>
        <v-text-field label="Your Phone *"
                      color="#37474F"
                      v-model="$v.phone.$model"
                      :return-masked-value="true"
                      mask="+# ### ### ## ##"
                      :class="{'error-field': $v.phone.$error}"/>
        <p v-if="!$v.phone.required && $v.phone.$error"
           class="error-message">Phone is required</p>
        <p v-if="!$v.phone.minLen && $v.phone.$error"
           class="error-message">Phone is incomplete</p>
      </v-flex>

      <v-flex xs6 px-3>
        <v-text-field label="Your Address *"
                      color="#37474F"
                      v-model="$v.address.$model"
                      :class="{'error-field': $v.address.$error}"/>
        <p v-if="!$v.address.required && $v.address.$error"
           class="error-message">Address is required</p>
      </v-flex>

      <v-flex xs12>
        <v-btn color="#F06292"
               class="white--text"
               :disabled="$v.$invalid"
               @click="sendOrder">Send</v-btn>
        <v-btn color="#F06292"
               flat
               @click="close">Cancel</v-btn>
      </v-flex>
    </v-layout>
  </form>
</template>

<script>
import { required, email, minLength } from 'vuelidate/lib/validators'

export default {
  data () {
    return {
      name: '',
      email: '',
      phone: '',
      address: ''
    }
  },
  validations: {
    name: {
      required
    },
    email: {
      required,
      email
    },
    phone: {
      required,
      minLen: minLength(16)
    },
    address: {
      required
    }
  },
  methods: {
    close () {
      this.$emit('close')
    },
    sendOrder () {
      const order = {}

      order.items = this.getCart
      order.user = {
        name: this.name,
        email: this.email,
        phone: this.phone,
        address: this.address
      }
      order.total = this.getTotalPrice
      console.log(order)
    }
  },
  computed: {
    getCart () {
      return this.$store.getters.getCartItems
    },
    getTotalPrice () {
      return this.$store.getters.getTotalPrice
    }
  }
}
</script>

<style lang="scss">

  form .v-text-field.error-field label {
    color: red !important;
  }

  form .v-text-field.error-field .v-input__slot::after,
  form .v-text-field.error-field .v-input__slot::before {
    border-color: red !important;
  }

  .error-message {
    color: red;
    font-style: italic;
    font-weight: 300;
    margin-top: -10px;
  }
</style>
