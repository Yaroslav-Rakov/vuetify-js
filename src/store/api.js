import axios from 'axios'

import { getAccessToken } from './auth'


axios.defaults.headers.post['Content-Type'] = 'application/json'


export const baseURL = process.env.VUE_APP_BASE_URI ? process.env.VUE_APP_BASE_URI : '/api'

const api = axios.create({
    baseURL
})
api.defaults.headers.common['Authorization'] = getAccessToken();

api.interceptors.response.use((response) => {
    console.log('api.interceptors.response.use');
    if (response.status === 200) {
        console.log('Reuqest: ' + response.config.url + ', status: ' + response.status);
    }
    return response;
}, (error) => {

    switch (error.response.status) {
        case 400:
            alert(error.response.data.error)
            break;
        case 401:
            alert(error.response.data.error)
            break;
        case 404:
            alert(error.response.data.error)
            break;
        case 500:
            alert(error.response.data.error)
            break;
    }

    if (error.response && error.response.data) {
        return Promise.reject(error.response.data);
    }
    return Promise.reject(error.message);
});


export default api