import api from '../api.js'

const postsModule = {
  state: {
    posts: [],
    search: "",
    routePage: 1,
    postsLimit: 7,
    paginationPages: null,
  },
  mutations: {
    SET_POSTS(state, posts) {
      state.posts = posts
    },
    SET_SEARCH(state, search) {
      state.search = search
    },
    SET_NEW_POSTS_LIMIT(state, postsLimit) {
      state.postsLimit = postsLimit
    },
    SET_PAGINATION_PAGES(state, pages) {
      state.paginationPages = Math.ceil(pages/state.postsLimit)
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

    ACTION_NEW_POSTS_LIMIT({commit}, val) {
      commit("SET_NEW_POSTS_LIMIT", val)
    },

    ACTION_POSTS({ commit, state }, page) {
      console.log('inside ACTION_POSTS function');
      let search = 'search='+state.search+'&';
        if (!page) page = 1
        if (!state.search) search =''
        api.get("posts?"+ search +"limit=" + state.postsLimit + '&skip=' + (page - 1) * state.postsLimit)
          .then((response) => {
            commit('SET_POSTS', response.data.data), commit("SET_PAGINATION_PAGES",response.data.pagination.total)
          }).catch((error) => {
            console.error("There was an error!", error);
          });
    },
  }
}

export default postsModule