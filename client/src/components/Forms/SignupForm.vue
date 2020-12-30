<template>
  <div class="library__register">
    <alert-box :show="showAlert" type='error'></alert-box>
    <form @submit.prevent="dispatchRegisterUser" action="" method="post">
      <div class="mb-8">
        <label class="label" for="username">Usuario</label>
        <input v-model='form.username' type="text" name="username" id="" class="input">
      </div>
      <div class="mb-8">
        <label class="label" for="password">Contraseña</label>
        <input v-model='form.password' type="password" name="password" autocomplete="off" id="" class="input">
      </div>
      <div>
        <button class="btn">Entrar</button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import AlertBox from '@/components/AlertBox'
export default {
  name: "SignupForm.vue",
  components: {
    AlertBox
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
      'registration'
    ]),
    async dispatchRegisterUser () {
      const registered = await this.registration({...this.form});
      if (!registered) {
        this.showAlert = true;
        return false;
      }

      if (this.showAlert === true) {
        this.showAlert = false;
      }
      localStorage.setItem('_token', registered.data.token)
      localStorage.setItem('_user', JSON.stringify(registered.data.user))
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss" scoped>
.library {
  &__register {
     width: 500px;
   }
}
</style>