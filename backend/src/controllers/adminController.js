import {
    blogCountService,
    deleteDoctorService,
    doctorCountService,
    userCountService,
    fetchDoctorListService, hospitalCountService, messageCountService, specialitiesCountService,
    verifyDoctorRequestService, doctorRequestCountService
} from "../services/adminService.js";

export const verifyDoctorRequest  = async (req, res) => {
    const result = await verifyDoctorRequestService(req)
    return res.status(result.statusCode).json(result)
}

// fetch all doctorList
export const fetchDoctorList = async (req, res) => {
    const result = await fetchDoctorListService()
    return res.status(result.statusCode).json(result)
}

// delete doctor
export const deleteDoctor = async (req, res) => {
    const result = await deleteDoctorService(req)
    return res.status(result.statusCode).json(result)
}


// total doctor count
export const doctorCount = async (req, res) => {
    const result = await doctorCountService()
    return res.status(result.statusCode).json(result)
}

// total doctor request count
export const doctorRequestCount = async (req, res) => {
    const result = await doctorRequestCountService()
    return res.status(result.statusCode).json(result)
}

// total user count
export const userCount = async (req, res) => {
    const result = await userCountService()
    return res.status(result.statusCode).json(result)
}

// total blog count
export const blogCount = async (req, res) => {
    const result = await blogCountService()
    return res.status(result.statusCode).json(result)
}

// total hospital count
export const hospitalCount = async (req, res) => {
    const result = await hospitalCountService()
    return res.status(result.statusCode).json(result)
}

// total specialities count
export const specialitiesCount = async (req, res) => {
    const result = await specialitiesCountService()
    return res.status(result.statusCode).json(result)
}

// total message Count
export const messageCount = async (req, res) => {
    const result = await messageCountService()
    return res.status(result.statusCode).json(result)
}