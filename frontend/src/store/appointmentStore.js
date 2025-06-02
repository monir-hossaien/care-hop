
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
            throw error;
        }
    },
    appointmentList: null,
    fetchDoctorAppointmentList: async () => {
        try{
            let result = await axios.get(`${base_url}/get-doctor-appointments`, {withCredentials: true})
            if(result.data.status === true){
                const data = result.data?.data
                set({appointmentList: data})
            }
        }catch(error){
            unauthorized(error?.response?.statusCode)
            throw error;
        }
    },
    fetchPatientAppointmentList: async () => {
        try{
            let result = await axios.get(`${base_url}/get-user-appointments`, {withCredentials: true})
            if(result.data.status === true){
                const data = result.data?.data
                set({appointmentList: data})
            }
        }catch(error){
            unauthorized(error?.response?.statusCode)
            throw error;
        }
    },
    updateAppointmentStatus: async (id, data) => {
        try{
            let result = await axios.put(`${base_url}/update-appointment-status/${id}`, data, {withCredentials: true})
            return result.data
        }catch(error){
            unauthorized(error?.response?.statusCode)
            throw error;
        }
    }
}))