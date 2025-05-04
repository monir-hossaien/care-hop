import { create } from 'zustand'
import axios from 'axios'

const base_url = "http://localhost:5000/api/v1"

export const specialitiesStore = create((set) => ({

    specialities: null,
    fetchSpecialityList: async ()=>{
        let result = await axios.get(`${base_url}/specialities`)
        if(result.data.status === true){
            const data = result.data
            set({specialities: data})
        }
    }
}))