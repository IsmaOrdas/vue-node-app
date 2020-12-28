import { login, register } from '@/api/users.api.js';

const state = {
  user: null,
  isLoggedIn: {}
}

const getters = {
  user: state => state.user,
  isLoggedIn: state => { console.log(Object.keys(state.isLoggedIn).length); return Object.keys(state.isLoggedIn).length > 0 ? true : false }
}

const actions = {
  async registration ({commit}, data) {
    try {
      let registerForm = {
        username: data.username,
        password: data.password
      }

      const user = await register(registerForm);
      // Log user in automatically
      commit('loginSuccess', user.data)
      return user;

    } catch (error) {
      console.error(error);
      return false;
    }
  },
  async logUser ({commit}, data) {
    try {
      let loginForm = {
        username: data.username,
        password: data.password
      }

      const user = await login(loginForm);
      commit('loginSuccess', user.data)
      
      return user;
    } catch (error) {
      commit('loginFailure')
      console.error(error);
      return false;
    }
  },
  logout ({ commit }) {
    commit('logout');
  }
}

const mutations = {
  logout (state) {
    state.user = null;
    state.isLoggedIn = {};
  },
  loginSuccess (state, user) {
    state.user = user;
    state.isLoggedIn = { loggedIn: true };
  },
  loginFailure (state) {
    state.user = null;
    state.isLoggedIn = {};
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}