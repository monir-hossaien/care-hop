
import {create} from "zustand"
import api from "../axios/api.js"
import {unauthorized} from "../helpers/helper.js";

export const appointmentStore = create((set)=>({

    createAppointment: async (doctorID, data) => {
        try{
            let result = await api.post(`/book-appointment/${doctorID}`, data)
            return result.data
        }catch(error){
            unauthorized(error?.response?.status)
            throw error;
        }
    },
    appointmentList: null,
    fetchDoctorAppointmentList: async () => {
        try{
            let result = await api.get("/get-doctor-appointments")
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
            let result = await api.get("/get-user-appointments")
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
            let result = await api.put(`/update-appointment-status/${id}`, data)
            return result.data
        }catch(error){
            unauthorized(error?.response?.statusCode)
            throw error;
        }
    }
}))