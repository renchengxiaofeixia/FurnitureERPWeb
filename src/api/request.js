import axios from 'axios'

export const url = 'http://192.168.251.249:31000'
export const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem("token") || ''
}

const request = axios.create({
    headers: headers,
    baseURL: url,
});

axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    return {...config, headers: headers};
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

export const Authorization =  headers['Authorization']



export default request