
// assign specialties
import {assignSpecialtiesService} from "../services/specialtyService.js";

export const assignSpecialties = async (req, res) => {
    const result = await assignSpecialtiesService(req)
    return res.status(result.statusCode).json(result)
}

// specialties list
export const specialtiesList = async (req, res) => {
    const result = await specialtiesListService(req)
    return res.status(result.statusCode).json(result)
}

// specialties update
export const updateSpecialties = async (req, res) => {
    const result = await updateSpecialtiesService(req)
    return res.status(result.statusCode).json(result)
}

// specialties delete
export const deleteSpecialties = async (req, res) => {
    const result = await deleteSpecialtiesService(req)
    return res.status(result.statusCode).json(result)
}