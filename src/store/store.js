import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters.js'
import mutations from './mutations.js'
import actions from './actions.js'
import { getAccessToken } from './auth.js'



Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: getAccessToken(),
    userAuthData: [],
    postsByPage: [],
    allPostsSearch: [],
    search: "",
    routePage: 1,
    lim: 7
  },
  mutations,
  actions,
  getters,
})
