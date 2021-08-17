import api from './api.js'

api.interceptors.response.use((response) => {
    if(response.status === 401) {
         alert("You are not authorized");
    }
    return response;
}, (error) => {
    if (error.response && error.response.data) {
        return Promise.reject(error.response.data);
    }
    return Promise.reject(error.message);
});