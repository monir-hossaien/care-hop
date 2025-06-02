import {create} from "zustand"
import axios from "axios";
import cookies from "js-cookie"
import {unauthorized} from "../helpers/helper.js";

const base_url = "https://care-hop.vercel.app/api/v1"



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
        return !!cookies.get("token");
    },

    signUpRequest: async (data) => {
        let result = await axios.post(`${base_url}/register`, data)
        return result.data
    },

    role: null,
    getRole: async () => {
        try {
            let result = await axios.get(`${base_url}/auth`, {withCredentials: true});
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
        let result = await axios.post(`${base_url}/login`, data, {withCredentials: true});
        if (result.data.status === true) {
            cookies.set("token", result.data?.token)
            return result.data
        }
    },

    // logoutRequest: async () => {
    //     let result = await axios.get(`${base_url}/logout`, {withCredentials: true});
    //     return result.data
    //     // return cookies.remove("token")
    // },
    profileDetails: null,
    fetchProfileDetails: async () => {
        try {
            let result = await axios.get(`${base_url}/fetch-user-profile`, {withCredentials: true});
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
            const result = await axios.get(`${base_url}/fetch-doctor-profile`, {
                withCredentials: true,
            });

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
            let result = await axios.post(`${base_url}/save-profile`, data, {withCredentials: true});
            return result.data
        } catch (error) {
            unauthorized(error?.response?.status)
            throw error
        }
    },

    sendDoctorRequest: async (data) => {
        try {
            let result = await axios.post(`${base_url}/send-doctor-request`, data, {withCredentials: true});
            return result.data
        } catch (error) {
            unauthorized(error?.response?.status)
        }
    },
    userList : null,
    fetchUserList : async () =>{
        try {
            let result = await axios.get(`${base_url}/fetch-user-list`, {withCredentials: true});
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
            let result = await axios.delete(`${base_url}/delete-user/${userID}`, {withCredentials: true});
            return result.data
        } catch (error) {
            unauthorized(error?.response?.status)
        }
    },
    changePassword : async (data) =>{
        try {
            let result = await axios.post(`${base_url}/change-password`, data,{withCredentials: true});
            return result.data
        } catch (error) {
            unauthorized(error?.response?.status)
            throw error
        }
    }
}))