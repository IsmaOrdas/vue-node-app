<template>
  <div class="signin-form">
    <form-alert :show="showAlert" type='error'></form-alert>
    <user-form @formSubmitted="dispatchLogin"></user-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import UserForm from '@/components/Forms/UserForm';
import FormAlert from '@/components/Forms/FormAlert'
export default {
  name: "SigninForm",
  components: {
    FormAlert,
    UserForm
  },
  data () {
    return {
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