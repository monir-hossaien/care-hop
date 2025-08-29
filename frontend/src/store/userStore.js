import {create} from "zustand"
import api from "../axios/api.js"
import axios from "axios"

import {unauthorized} from "../helpers/helper.js";

import {base_url} from "../baseURL/index.js";
import cookies from "js-cookie";


export const userStore = create((set) => ({


    loading: false,
    setLoading: (value) => {
        set({loading: value})
    },
    formData: {
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
        day: '',
        timeSlot: '',
        address: ''

    },
    inputOnChange: (name, value) => {
        set((state) => ({
            formData: {
                ...state.formData,
                [name]: value
            }
        }))
    },

    resetFormData: () => set({
        formData: {
            name: '',
            email: '',
            phone: '',
            gender: '',
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
            day: '',
            timeSlot: '',
            address: '',
            password: '',

        },
    }),

    isLogin: () => {
        return !!cookies.get("accessToken");
    },


    signUpRequest: async (data) => {
        let result = await axios.post(`${base_url}/register`, data)
        return result.data
    },

    role: null,
    getRole: async () => {
        try {
            let result = await api.get("/auth");
            if(result.data.status === true) {
                const userRole = result.data?.role;
                set({role: userRole})
                return userRole
            }
        } catch (error) {
            unauthorized(error?.response?.status)
        }
    },
    loginRequest: async (data) => {
        const res = await api.post("/login", data);
        cookies.set("accessToken", res.data.accessToken, {expires : 1});
        return res.data;
    },

    logoutRequest: async () => {
        let result = await api.get(`/logout`);
        cookies.remove("accessToken");
        return result.data
    },
    profileDetails: null,
    fetchProfileDetails: async () => {
        try {
            let result = await api.get("/fetch-user-profile");
            if(result.data.status === true) {
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

            if (result.data.status === true) {
                const data = result.data?.data;
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