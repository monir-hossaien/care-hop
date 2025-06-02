
// save profile
import {
    viewProfileService,
    searchDoctorService,
    fetchDoctorsBySpecialtyService,
    fetchDoctorProfileService,
    updateDoctorProfileService
} from "../services/doctorService.js";

export const updateDoctorProfile = async (req, res) => {
    const result = await updateDoctorProfileService(req)
    return res.status(result.statusCode).json(result)
}

// fetch profile
export const fetchDoctorProfile = async (req, res) => {
    const result = await fetchDoctorProfileService(req)
    return res.status(result.statusCode).json(result)
}

// view doctors profile for user
export const viewProfile = async (req, res) => {
    const result = await viewProfileService(req)
    return res.status(result.statusCode).json(result)
}

// view doctorList by Specialty
export const fetchDoctorsBySpecialty = async (req, res) => {
    const result = await fetchDoctorsBySpecialtyService(req)
    return res.status(result.statusCode).json(result)
}

// search doctors by keyword
export const searchDoctor = async (req, res) => {
    const result = await searchDoctorService(req)
    return res.status(result.statusCode).json(result)
}
