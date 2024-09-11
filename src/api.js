import axios from "axios";

const api = axios.create({
  baseURL: "https://todo-redev.herokuapp.com/api",
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      config.headers["Content-Type"] = "application/json;charset=utf-8";
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
