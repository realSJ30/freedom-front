import axios from "axios";
import jsCookie from "js-cookie";
import Api from ".";


const api = new Api();

export default class AuthenticationApi {

    // coat with csrf for secured api calling
    getCsrfApi = () => {
        return api.init().get('/sanctum/csrf-cookie/');
    }

    // login
    loginApi = (credentials) => {
        return api.init().post('/login', credentials)
    }

    // logout
    logoutApiWeb = () => {
        return api.init().post('/logout')
    }

    // logout
    logoutApi = () => {
        return api.init().post('/api/logout')
    }

    // fetch authenticated user
    fetchAuthenticatedUserApi = () => {
        return api.init().get('/api/me')
        // return axios.create({
        //     baseURL: process.env.REACT_APP_API_URL,
        //     headers: {
        //         Accept: "application/json",
        //         Authorization: `Bearer ${jsCookie.get('_t')}`
        //     },
        //     timeout: 120000
        // }).get('/api/user/my-profile')
    }
}