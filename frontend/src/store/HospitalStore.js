import {create} from "zustand";
import axios from "axios";
const base_url = "http://localhost:5000/api/v1"

export const hospitalStore = create((set)=>({

    hospitalList: null,
    fetchHospitalListByKeyword: async (searchParams)=>{
        // Convert searchParams object into query string
        const queryString = new URLSearchParams(searchParams).toString();
        let result = await axios.get(`${base_url}/search-hospital?${queryString}`)
        if(result.data.status === true){
            const data = result.data.data
            set({hospitalList: data})
        }
    }
}))