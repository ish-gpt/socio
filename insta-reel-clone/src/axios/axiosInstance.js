import axios from "axios";
import { auth } from "../firebase";


class AxiosService {
    constructor() { 
        this.axiosInstance = axios.create({
            baseURL: 'http://localhost:8080/',
            timeout: 5*60*1000,
            headers: {
                'Content-Type': 'application/json'
            }
        });

        this.axiosInstance.interceptors.request.use(async function (config) {
            // we can do something here before sending request to server.
            return config;
        }, function (error) {
            // Do something with request error like authentication error notification
            return Promise.reject(error);
        });

    }

    async getFirebaseAuthToken() {
        let currentUser = auth.currentUser;

        if (currentUser) {
            let token = await currentUser.getIdToken();
            return token;
        } else {
            console.error('User Not Authenticated!');
            throw new Error('User Not Authenticated!');
        }
    }
    
    get(url, options) {
        this.axiosInstance.get(url, options);
    }

    post(url, data, options) {
        return this.axiosInstance.post(url, data,options);
    }

}

export default new AxiosService();