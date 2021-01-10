<template>
  <div class="library__register">
    <form-alert :show="showAlert" type='error'>error api</form-alert>
    <user-form @formSubmitted="dispatchRegisterUser"></user-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import UserForm from '@/components/Forms/UserForm';
import FormAlert from '@/components/Forms/FormAlert'
export default {
  name: "SignupForm",
  components: {
    UserForm,
    FormAlert
  },
  data () {
    return {
      showAlert: false
    }
  },
  methods: {
    ...mapActions([
      'registration'
    ]),
    async dispatchRegisterUser (formData) {
      const registered = await this.registration({...formData});

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