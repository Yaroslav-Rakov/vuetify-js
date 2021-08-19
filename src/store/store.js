import Vue from 'vue'
import Vuex from 'vuex'
import userModule from './modules/userModule.js'
import postsModule from './modules/postsModule.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    userModule,
    postsModule
  }
})
