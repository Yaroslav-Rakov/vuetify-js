import api from '../api.js'
import router  from '@/router'

const postsModule = {
  state: {
    posts: [],
    search: "",
    postsLimit: 7,
    paginationPages: null,
    pageUrl: 1,
    totalPosts: null,
    sort: [{ title: "By title" }, { title: "By description" }, { title: "New posts first" }, { title: "Old posts first" }],
    sortChoice: ""
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
      },
      SET_SORT(state, choice) {
          state.sortChoice = choice
          if (state.sortChoice === 'By title') {
              state.posts.sort((a, b) => (a.title.toLowerCase() > b.title.toLowerCase()) ? 1 : -1)
          }
          if (state.sortChoice === 'By description') {
              state.posts.sort((a, b) => (a.description.toLowerCase() > b.description.toLowerCase()) ? 1 : -1)
          }
          if (state.sortChoice === 'New posts first') {
              state.posts.sort((a, b) => (a.dateCreated.toLowerCase() > b.dateCreated.toLowerCase()) ? 1 : -1)
          }
          if (state.sortChoice === 'Old posts first') {
              state.posts.sort((a, b) => (a.dateCreated < b.dateCreated) ? 1 : -1)
          }
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
      ACTION_SORT({ commit }, value) {
          commit("SET_SORT", value);
      },

     ACTION_PAGE_URL({ commit }, value) {
          commit("SET_PAGE_URL", value);
      },

    ACTION_NEW_POSTS_LIMIT({commit}, val) {
      commit("SET_NEW_POSTS_LIMIT", val)
    },

      ACTION_POSTS({ commit, state, dispatch }, page) {
          console.log('inside ACTION_POSTS function');

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
                  if (state.search && state.search.length > 0) {
                      router.push({ path: "", query: { page: 1, perPage: state.postsLimit, search: state.search } });
                  } else {
                      router.push({ path: "", query: { page: state.paginationPages, perPage: state.postsLimit } });
                  }
                  dispatch('ACTION_POSTS', state.paginationPages);
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