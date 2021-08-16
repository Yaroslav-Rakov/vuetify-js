import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters.js'
import mutations from './mutations.js'
import actions from './actions.js'



Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: window.localStorage.token,
    userAuthData: [],
    postsByPage: [],
    allPostsLength: null,
    allPostsSearch: []
  },
  mutations,
  actions,
  getters,
})
