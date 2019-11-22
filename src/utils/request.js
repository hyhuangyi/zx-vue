import axios from 'axios';
import globalApi from './globalApi';
import qs from 'qs';

console.log(globalApi.baseURL)

const service = axios.create({
    baseURL: globalApi.baseURL,
    timeout: 5000
});

service.interceptors.request.use(
    config => {
        if(config.method=="post"){
            config.data = qs.stringify(config.data);
            config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
        }
        return config;
    },
    error => {
        console.log(error);
        return Promise.reject();
    }
);

service.interceptors.response.use(
    response => {
        if (response.status === 200) {
            return response.data;
        } else {
            Promise.reject();
        }
    },
    error => {
        console.log(error);
        return Promise.reject();
    }
);

export default service;