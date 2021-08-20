import api from '../api.js'

const postsModule = {
  state: {
    posts: [],
    search: "",
    routePage: 1,
    lim: 7,
    paginationPages: null,
    postsPerPage: 7
  },
  mutations: {
    SET_POSTS(state, response) {
      state.posts = response
    },
    SET_SEARCH(state, response) {
      state.search = response
    },
    NEW_LIMIT(state, response) {
      state.lim = response
    },
    SET_PAGINATION_PAGES(state, response) {
      state.paginationPages = response
    }

  },
  getters: {
    GET_POSTS(state) {
      console.log(state.posts);
      return state.posts;
    },
    GET_POSTS_LENGTH(state) {
      console.log(state.posts);
      return state.posts.length;
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

    ACTION_PAGINATION_PAGES({ commit, state }) {
      api.get("posts?limit=1000000000")
      .then((response) => {
          commit('SET_PAGINATION_PAGES', Math.ceil(response.data.length / state.postsPerPage))
      },);
    },

    ACTION_POSTS({ commit, state }, page) {
      console.log('inside ACTION_POSTS function');

      if (state.search !== null && state.search.length > 0) {
        if (!page) page = 1
        api.get("posts?limit=1000000000")
          .then((response) => {
            commit('SET_POSTS', response.data.data.filter((post) => {
              return post.title.toLowerCase().includes(state.search.toLowerCase());
            }),)
          }, );
      } else {
        api.get("posts?limit=" + state.lim + '&skip=' + (page - 1) * state.lim)
          .then((response) => {
            commit('SET_POSTS', response.data.data.filter((post) => {
              let checkNull =
                state.search === null
                  ? state.posts
                  : post.title.toLowerCase().includes(state.search.toLowerCase());
              return checkNull;
            }))
          }).catch((error) => {
            console.error("There was an error!", error);
          });
      }
    },
  }
}

export default postsModule