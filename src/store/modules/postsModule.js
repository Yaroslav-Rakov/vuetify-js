import api from '../api.js'

const postsModule = {
  state: {
    postsByPage: [],
    allPostsSearch: [],
    search: "",
    routePage: 1,
    lim: 7
  },
  mutations: {
    SET_POSTS_PAGE(state, response) {
      state.postsByPage = response
    },
    SET_ALLPOSTS_SEARCH(state, response) {
      state.allPostsSearch = response
    },
    SEARCH(state, response) {
      state.search = response
    },
    POSTS_PER_PAGE(state, response) {
      state.postsPer = response
    },
    NEW_LIMIT(state, response) {
      state.lim = response
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
  },
  actions: {
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