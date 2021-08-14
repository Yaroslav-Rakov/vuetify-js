import Vue from 'vue'
import Vuex from 'vuex'
import request from'./config.js'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: window.localStorage.token,
    userAuth: {},
    allPosts: [],
    createPost: {},
    userLogin: {},
    userRegister: {},
    allPostsLength: 0,
    allPostsSearch: [],
    limit: 7,
    skip: 0,
    currentPage: 1,
    search: ''
  },
    mutations: {
        CURRENT_PAGE_LIM(state,  limit ) {
            state.limit =  limit
        },
        CURRENT_PAGE_SKIP(state, skip ) {
                state.skip =  skip 
        },
        NEW_LIMIT(state, limit) {
            state.limit += limit
        },

    SET_AUTH_DATA(state, response) {
      state.userAuth = response
      // localStorage.name = response.name,
      // localStorage.email = response.email
    },
    SET_LOGIN(state, response) {
      state.userLogin = response
    },
    SET_TOKEN(state, response) {
      state.token = response
      localStorage.token = response
      console.log('SET_TOKEN state', state);
    },
    SET_REGISTER_DATA(state, response) {
        state.userRegister = response
        state.userLogin = response
      },
      SET_POSTS_DATA(state, response) {
          state.allPosts = response
        },
        SET_POSTS_DATA_LENGTH(state, response) {
            state.allPostsLength = Math.ceil(response.length / state.limit)
            state.allPostsSearch = response

        },
 
  },
    actions: {
        ACTION_POSTS_DATA({ commit, state }) {
            console.log('ACTION_POSTS_DATA works');
            request.get("posts?limit="+state.limit+'&skip='+state.skip)
                .then((response) => {
                    commit('SET_POSTS_DATA', response.data)
                });
        },
        ACTION_POSTS_DATA_LENGTH({ commit }) {
            console.log('ACTION_POSTS_DATA works');
            request.get("posts?limit=1000000000")
                .then((response) => {
                    commit('SET_POSTS_DATA_LENGTH', response.data)
                });
        },
    ACTION_REGISTER_DATA({ commit, state }) {
   request
        .post("users", state.userRegister)
        .then((response) => {
          commit('SET_REGISTER_DATA', response.data);
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
      },

    ACTION_LOGIN({ commit, state }) {
      return new Promise((resolve, reject) => {

   request
        .post("auth", state.userLogin)
        .then((response) => {
          commit('SET_TOKEN', response.data.token);
          resolve({ name: 'Home' });
        })
        .catch((error) => {
          console.error("There was an error!", error);
          reject(error);
        });
      });

    },
    ACTION_AUTH_DATA({ commit }) {
      console.log('ACTION_AUTH_DATA works');
      if (localStorage.token) {
        request.get('auth/user', {
          headers: { authorization: localStorage.token },
        }).then(response => { commit('SET_AUTH_DATA', response.data) })
      }
    },
  },
  modules: {
  },
  getters: {
    GET_AUTH_DATA(state) {
      console.log(state.userAuth);
      return state.userAuth;
    },
    GET_LOGIN(state) {
      console.log(state.userLogin);
      return state.userLogin;
    },
    GET_REGISTER_DATA(state) {
      console.log(state.userRegister);
      return state.userRegister;
      },
      GET_POSTS_DATA(state) {
          console.log(state.allPosts);
          return state.allPosts;
      },
      GET_POSTS_LENGTH(state) {
          console.log(state.allPostsLength);
          return state.allPostsLength;
      },
      GET_POSTS_SEARCH(state) {
          console.log(state.allPostsSearch);
          return state.allPostsSearch;
      }
  }
})
