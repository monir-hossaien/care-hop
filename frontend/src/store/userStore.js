import {create} from "zustand"
import api from "../axios/api.js"
import {unauthorized} from "../helpers/helper.js";
import {base_url} from "../baseURL/index.js";
import Cookies from "js-cookie";
import axios from "axios";


export const userStore = create((set, get) => ({

    loading: false,
    setLoading: (value) => {
        set({loading: value})
    },
    formData: { name: '', email: '', phone: '', gender: '', password: '', designation: '', degree: '', registrationNo: '', experience: '', consultationFee: '', subject: '', message: '',
        availableSlot: {
            days: [],
            timeSlots: []
        },
        division: '', district: '', post: '', area: '', image: '', hospitalID: '', specialityID: '', day: '', timeSlot: '', address: ''
    },


    inputOnChange: (name, value) => {
        set((state) => ({
            formData: {
                ...state.formData,
                [name]: value
            }
        }))
    },

    resetFormData: () => set({formData: {
        name: '', email: '', phone: '', gender: '', designation: '', degree: '', registrationNo: '', experience: '', consultationFee: '', subject: '', message: '',
            availableSlot: {
                days: [],
                timeSlots: [],
            },
            division: '', district: '', post: '', area: '', image: '', hospitalID: '', specialityID: '', day: '', timeSlot: '', address: '', password: '',

        },
    }),

    isLogin: () =>{
        return !!Cookies.get("accessToken");
    },



    signUpRequest: async (data) => {
        let result = await axios.post(`${base_url}/register`, data)
        return result.data
    },


    loginRequest: async (data) => {
        try {
            const res = await api.post("/login", data);
            Cookies.set("accessToken", res.data.accessToken, { expires: 1 / 24 });
            return res.data;
        } catch (error) {
            throw error;
        }
    },

    googleLoginRequest: async (credentialResponse) => {
        try {
            const res = await api.post(
                "/google-login",
                { tokenId: credentialResponse.credential },
                { withCredentials: true }
            );
            Cookies.set("accessToken", res.data.accessToken, { expires: 1 / 24 });
            return res.data;

        } catch (err) {
            throw err;
        }
    },
    role: null,

    getRole: async () => {
        try {
            let result = await api.get("/auth");
            if(result?.data?.status === true) {
                set({ role: result.data?.data?.role});
            }
        } catch (error) {
            unauthorized(error?.response?.status)
        }
    },

    logoutRequest: async () => {
        let result = await api.get(`/logout`);
        return result.data
    },
    profileDetails: null,
    fetchProfileDetails: async () => {
        try {
            let result = await api.get("/fetch-user-profile");
            if(result?.data?.status === true) {
                const data = result?.data?.data;
                set((state) => ({
                    profileDetails: data,
                    formData: {
                        ...state.formData,
                        ...(data.profile || {})
                    }
                }))
            }
        } catch (error) {
            unauthorized(error?.response?.status)
        }
    },

    // Fetch logged-in doctor's profile
    fetchDoctorProfile: async () => {
        try {
            const result = await api.get("/fetch-doctor-profile");

            if (result?.data?.status === true) {
                const data = result?.data?.data;
                set({
                    profileDetails: data,
                    formData: data
                });
            }
        } catch (err) {
            unauthorized(err?.response?.status);
            throw err;
        }
    },


    saveUserProfile: async (data) => {
        try {
            let result = await api.post("/save-profile", data);
            return result.data
        } catch (error) {
            unauthorized(error?.response?.status)
            throw error
        }
    },

    sendDoctorRequest: async (data) => {
        try {
            let result = await api.post("/send-doctor-request", data);
            return result.data
        } catch (error) {
            unauthorized(error?.response?.status)
        }
    },
    userList : null,
    fetchUserList : async () =>{
        try {
            let result = await api.get("/fetch-user-list");
            if(result.data.status === true) {
                const data = result.data.data;
                set({userList: data})
            }
        } catch (error) {
            unauthorized(error?.response?.status)
        }
    },
    deleteUserRequest : async (userID) =>{
        try {
            let result = await api.delete(`/delete-user/${userID}`);
            return result.data
        } catch (error) {
            unauthorized(error?.response?.status)
        }
    },
    changePassword : async (data) =>{
        try {
            let result = await api.post("/change-password", data);
            return result.data
        } catch (error) {
            unauthorized(error?.response?.status)
            throw error
        }
    }
}))