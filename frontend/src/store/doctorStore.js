
import {create} from "zustand";
import axios from "axios";
import {unauthorized} from "../helpers/helper.js";
const base_url = "http://localhost:5000/api/v1"

export const doctorStore = create((set)=>({

    doctorList: null,
    fetchDoctorListBySpeciality: async (specialityID)=>{
        let result = await axios.get(`${base_url}/fetch-doctors-by-specialty/${specialityID}?status=approved`)
        if(result.data.status === true){
            const data = result.data.data
            set({doctorList: data})
        }
    },

    fetchDoctorListByKeyword: async (searchParams)=>{
        // Convert searchParams object into query string
        const queryString = new URLSearchParams(searchParams).toString();
        let result = await axios.get(`${base_url}/search-doctor?${queryString}?status=approved`)
        if(result.data.status === true){
            const data = result.data.data
            set({doctorList: data})
        }
    },
    saveDoctorProfile: async (data)=>{
        try{
            let result = await axios.post(`${base_url}/save-doctor-profile`, data, {withCredentials: true});
            return result.data
        }catch(error){
            unauthorized(error?.response?.statusCode);
        }
    }
}))