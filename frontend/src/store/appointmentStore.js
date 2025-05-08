
import {create} from "zustand"
import axios from "axios";
const base_url = "http://localhost:5000/api/v1"


export const appointmentStore = create((set)=>({

    createAppointment: async (doctorID, data) => {
        let result = await axios.post(`${base_url}/book-appointment/${doctorID}`, data)
        return result.data
    }
}))