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
    },
    GET_SEARCH(state) {
        console.log(state.search);
        return state.search;
    },
    GET_FILTERED_POSTS(state){
        if (state.search !== null && state.search.length > 0) {
            return state.allPostsSearch.filter((post) => {
                return post.title.toLowerCase().includes(state.search.toLowerCase());
            });
        } else {
            return state.postsByPage.filter((post) => {
                let checkNull =
                    state.search === null
                        ? state.postsByPage
                        : post.title.toLowerCase().includes(state.search.toLowerCase());
                return checkNull;
            });
        }
    },

   

}

