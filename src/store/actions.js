import api from './api.js'

export default {

    ACTION_POSTS_DATA({ commit }, page) {
        console.log('ACTION_POSTS_DATA works');
        api.get("posts?limit=" + 7 + '&skip=' + (page - 1) * 7)
            .then((response) => {
                commit('SET_POSTS_DATA', response.data)
            });
    },
    ACTION_POSTS_DATA_SEARCH({ commit }) {
        console.log('ACTION_POSTS_DATA works');
        api.get("posts?limit=1000000000")
            .then((response) => {
                commit('SET_POSTS_DATA_SEARCH', response.data)
            });
    },
    ACTION_REGISTER_DATA(commit, user) {
        return new Promise((resolve, reject) => {
            commit = null;
            api
                .post("users", user)
                .then((response) => {
                    (console.log(response.data))
                    resolve({ name: 'Login' });
                }).catch((error) => {
                    console.error("There was an error!", error);
                    reject(error);
                });
        });
    },

    ACTION_LOGIN({ commit, state }) {
        return new Promise((resolve, reject) => {
            api
                .post("auth", state.userLogin)
                .then((response) => {
                    commit('SET_TOKEN', response.data.token);
                    resolve({ name: 'Home' });
                })
                .catch((error) => {
                    console.error("There was an error!", error);
                    reject(error);
                });
        });

    },
    ACTION_AUTH_DATA({ commit }) {
        console.log('ACTION_AUTH_DATA works');
        if (localStorage.token) {
            api.get('auth/user', {
                headers: { authorization: localStorage.token },
            }).then(response => { commit('SET_AUTH_DATA', response.data) })
        }
    },
}