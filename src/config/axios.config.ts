import axios from "axios";

const axiosInstance = axios.create({
    // baseURL: "https://todoapi-rt17.onrender.com/api",
    baseURL: "http://localhost:1337/api",
    // timeout: 1000,
});

export default axiosInstance;