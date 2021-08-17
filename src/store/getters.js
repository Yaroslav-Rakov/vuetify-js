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
    GET_FILTERED_POSTS(){
        console.log(this.checkfunc())
        return this.filteredListSearch
    },

    checkfunc() {
        console.log('works')
    }

    // filteredList(state) {
    //     return this.GET_POSTS_PAGE.filter((post) => {
    //       let checkNull =
    //         state.search === null
    //           ? this.GET_POSTS_PAGE
    //           : post.title.toLowerCase().includes(state.search.toLowerCase());
    //       return checkNull;
    //     });
    //   },
    //   filteredListSearch(state) {
    //     if (state.search !== null && state.search.length > 0) {
    //       return this.GET_ALLPOSTS_SEARCH.filter((post) => {
    //         let checkNull =
    //           state.search === null
    //             ? this.filteredList
    //             : post.title.toLowerCase().includes(state.search.toLowerCase());
    //         return checkNull;
    //       });
    //     } else {
    //       return this.filteredList;
    //     }
    //   },

}

