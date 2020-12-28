import { getBooks } from '@/api/books.api.js';

const state = {
  books: []
}

const getters = {
  books: state => state.books
}

const actions = {
  async fetchBooks ({commit}) {
    try {
      const books = await getBooks();
      commit('SET_BOOKS', books);
    } catch (error) {
      console.error(error)
    }
  }
}

const mutations = {
  SET_BOOKS: (state, data) => {
    state.books = data;
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}