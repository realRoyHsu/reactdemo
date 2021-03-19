import axios from "axios";

const instance = axios.create({
  baseURL: "",
  timeout: 5000,
  headers: { "X-Requested-With": "XMLHttpRequest" },
});

// http request 拦截器
instance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers.authorization = token; //请求头加上token
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

instance.interceptors.response.use(
  (response) => {
    if (response.status === 200) {
      return Promise.resolve(response.data.data);
    } else {
      return Promise.reject(response.data.data);
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
