import axios from "axios";
import { base_url } from "../baseURL/index.js";

const api = axios.create({
    baseURL: base_url,
    withCredentials: true, // send/receive cookies automatically
});

// Request interceptor → no need to attach access token manually
// because the browser sends cookies automatically
api.interceptors.request.use(
    (config) => {
        console.log(config)
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor → handle refresh token flow
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                // call refresh endpoint (backend will read refreshToken cookie)
                await axios.post(
                    `${base_url}/refresh-token`,
                    {},
                    { withCredentials: true }
                );

                // retry original request after refresh
                return api(originalRequest);
            } catch (err) {
                console.error("Refresh failed", err);

                // clear frontend state (if you’re using Zustand or context)
                localStorage.removeItem("isLogin");
                window.location.href = "/login";
            }
        }

        return Promise.reject(error);
    }
);

export default api;
