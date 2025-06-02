
import {create} from 'zustand'
import axios from 'axios'
import {unauthorized} from "../helpers/helper.js";
const base_url = "https://care-hop.vercel.app/api/v1"


export const adminStore = create((set)=>({

    doctorCount: null,
    fetchDoctorCount: async () =>{
        try{
            const result = await axios.get(`${base_url}/doctor-count`, {withCredentials: true});
            if(result.data.status === true){
                const data = result?.data?.data
                set({doctorCount: data});
            }
        }catch(error){
            unauthorized(error?.response?.status)
            throw error;
        }
    },

    userCount: null,
    fetchUserCount: async () =>{
        try{
            const result = await axios.get(`${base_url}/user-count`, {withCredentials: true});
            if(result.data.status === true){
                const data = result?.data?.data
                set({userCount: data});
            }
        }catch(error){
            unauthorized(error?.response?.status)
            throw error;
        }
    },

    doctorRequestCount: null,
    fetchDoctorRequestCount: async () =>{
        try{
            const result = await axios.get(`${base_url}/doctor-request-count`, {withCredentials: true});
            if(result.data.status === true){
                const data = result?.data?.data
                set({doctorRequestCount: data});
            }
        }catch(error){
            unauthorized(error?.response?.status)
            throw error;
        }
    },

    blogCount: null,
    fetchBlogCount: async () =>{
        try{
            const result = await axios.get(`${base_url}/blog-count`, {withCredentials: true});
            if(result.data.status === true){
                const data = result?.data?.data
                set({blogCount: data});
            }
        }catch(error){
            unauthorized(error?.response?.status)
            throw error;
        }
    },

    hospitalCount: null,
    fetchHospitalCount: async () =>{
        try{
            const result = await axios.get(`${base_url}/hospital-Count`, {withCredentials: true});
            if(result.data.status === true){
                const data = result?.data?.data
                set({hospitalCount: data});
            }
        }catch(error){
            unauthorized(error?.response?.status)
            throw error;
        }
    },

    specialitiesCount: null,
    fetchSpecialitiesCount: async () =>{
        try{
            const result = await axios.get(`${base_url}/specialties-count`, {withCredentials: true});
            if(result.data.status === true){
                const data = result?.data?.data
                set({specialitiesCount: data});
            }
        }catch(error){
            unauthorized(error?.response?.status)
            throw error;
        }
    },

    messageCount: null,
    fetchMessageCount: async () =>{
        try{
            const result = await axios.get(`${base_url}/message-Count`, {withCredentials: true});
            if(result.data.status === true){
                const data = result?.data?.data
                set({messageCount: data});
            }
        }catch(error){
            unauthorized(error?.response?.status)
            throw error;
        }
    },
}))