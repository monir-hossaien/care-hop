
import {
    assignHospitalService,
    deleteHospitalInfoService, fetchHospitalDetailService, fetchHospitalListService,
    searchHospitalService,
    updateHospitalInfoService
} from "../services/hospitalService.js";

// assign hospital
export const assignHospital = async (req, res) => {
    const result = await assignHospitalService(req)
    return res.status(result.statusCode).json(result)
}

// fetch single hospital details
export const fetchHospitalDetails = async (req, res) => {
    const result = await fetchHospitalDetailService(req)
    return res.status(result.statusCode).json(result)
}


// hospital list
export const fetchHospitalList = async (req, res) => {
    const result = await fetchHospitalListService(req)
    return res.status(result.statusCode).json(result)
}

// search hospital by keyword
export const searchHospital = async (req, res) => {
    const result = await searchHospitalService(req)
    return res.status(result.statusCode).json(result)
}

// update hospital info
export const updateHospitalInfo = async (req, res) => {
    const result = await updateHospitalInfoService(req)
    return res.status(result.statusCode).json(result)
}

// delete hospital info
export const deleteHospitalInfo = async (req, res) => {
    const result = await deleteHospitalInfoService(req)
    return res.status(result.statusCode).json(result)
}

