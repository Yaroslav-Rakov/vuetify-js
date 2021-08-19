import api from '../api.js'

const postsModule = {
  state: {
    posts: [],
    search: "",
    routePage: 1,
    lim: 7
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

  },
  actions: {
    ACTION_SEARCH({ commit }, value) {
      commit("SET_SEARCH", value);
    },

    ACTION_POSTS({ commit, state }, page) {
      console.log('inside ACTION_POSTS function');

      if (state.search !== null && state.search.length > 0) {
        if (!page) page = 1
        api.get("posts?limit=1000000000")
          .then((response) => {
            commit('SET_POSTS', response.data.filter((post) => {
              return post.title.toLowerCase().includes(state.search.toLowerCase());
            }))
          });
      } else {
        api.get("posts?limit=" + state.lim + '&skip=' + (page - 1) * state.lim)
          .then((response) => {
            commit('SET_POSTS', response.data.filter((post) => {
              let checkNull =
                state.search === null
                  ? state.posts
                  : post.title.toLowerCase().includes(state.search.toLowerCase());
              return checkNull;
            }))
          });
      }
    },
  }
}

export default postsModule