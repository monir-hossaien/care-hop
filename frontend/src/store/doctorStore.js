
import {create} from "zustand";
import axios from "axios";
const base_url = "http://localhost:5000/api/v1"

export const doctorStore = create((set)=>({

    doctorList: null,
    fetchDoctorListBySpeciality: async (specialityID)=>{
        let result = await axios.get(`${base_url}/fetch-doctors-by-specialty/${specialityID}`)
        if(result.data.status === true){
            const data = result.data.data
            set({doctorList: data})
        }
    },

    fetchDoctorListByKeyword: async (searchParams)=>{
        // Convert searchParams object into query string
        const queryString = new URLSearchParams(searchParams).toString();
        let result = await axios.get(`${base_url}/search-doctor?${queryString}`)
        if(result.data.status === true){
            const data = result.data.data
            set({doctorList: data})
        }
    }
}))