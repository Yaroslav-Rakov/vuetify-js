import api from './api.js'
import { getAccessToken } from './auth.js'

export default {

    ACTION_POSTS_PAGE({ commit }, page) {
        let limit = 7;
        console.log('ACTION_POSTS_DATA works');
        api.get("posts?limit=" + limit + '&skip=' + (page - 1) * limit)
            .then((response) => {
                commit('SET_POSTS_PAGE', response.data)
            });
    },
    ACTION_ALLPOSTS_SEARCH({ commit }) {
        console.log('ACTION_POSTS_DATA works');
        api.get("posts?limit=1000000000")
            .then((response) => {
                commit('SET_ALLPOSTS_SEARCH', response.data)
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

    ACTION_LOGIN({ commit }, user) {
        return new Promise((resolve, reject) => {
            api
                .post("auth", user)
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
        if (getAccessToken()) {
            api.get('auth/user', {
                headers: { authorization: getAccessToken() },
            }).then(response => { commit('SET_AUTH_DATA', response.data) })
        }
    },
}