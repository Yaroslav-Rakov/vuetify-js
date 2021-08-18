import { setAccessToken } from './auth.js'


export default {

  SET_AUTH_DATA(state, response) {
    state.userAuthData = response
  },
  SET_TOKEN(state, response) {
    state.token = response
    setAccessToken(response)

    console.log('SET_TOKEN state', state);
  },
  SET_POSTS_PAGE(state, response) {
    state.postsByPage = response
  },
  SET_ALLPOSTS_SEARCH(state, response) {
    state.allPostsSearch = response
  },
  search(state, response) {
    state.search = response
  },
  postsPerPage(state, response) {
    state.postsPer = response
  }
      // routePage(state, response){
      //   state.routePage = response
      // }
}