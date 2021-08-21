import api from '../api.js'
import router  from '@/router'

const postsModule = {
  state: {
    posts: [],
    search: "",
    postsLimit: 7,
    paginationPages: null,
    pageUrl: 1,
    totalPosts: null
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
      },
      SET_TOTAL_POSTS(state, totalPosts) {
          state.totalPosts = totalPosts
      },
    SET_PAGE_URL(state, pageUrl) {
      state.pageUrl = pageUrl
    }

  },
  getters: {
    GET_POSTS(state) {
      console.log(state.posts);
      return state.posts;
      },

    GET_TOTAL_POSTS(state) {
        console.log(state.totalPosts);
          return state.totalPosts;
      },

    GET_POSTS_LIMIT(state) {
       console.log(state.postsLimit);
        return state.postsLimit;
      },

    GET_PAGE_URL(state) {
        console.log(state.pageUrl);
        return state.pageUrl;
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

     ACTION_PAGE_URL({ commit }, value) {
          commit("SET_PAGE_URL", value);
      },

    ACTION_NEW_POSTS_LIMIT({commit}, val) {
      commit("SET_NEW_POSTS_LIMIT", val)
    },

      ACTION_POSTS({ commit, state, dispatch }, page) {
          console.log('inside ACTION_POSTS function');
         // console.log('Check router search: ' + route.query);

      let search = 'search='+state.search+'&';
        if (page) {
            state.pageUrl = page
        } else {
            page = state.pageUrl
        }

        if (!state.search) search ='';
        api.get("posts?" + search + "limit=" + state.postsLimit + '&skip=' + (state.pageUrl - 1) * state.postsLimit)
          .then((response) => {
              commit('SET_POSTS', response.data.data), commit("SET_PAGINATION_PAGES", response.data.pagination.total);
              if (response.data.data.length === 0) {
                  console.log('POSTS length from ACTION: ' + response.data.data.length);
                  if (state.search.length > 0) {
                      router.push({ path: "", query: { page: 1, perPage: state.postsLimit, search: state.search } });
                  } else {
                      router.push({ path: "", query: { page: 1, perPage: state.postsLimit } });
                  }
                  dispatch('ACTION_POSTS', 1);
              }
          }).catch((error) => {
            console.error("There was an error!", error);
          });
      },

      ACTION_TOTAL_POSTS({ commit }) {
          api.get("posts")
              .then((response) => {
                  commit("SET_TOTAL_POSTS", response.data.pagination.total)
              }).catch((error) => {
                  console.error("There was an error!", error);
              });
      }
  }
}

export default postsModule