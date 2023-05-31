import {
    BASE_URL,
    HEADERS
} from './interface'

import axios from 'axios'


const request = axios.create({
    headers: HEADERS,
    baseURL: BASE_URL,
});

axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    return {...config, headers: HEADERS};
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    console.log(error);
    return Promise.reject(error); 
});

export const Authorization =  HEADERS['Authorization']



export default request