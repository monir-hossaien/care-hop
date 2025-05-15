import {verifyDoctorRequestService} from "../services/adminService.js";

export const verifyDoctorRequest  = async (req, res) => {
    const result = await verifyDoctorRequestService(req)
    return res.status(result.statusCode).json(result)
}