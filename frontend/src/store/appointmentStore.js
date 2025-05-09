
import {create} from "zustand"
import axios from "axios";
import {unauthorized} from "../helpers/helper.js";
const base_url = "http://localhost:5000/api/v1"


export const appointmentStore = create((set)=>({

    createAppointment: async (doctorID, data) => {
        try{
            let result = await axios.post(`${base_url}/book-appointment/${doctorID}`, data, {withCredentials: true})
            return result.data
        }catch(error){
            unauthorized(error?.response?.statusCode)
        }
    }
}))