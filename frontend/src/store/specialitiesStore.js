import { create } from 'zustand'
import axios from 'axios'
import {unauthorized} from "../helpers/helper.js";

const base_url = "https://care-hop.vercel.app/api/v1"

export const specialitiesStore = create((set) => ({

    formData: {
        name: '',
        image: '',
        description: '',
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
            description: '',
        }
    }),
    createSpecialties: async (data)=>{
        try{
            let result = await axios.post(`${base_url}/create-specialty`, data,{withCredentials: true})
            return result.data
        }catch(err){
            unauthorized(err?.response?.status);
            throw err;
        }
    },

    readSpecialty: async (id)=>{
        try{
            let result = await axios.get(`${base_url}/read-specialty/${id}`,{withCredentials: true})
            if(result.data.status === true){
                set({formData: result.data.data})
            }
        }catch(err){
            unauthorized(err?.response?.status);
            throw err;
        }
    },

    updateSpecialty: async (id, data)=>{
        try{
            let result = await axios.put(`${base_url}/update-specialty/${id}`, data,{withCredentials: true})
            return result.data
        }catch(err){
            unauthorized(err?.response?.status);
            throw err;
        }
    },

    specialities: null,
    fetchSpecialtiesList: async ()=>{
        let result = await axios.get(`${base_url}/specialities`)
        if(result.data.status === true){
            const data = result.data
            set({specialities: data})
        }
    },
    deleteSpecialities: async (id)=>{
        try{
            let result = await axios.delete(`${base_url}/delete-specialty/${id}`,{withCredentials: true})
            return result.data
        }catch(err){
            unauthorized(err?.response?.status);
            throw err;
        }
    }
}))