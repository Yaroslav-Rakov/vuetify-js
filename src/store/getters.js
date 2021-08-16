export default {

    GET_AUTH_DATA(state) {
        console.log(state.userAuth);
        return state.userAuth;
    },
    GET_LOGIN(state) {
        console.log(state.userLogin);
        return state.userLogin;
    },
    GET_POSTS_DATA(state) {
        console.log(state.allPosts);
        return state.allPosts;
    },
    GET_POSTS_LENGTH(state) {
        console.log(state.allPostsLength);
        return state.allPostsLength;
    },
    GET_POSTS_SEARCH(state) {
        console.log(state.allPostsSearch);
        return state.allPostsSearch;
    }

}

