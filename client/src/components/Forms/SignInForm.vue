<template>
  <div class="signin-form">
    <form-alert :show="showAlert" type='error'></form-alert>
    <form @submit.prevent="dispatchLogin" action="" method="post">
      <div class="mb-8">
        <label class="label" for="username">Usuario</label>
        <input v-model='form.username' type="text" name="username" id="username" class="input">
      </div>
      <div class="mb-8">
        <label class="label" for="password">Contraseña</label>
        <input v-model='form.password' type="password" name="password" id="password" class="input">
      </div>
      <div>
        <button class="btn">Entrar</button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import FormAlert from '@/components/Forms/FormAlert'
export default {
  name: "SigninForm",
  components: {
    FormAlert
  },
  data () {
    return {
      form: {
        username: '',
        password: ''
      },
      showAlert: false
    }
  },
  methods: {
    ...mapActions([
      'logUser'
    ]),
    async dispatchLogin () {
      const logged = await this.logUser({...this.form})
      if (!logged) {
        this.showAlert = true;
        return false;
      }

      if (this.showAlert === true) {
        this.showAlert = false;
      }
      localStorage.setItem('_token', logged.data.token)
      localStorage.setItem('_user', JSON.stringify(logged.data.user))
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss" scoped>
.signin-form {
  width: 500px;
}
</style>