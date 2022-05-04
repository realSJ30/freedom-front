import axios from "axios";
import jsCookie from "js-cookie";

export default class Api {

    constructor() {
        this.client = null;
        this.api_url = process.env.REACT_APP_API_URL;
    }

    init = () => {

        let headers = {
            Accept: "application/json",            
        };

        this.client = axios.create({
            baseURL: this.api_url,
            timeout: 120000,
            headers: headers,
            withCredentials: true,
        });

        this.client.interceptors.response.use(response => response, error => {
            console.log(error)
            if (error.response.status === 401) {
                jsCookie.remove('isAuthenticated', { expires: 86400, sameSite: 'lax' })
                window.location.pathname = '/';
                return Promise.reject()
            }
            return Promise.reject(error)
        })

        return this.client;
    }

   
}