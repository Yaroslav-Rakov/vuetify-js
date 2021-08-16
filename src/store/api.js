import axios from 'axios'
// import { setAccessToken, getAccessToken, clearAccessToken } from './auth'

axios.defaults.headers.post['Content-Type'] = 'application/json'


export const baseURL = process.env.VUE_APP_BASE_URI ? process.env.VUE_APP_BASE_URI : '/api'

const api = axios.create({
    baseURL: 'https://nodejs-test-api-blog.herokuapp.com/api/v1/'
})
api.defaults.headers.common['Authorization'] = localStorage.token;


export default api