export default {

    GET_AUTH_DATA(state) {
        console.log(state.userAuthData);
        return state.userAuthData;
    },
    GET_POSTS_PAGE(state) {
        console.log(state.postsByPage);
        return state.postsByPage;
    },
    GET_POSTS_LENGTH(state) {
        console.log(state.allPostsLength);
        return state.allPostsLength;
    },
    GET_ALLPOSTS_SEARCH(state) {
        console.log(state.allPostsSearch);
        return state.allPostsSearch;
    }

}

