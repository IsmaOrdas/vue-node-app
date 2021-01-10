<template>
  <div class="library__register">
    <form @submit.prevent="sendForm" action="" method="post">
      <div class="mb-8">
        <label class="label" for="username">Usuario</label>
        <input v-model='form.username' type="text" name="username" id="username" class="input" @blur="checkUsername()">
        <label v-if="usernameError" for="">error</label>
      </div>
      <div class="mb-8">
        <label class="label" for="password">Contraseña</label>
        <input v-model='form.password' type="password" name="password" autocomplete="off" id="password" class="input" @blur="checkPassword()">
        <label v-if="passwordError" for="">error</label>
      </div>
      <div>
        <button class="btn" :disabled="submitDisabled">Crear cuenta</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "UserForm",
  data () {
    return {
      form: {
        username: '',
        password: ''
      },
      usernameError: null,
      passwordError: null,
      validForm: false
    }
  },
  computed: {
    submitDisabled () {
      if (this.validForm && this.passwordError === false && this.usernameError === false) {
        return false;
      } else {
        return true;
      }
    }
  },
  methods: {
    checkUsername () {
      this.usernameError = !this.form.username ? true : false;
      this.validForm = this.passwordError === false && this.usernameError === false;
    },
    checkPassword () {
      this.passwordError = !this.form.password ? true : false;
      this.validForm = this.passwordError === false && this.usernameError === false;
    },
    sendForm () {
      this.$emit('formSubmitted', this.form);
    }
  }
}
</script>

<style scoped>

</style>