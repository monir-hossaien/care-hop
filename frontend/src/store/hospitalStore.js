import {create} from "zustand";
import axios from "axios";
import {unauthorized} from "../helpers/helper.js";
const base_url = "https://care-hop.vercel.app/api/v1"

export const hospitalStore = create((set)=>({

    formData: {
        name: '',
        image: '',
        division: '',
        district: '',
        post: '',
        area: '',
        phone: '',
        email: '',
        website: '',
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
            image: '',
            division: '',
            district: '',
            post: '',
            area: '',
            phone: '',
            email: '',
            website: '',
        },
    }),

    hospitalList: null,
    fetchHospitalListByKeyword: async (searchParams)=>{
        // Convert searchParams object into query string
        const queryString = new URLSearchParams(searchParams).toString();
        let result = await axios.get(`${base_url}/search-hospital?${queryString}`)
        if(result.data.status === true){
            const data = result.data.data
            set({hospitalList: data})
        }
    },
    fetchAllHospitalList: async () => {
        let result = await axios.get(`${base_url}/hospital-list`)
        if(result.data.status === true){
            const data = result.data.data
            set({hospitalList: data})
        }
    },

    addHospital: async (data)=>{
        try{
            let result = await axios.post(`${base_url}/assign-hospital`, data,{withCredentials: true})
            return result.data
        }catch(err){
            unauthorized(err?.response?.status);
            throw err;
        }
    },

    fetchHospitalDetails: async (hospitalId)=>{
        try{
            let result = await axios.get(`${base_url}/fetch-hospital-details/${hospitalId}`,{withCredentials: true})
            if(result.data.status === true){
                const data = result.data.data
                set({formData: data})
            }
        }catch(err){
            unauthorized(err?.response?.status);
            throw err;
        }
    },

    updateHospital: async (hospitalId, data)=>{
        try{
            let result = await axios.put(`${base_url}/update-hospital/${hospitalId}`, data,{withCredentials: true})
            return result.data
        }catch(err){
            unauthorized(err?.response?.status);
            throw err;
        }
    },

    deleteHospital: async (hospitalId)=>{
        try{
            let result = await axios.delete(`${base_url}/delete-hospital/${hospitalId}`, {withCredentials: true})
            return result.data
        }catch(err){
            unauthorized(err?.response?.status);
            throw err;
        }
    }
}))