

// save user profile
import {saveUserProfileService, fetchUserProfileService} from "../services/patientServices.js";

export const saveUserProfile = async (req, res) => {
    const result = await saveUserProfileService(req)
    return res.status(result.statusCode).json(result)
}


// fetch user profile
export const fetchUserProfile = async (req, res) => {
    const result = await fetchUserProfileService(req)
    return res.status(result.statusCode).json(result)
}