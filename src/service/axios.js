import axios from 'axios';

const request = axios;

request.defaults.timeout = 10000;

request.interceptors.request.use(request => {
  return request;
})

request.interceptors.response.use(response => {
  if(response.status === 200){
    return response.data
  }
  return response;
})

export default request;