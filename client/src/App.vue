<template>
  <app-header></app-header>
  <router-view />
</template>

<script>
import AppHeader from '@/components/Global/AppHeader/AppHeader'
export default {
  name: 'App',
  components: {
    AppHeader
  },
  mounted () {
    if (localStorage.getItem('_token')) {
      this.$store.commit('loginSuccess', JSON.stringify(localStorage.getItem('_user')))
    }
  },
  created () {

  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
