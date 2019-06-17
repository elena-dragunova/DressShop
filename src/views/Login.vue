<template>
  <v-container>
    <v-layout column>
      <h1 class="text-xs-center">Login</h1>

      <v-flex>
        <form class="signup-form">
          <v-layout row wrap>

            <v-flex xs6 px-3>
              <v-text-field label="Your Email *"
                            type="email"
                            color="#37474F"
                            v-model="email"/>
            </v-flex>

            <v-flex xs6 px-3>
              <v-text-field label="Your Password *"
                            type="password"
                            color="#37474F"
                            v-model="password"/>
            </v-flex>

            <v-flex xs12>
              <v-btn color="#F06292"
                     class="white--text"
                     @click="logIn">Submit</v-btn>
            </v-flex>
          </v-layout>
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>export default {
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    logIn () {
      const formData = {
        email: this.email,
        password: this.password
      }
      this.$store.dispatch('login', { email: formData.email, password: formData.password, returnSecureToken: true })
    }
  }
}
</script>
