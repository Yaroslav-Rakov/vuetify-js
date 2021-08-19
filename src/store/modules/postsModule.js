import api from '../api.js'

const postsModule = {
  state: {
    postsByPage: [],
    allPostsSearch: [],
    posts: [],
    search: "",
    routePage: 1,
    lim: 7
  },
  mutations: {
    SET_POSTS(state, response) {
      state.posts = response
    },

    SET_POSTS_PAGE(state, response) {
      state.postsByPage = response
    },
    SET_ALLPOSTS_SEARCH(state, response) {
      state.allPostsSearch = response
    },
    SET_SEARCH(state, response) {
      state.search = response
    }
  },
  getters: {

    GET_POSTS_PAGE(state) {
      console.log(state.postsByPage);
      return state.postsByPage;
    },
    GET_POSTS_LENGTH(state) {
      console.log(state.allPostsLength);
      return state.allPostsLength;
    },
    GET_ALLPOSTS_SEARCH(state) {
      console.log(state.allPostsSearch);
      return state.allPostsSearch;
    },
    GET_SEARCH(state) {
      console.log(state.search);
      return state.search;
    },
    GET_FILTERED_POSTS(state) {
      if (state.search !== null && state.search.length > 0) {
        return state.allPostsSearch.filter((post) => {
          return post.title.toLowerCase().includes(state.search.toLowerCase());
        });
      } else {
        return state.postsByPage.filter((post) => {
          let checkNull =
            state.search === null
              ? state.postsByPage
              : post.title.toLowerCase().includes(state.search.toLowerCase());
          return checkNull;
        });
      }
    },
    GET_POSTS(state) {
      console.log(state.posts);
      return state.posts;
      // if (state.search !== null && state.search.length > 0) {
      //   return state.posts.filter((post) => {
      //     return post.title.toLowerCase().includes(state.search.toLowerCase());
      //   });
      // } else {
      //   return state.posts.filter((post) => {
      //     let checkNull =
      //       state.search === null
      //         ? state.posts
      //         : post.title.toLowerCase().includes(state.search.toLowerCase());
      //     return checkNull;
      //   });
      // }
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

    ACTION_POSTS_PAGE({ commit, state }, page) {
      // let limit = 7;
      console.log('ACTION_POSTS_DATA works');
      if (!page) page = 1

      api.get("posts?limit=" + state.lim + '&skip=' + (page - 1) * state.lim)
        .then((response) => {
          commit('SET_POSTS_PAGE', response.data)
        });

    },
    ACTION_ALLPOSTS_SEARCH({ commit }) {
      console.log('ACTION_POSTS_DATA works');
      api.get("posts?limit=1000000000")
        .then((response) => {
          commit('SET_ALLPOSTS_SEARCH', response.data)
        });
    }
  }
}

export default postsModule