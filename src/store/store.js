import Vue from 'vue'
import Vuex from 'vuex'
import request from'./config.js'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: window.localStorage.token,
    userAuth: {},
    getPosts: {},
    getPost: {},
    createPost: {},
    userLogin: {},
    userRegister: {}
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
    SET_REGISTER_DATA(state, response) {
      state.userRegister = response
    },
  },
  actions: {
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
    }
  }
})
