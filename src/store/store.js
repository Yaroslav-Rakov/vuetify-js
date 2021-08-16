import Vue from 'vue'
import Vuex from 'vuex'
import request from './config.js'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: window.localStorage.token,
    userAuth: {},
    allPosts: [],
    createPost: {},
    userLogin: {},
    allPostsLength: null,
    allPostsSearch: [],
    limit: 7
  },
  mutations: {

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
    SET_POSTS_DATA(state, response) {
      state.allPosts = response
    },
    SET_POSTS_DATA_SEARCH(state, response) {
      state.allPostsSearch = response
    },

  },
  actions: {
    ACTION_POSTS_DATA({ commit }, page) {
      console.log('ACTION_POSTS_DATA works');
      request.get("posts?limit=" + 7 + '&skip=' + (page - 1) * 7)
        .then((response) => {
          commit('SET_POSTS_DATA', response.data)
        });
    },
    ACTION_POSTS_DATA_SEARCH({ commit }) {
      console.log('ACTION_POSTS_DATA works');
      request.get("posts?limit=1000000000")
        .then((response) => {
          commit('SET_POSTS_DATA_SEARCH', response.data)
        });
    },
    ACTION_REGISTER_DATA(commit, user) {
      return new Promise((resolve, reject) => {
        commit = null;
        request
          .post("users", user)
          .then((response) => {
            (console.log(response.data))
            resolve({ name: 'Login' });
          }).catch((error) => {
            console.error("There was an error!", error);
            reject(error);
          });
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
  getters: {
    GET_AUTH_DATA(state) {
      console.log(state.userAuth);
      return state.userAuth;
    },
    GET_LOGIN(state) {
      console.log(state.userLogin);
      return state.userLogin;
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
