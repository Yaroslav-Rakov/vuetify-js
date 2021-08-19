import Vue from 'vue'
import Vuex from 'vuex'
import userModule from './userModule.js'
import postsModule from './postsModule.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    userModule,
    postsModule
  }
})
