import axios from 'axios';
axios.defaults.baseURL = ""
axios.defaults.headers ["Content-Type"] = "application/x-www-form-urlencoded; charset=UTF-8"
let instance = axios.create({timeout: 1000 * 12,baseURL:"http://124.70.8.57/"});
instance.interceptors.request.use(
    config => {
        if (sessionStorage.getItem("token")) {
            config.headers["Authorization"] = "JWT " + sessionStorage.getItem("token")
        }
        return config
    },
    error => {
        return Promise.reject(error)
    })
export default instance;