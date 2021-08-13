import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

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
      state.userAuth = response,
      localStorage.name = response.name,
      localStorage.email = response.email
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
      axios
        .post("https://nodejs-test-api-blog.herokuapp.com/api/v1/users", state.userRegister)
        .then((response) => {
          commit('SET_REGISTER_DATA', response.data.token);
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
    },
    ACTION_LOGIN({ commit, state }) {
      return new Promise((resolve, reject) => {

      axios
        .post("https://nodejs-test-api-blog.herokuapp.com/api/v1/auth", state.userLogin)
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
    ACTION_AUTH_DATA({ commit, state }) {
      console.log('ACTION_AUTH_DATA works');
      if (localStorage.token) {
        axios.defaults.headers.common["Authorization"] = localStorage.token;
        console.log('Token: ' + axios.defaults.headers.common["Authorization"]);

        axios.get('https://nodejs-test-api-blog.herokuapp.com/api/v1/auth/user', {
          headers: { authorization: localStorage.token },
        }).then(response => { commit('SET_AUTH_DATA', response.data), state.authToken = localStorage.token })
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
