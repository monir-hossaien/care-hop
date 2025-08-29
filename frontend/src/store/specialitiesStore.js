import { create } from 'zustand'
import axios from 'axios'
import {unauthorized} from "../helpers/helper.js";

import {base_url} from "../baseURL/index.js";
import api from "../axios/api.js";
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
            let result = await api.post("/create-specialty", data)
            return result.data
        }catch(err){
            unauthorized(err?.response?.status);
            throw err;
        }
    },

    readSpecialty: async (id)=>{
        try{
            let result = await api.get(`/read-specialty/${id}`)
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
            let result = await api.put(`/update-specialty/${id}`, data)
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
            let result = await api.delete(`/delete-specialty/${id}`)
            return result.data
        }catch(err){
            unauthorized(err?.response?.status);
            throw err;
        }
    }
}))