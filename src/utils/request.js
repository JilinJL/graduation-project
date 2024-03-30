import axios from 'axios';

const request = axios.create({
  baseURL: 'http://localhost:8099/api',    //本地测试
//   baseURL: 'http://api.example.com',    //外网
  timeout: 5000,
});

// 添加请求拦截器
request.interceptors.request.use(
  function(config) {
    // 带上token
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function(error) {
    alert(error.message);
  }
);



export default request;
