import axios from "axios";
import {getItem} from "@/helpers/persistanceStorage";

axios.defaults.baseURL = 'https://api.realworld.io/api'

axios.interceptors.request.use(config => {
    const token = getItem('accessToken')
    config.headers.Authorization = token ? `Token ${token}` : ''
    return config
})

export default axios