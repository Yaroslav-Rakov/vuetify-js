import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters.js'
import mutations from './mutations.js'
import actions from './actions.js'
// import auth from './auth.js'



Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // token: auth.getAccessToken,
    token: localStorage.token,
    userAuthData: [],
    postsByPage: [],
    allPostsSearch: []
  },
  mutations,
  actions,
  getters,
})
