
// export const BASE_URL = 'http://192.168.251.112:5100';
export const BASE_URL = 'http://192.168.251.247:5100';

export const HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/JSON',
    'Authorization': 'Bearer ' + localStorage.getItem("token") || ''
}