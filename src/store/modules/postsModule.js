import api from '../api.js'

const postsModule = {
  state: {
    posts: [],
    search: "",
    routePage: 1,
    lim: 7,
    paginationPages: null,
    postsPerPage: 7,
  },
  mutations: {
    SET_POSTS(state, response) {
      state.posts = response
    },
    SET_SEARCH(state, response) {
      state.search = response
    },
    SET_NEW_LIMIT(state, response) {
      state.lim = response
      state.postsPerPage = response
    },
    SET_PAGINATION_PAGES(state, response) {
      state.paginationPages = Math.ceil(response/state.postsPerPage)
    }

  },
  getters: {
    GET_POSTS(state) {
      console.log(state.posts);
      return state.posts;
    },

    GET_SEARCH(state) {
      console.log(state.search);
      return state.search;
    },
    GET_PAGINATION_PAGES (state) {
      console.log(state.paginationPages);
      return state.paginationPages;
    }

  },
  actions: {
    ACTION_SEARCH({ commit }, value) {
      commit("SET_SEARCH", value);
    },

    ACTION_NEW_LIMIT({commit}, val) {
      commit("SET_NEW_LIMIT", val)
    },

    ACTION_POSTS({ commit, state }, page) {
      console.log('inside ACTION_POSTS function');
      let search = 'search='+state.search+'&';
        if (!page) page = 1
        if (!state.search) search =''
        api.get("posts?"+ search +"limit=" + state.lim + '&skip=' + (page - 1) * state.lim)
          .then((response) => {
            commit('SET_POSTS', response.data.data), commit("SET_PAGINATION_PAGES",response.data.pagination.total)
          }).catch((error) => {
            console.error("There was an error!", error);
          });
    },
  }
}

export default postsModule