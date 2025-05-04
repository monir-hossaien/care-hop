
import {create} from "zustand"
import axios from "axios";
const base_url = "http://localhost:5000/api/v1"


export const contactStore = create((set)=>({


    createContact: async (data) => {
        let result = await axios.post(`${base_url}/create-contact`, data)
        return result.data
    }
}))