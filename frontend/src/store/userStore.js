import {create} from "zustand"
import axios from "axios";
import cookies from "js-cookie"
import {unauthorized} from "../helpers/helper.js";

const base_url = "http://localhost:5000/api/v1"
const initialFormData = {
    name: '',
    email: '',
    phone: '',
    gender: '',
    password: '',
    designation: '',
    degree: '',
    registrationNo: '',
    experience: '',
    consultationFee: '',
    subject: '',
    message: '',
    availableSlot: {
        days: [],
        timeSlots: [],
    },
    division: '',
    district: '',
    post: '',
    area: '',
    image: '',
    hospitalID: '',
    specialityID: '',
};


export const userStore = create((set) => ({

    loading: false,
    setLoading: (value) => {
        set({loading: value})
    },
    formData: initialFormData,
    inputOnChange: (name, value) => {
        set((state) => ({
            formData: {
                ...state.formData,
                [name]: value
            }
        }))
    },

    resetFormData: () => set({
        formData: initialFormData,
    }),

    isLogin: () => {
        return !!cookies.get("token");
    },

    signUpRequest: async (data) => {
        let result = await axios.post(`${base_url}/register`, data)
        return result.data
    },

    loginRequest: async (data) => {
        let result = await axios.post(`${base_url}/login`, data, {withCredentials: true});
        if (result.data.status === true) {
            cookies.set("token", result.data.token)
            localStorage.setItem("role", result.data.role);
            return result.data
        }
    },

    logoutRequest: async () => {
        let result = await axios.get(`${base_url}/logout`, {withCredentials: true});
        return result.data
        // return cookies.remove("token")
    },

    sendDoctorRequest: async (data) => {
        try {
            let result = await axios.post(`${base_url}/send-doctor-request`, data, {withCredentials: true});
            return result.data
        } catch (error) {
            console.log(error)
            unauthorized(error?.response?.status)
        }
    },

    profile: null,
    fetchDoctorProfile: async () => {
        try {
            let result = await axios.get(`${base_url}/fetch-doctor-profile`, {withCredentials: true});
            if (result.data.status === true) {
                set({profile: result.data.data})
            }
        } catch (error) {
            unauthorized(error?.response?.data?.status)
        }
    },

}))