import axios from 'axios';
import { getEnvironment } from '../helpers/getEnvironment';

const {VITE_API_URL} = getEnvironment();

const calendarAPI = axios.create({
    baseURL: VITE_API_URL
});

// TODO: Configurar interceptores que se ejecutan antes de cada petición
calendarAPI.interceptors.request.use(config => {

    config.headers = {
        ...config.headers,
        'x-token': localStorage.getItem('token'),
    }

    return config;
});

export default calendarAPI;