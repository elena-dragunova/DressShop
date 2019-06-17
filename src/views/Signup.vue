<template>
  <v-container>
    <v-layout column>
      <h1 class="text-xs-center">Signup</h1>

      <v-flex>
        <form class="signup-form pa-3 pt-4 mt-4">
          <v-layout row wrap>

            <v-flex xs12 px-3>
              <v-text-field label="Your Email *"
                            type="email"
                            color="#37474F"
                            v-model="$v.email.$model"
                            :class="{'error-field': $v.email.$error}"/>
              <p v-if="!$v.email.required && $v.email.$error"
                 class="error-message">Email is required</p>
              <p v-if="!$v.email.email && $v.email.$error"
                 class="error-message">Email is invalid</p>
            </v-flex>

            <v-flex xs12 px-3>
              <v-text-field label="Your Password *"
                            type="password"
                            color="#37474F"
                            v-model="$v.password.$model"
                            :class="{'error-field': $v.password.$error}"/>
              <p v-if="!$v.password.required && $v.password.$error"
                 class="error-message">Password is required</p>
              <p v-if="!$v.password.minLen && $v.password.$error"
                 class="error-message">Password should be at least 6 characters</p>
            </v-flex>

            <v-flex xs12 px-3>
              <v-text-field label="Confirm Password *"
                            type="password"
                            color="#37474F"
                            v-model="$v.confirmPassword.$model"
                            :class="{'error-field': $v.confirmPassword.$error}"/>
              <p v-if="!$v.confirmPassword.required && $v.confirmPassword.$error"
                 class="error-message">Password confirmation is required</p>
              <p v-if="!$v.confirmPassword.same && $v.confirmPassword.$error"
                 class="error-message">Passwords should match</p>
            </v-flex>

            <v-flex xs12>
              <v-btn color="#F06292"
                     class="white--text"
                     :disabled="$v.$invalid"
                     @click="signUp">Submit</v-btn>
            </v-flex>
          </v-layout>
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { required, email, minLength, sameAs } from 'vuelidate/lib/validators'

export default {
  data () {
    return {
      email: '',
      password: '',
      confirmPassword: ''
    }
  },
  validations: {
    email: {
      required,
      email
    },
    password: {
      required,
      minLen: minLength(6)
    },
    confirmPassword: {
      required,
      same: sameAs('password')
    }
  },
  methods: {
    signUp () {
      const signUpData = {
        email: this.email,
        password: this.password
      }

      this.$store.dispatch('signUp', signUpData)
      this.$router.push({ name: 'home' })
    }
  }
}

</script>

<style lang="scss" scoped>
  @import "@/styles/variables.scss";

  .signup-form {
    max-width: 500px;
    margin: 0 auto;
    border: 1px solid $blue-grey;
  }
</style>
