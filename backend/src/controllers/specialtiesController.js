
// assign specialties
import {
    assignSpecialtyService, deleteSpecialtyService,
    specialtiesListService,
    updateSpecialtyService
} from "../services/specialtyService.js";

export const assignSpecialty = async (req, res) => {
    const result = await assignSpecialtyService(req)
    return res.status(result.statusCode).json(result)
}

// specialties list
export const specialtiesList = async (req, res) => {
    const result = await specialtiesListService(req)
    return res.status(result.statusCode).json(result)
}

// specialties update
export const updateSpecialty = async (req, res) => {
    const result = await updateSpecialtyService(req)
    return res.status(result.statusCode).json(result)
}

// specialties delete
export const deleteSpecialty = async (req, res) => {
    const result = await deleteSpecialtyService(req)
    return res.status(result.statusCode).json(result)
}