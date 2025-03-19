

// book Appointment
import {
    bookAppointmentService, cancelAppointmentService,
    getDoctorAppointmentsService,
    getUserAppointmentsService,
    updateAppointmentStatusService
} from "../services/appointmentService.js";

export const bookAppointment  = async (req, res) => {
    const result = await bookAppointmentService(req)
    return res.status(result.statusCode).json(result)
}

// get appointments for specific user
export const getUserAppointments  = async (req, res) => {
    const result = await getUserAppointmentsService(req)
    return res.status(result.statusCode).json(result)
}


// get appointments for specific doctor
export const getDoctorAppointments   = async (req, res) => {
    const result = await getDoctorAppointmentsService(req)
    return res.status(result.statusCode).json(result)
}


// update Appointment Status for doctor
export const updateAppointmentStatus   = async (req, res) => {
    const result = await updateAppointmentStatusService(req)
    return res.status(result.statusCode).json(result)
}

// cancel appointment for patient or doctor
export const cancelAppointment = async (req, res) => {
    const result = await cancelAppointmentService(req)
    return res.status(result.statusCode).json(result)
}