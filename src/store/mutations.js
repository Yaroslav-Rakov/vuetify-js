export default {
    
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
      }
}