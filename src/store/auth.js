export const ACCESS_TOKEN_KEY = 'token';



   export function getAccessToken() {
        return localStorage.token
    }
    
    export function clearAccessToken() {
        localStorage.removeItem(ACCESS_TOKEN_KEY)
    }
    
    export function setAccessToken(accessToken) {
        localStorage.setItem(ACCESS_TOKEN_KEY, accessToken)
    }
    
    export function hasToken() {
        const accessToken = this.getAccessToken()
        return !!accessToken
    }

    export default {}

