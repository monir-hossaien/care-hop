
import {create} from "zustand"
import axios from "axios";
import cookies from "js-cookie"
const base_url = "http://localhost:5000/api/v1"


export const userStore = create((set)=>({

    isLogin: ()=>{
        return !!cookies.get("token");
    },

    loginRequest: async (data) => {
        let result = await axios.post(`${base_url}/login`, data, {withCredentials: true});
        if(result.data.status === true){
            cookies.set("token", result.data.token)
            localStorage.setItem("role", result.data.role);
            return result.data
        }
    },

    logoutRequest: async () => {
        let result = await axios.get(`${base_url}/logout`, {withCredentials: true});
        return result.data
        // return cookies.remove("token")
    }
}))