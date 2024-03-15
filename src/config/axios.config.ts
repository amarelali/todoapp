import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://todoapi-rt17.onrender.com/api",
    // timeout: 1000,
});

export default axiosInstance;