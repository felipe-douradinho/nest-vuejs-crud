import axios from "axios";
import type { AxiosInstance } from "axios";

const apiClient: AxiosInstance = axios.create({
    baseURL: "http://127.0.0.1:4000/api", //process.env.API_URL,
    headers: {
        "Content-type": "application/json",
    },
});

export default apiClient;