import axios from "axios";
import Cookies from "js-cookie";
import {base_url} from "../baseURL/index.js";


const api = axios.create({
    baseURL: base_url, // your backend
    withCredentials: true, // IMPORTANT to send cookies
});

// Request interceptor → attach access token
api.interceptors.request.use(
    (config) => {
        const token = Cookies.get("accessToken"); // short-lived token
        if (token) {
            config.headers.Authorization = token;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor → refresh token if expired
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // If unauthorized (401) and not retried yet
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                // Call refresh endpoint
                const res = await axios.post(
                    `${base_url}/refresh-token`,
                    {},
                    { withCredentials: true } // sends refreshToken cookie
                );

                // const newAccessToken = res.data.accessToken;
                // Cookies.set("accessToken", newAccessToken); // update token in cookie/local mem
                //
                // // Retry original request with new token
                // originalRequest.headers.Authorization = newAccessToken;
                // return api(originalRequest);
            } catch (err) {
                console.log("Refresh failed", err);
                // logout if refresh also fails
                Cookies.remove("accessToken");
                window.location.href = "/login";
            }
        }

        return Promise.reject(error);
    }
);

export default api;
