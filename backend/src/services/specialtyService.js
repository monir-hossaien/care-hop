import Hospital from "../models/hospitalModel.js";
import {fileUpload} from "../helper/helper.js";
import Specialties from "../models/SpecialtiesModel.js";

// assign specialties
export const assignSpecialtiesService = async (req) => {
    try {
        const reqBody = req.body;
        // Check if hospital already exists
        const existingSpecialty = await Specialties.findOne({ name: reqBody.name });
        if (existingSpecialty) {
            return {
                statusCode: 400,
                status: false,
                message: "This Specialty is already assigned"
            };
        }

        // file upload to cloudinary
        if (req.file) {
            let result = await fileUpload(req.file?.path || "", "Doctor_finder/Specialty");
            reqBody.image = result;
        }
        // new hospital info save
        const newSpecialties = await Specialties.create(reqBody);
        if (!newSpecialties) {
            return {
                statusCode: 400,
                status: false,
                message: "Request failed"
            };
        }

        return {
            statusCode: 201,
            status: true,
            message: "Request success",
            data: newSpecialties
        };
    } catch (e) {
        return {
            statusCode: 500,
            status: false,
            message: "Something went wrong!",
            error: e.message
        };
    }
}