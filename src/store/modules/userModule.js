import api from '../api.js'
import { getAccessToken, setAccessToken } from '../auth.js'

const userModule = {
    state: {
      token: getAccessToken(),
      userAuthData: []
    },
    mutations: {
      SET_AUTH_DATA(state, response) {
        state.userAuthData = response
      },
      SET_TOKEN(state, response) {
        state.token = response
        setAccessToken(response)
  
        console.log('SET_TOKEN state', state);
      }
    },
    getters: {
      GET_AUTH_DATA(state) {
        console.log(state.userAuthData);
        return state.userAuthData;
      },
    },
    actions: {
      ACTION_REGISTER_DATA(commit, user) {
        return new Promise((resolve, reject) => {
          commit = null;
          api
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
  
      ACTION_LOGIN({ commit }, user) {
        return new Promise((resolve, reject) => {
          api
            .post("auth", user)
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
        if (getAccessToken()) {
          api.get('auth/user', {
            headers: { authorization: getAccessToken() },
          }).then(response => { commit('SET_AUTH_DATA', response.data) })
        }
      },
    }
  }

  export default userModule
