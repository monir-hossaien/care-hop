
import {create} from 'zustand'
import axios from 'axios'
import {unauthorized} from "../helpers/helper.js";
import api from "../axios/api.js"




export const adminStore = create((set)=>({

    doctorCount: null,
    fetchDoctorCount: async () =>{
        try{
            const result = await api.get("/doctor-count");
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
            const result = await api.get("/user-count");
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
            const result = await api.get("/doctor-request-count");
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
            const result = await api.get("/blog-count");
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
            const result = await api.get("/hospital-Count");
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
            const result = await api.get("/specialties-count");
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
            const result = await api.get("/message-Count");
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