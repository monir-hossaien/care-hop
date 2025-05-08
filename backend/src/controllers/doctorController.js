
// save profile
import {
    saveProfileService,
    fetchProfileService,
    viewProfileService
    , searchDoctorService, fetchDoctorsBySpecialtyService
} from "../services/doctorService.js";

export const saveProfile = async (req, res) => {
    const result = await saveProfileService(req)
    return res.status(result.statusCode).json(result)
}

// fetch profile
export const fetchProfile = async (req, res) => {
    const result = await fetchProfileService(req)
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