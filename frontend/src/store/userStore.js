import {create} from "zustand"
import api from "../axios/api.js"
import {unauthorized} from "../helpers/helper.js";
import {base_url} from "../baseURL/index.js";
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

    isLogin: ()=>{
        return !!localStorage.getItem("isLogin");
    },

    signUpRequest: async (data) => {
        let result = await axios.post(`${base_url}/register`, data)
        return result.data
    },

    loginRequest: async (data) => {
        try {
            const res = await api.post("/login", data);
            if(res.data.status === true){
                localStorage.setItem("isLogin", "true");
                return res.data;
            }
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
            localStorage.setItem("isLogin", "true");
            return res.data;

        } catch (err) {
            throw err;
        }
    },
    role: null,
    getRole: async () => {
        try {
            set({loading: true});
            let result = await api.get("/fetch-role");
            if (result?.data?.status) {
                set({ role: result.data.data.role, loading: false });
            } else {
                set({ role: null, loading: false });
            }
        } catch (error) {
            // unauthorized(error?.response?.status)
            set({ role: null, loading: false });
        }
    },

    logoutRequest: async () => {
        let result = await api.get("/logout");
        if(result.data?.status) {
            localStorage.removeItem("isLogin");
            return result.data
        }
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