import axios from 'axios'

const request = axios.create({
    baseURL: 'https://nodejs-test-api-blog.herokuapp.com/api/v1/'
});
request.defaults.headers.common['Authorization'] = localStorage.token;

export default request