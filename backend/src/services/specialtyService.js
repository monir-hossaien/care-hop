import {deleteImage, fileUpload, getPublicID} from "../helper/helper.js";
import Specialties from "../models/SpecialtiesModel.js";
import mongoose from "mongoose";
const objID = mongoose.Types.ObjectId;

// assign specialties
export const assignSpecialtyService = async (req) => {
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

// specialties list
export const specialtiesListService = async (req) => {
    try {
        // Extract page and limit from query params, with defaults
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        // Get total count for pagination metadata
        const totalItems = await Specialties.countDocuments();

        // Fetch paginated data
        const result = await Specialties.find().skip(skip).limit(limit);

        if (!result || result.length === 0) {
            return {
                statusCode: 404,
                status: false,
                message: "No specialties found"
            };
        }

        return {
            statusCode: 200,
            status: true,
            message: "Request success",
            data: result,
            pagination: {
                totalItems,
                totalPages: Math.ceil(totalItems / limit),
                currentPage: page
            }
        };
    } catch (e) {
        return {
            statusCode: 500,
            status: false,
            message: "Something went wrong!",
            error: e.message
        };
    }
};



// specialties update
export const updateSpecialtyService = async (req)=>{
    try {
        const reqBody = req.body;
        const specialtyID = new objID(req.params.id)
        const specialty = await Specialties.findOne({_id: specialtyID});
        if(!specialty){
            return{
                statusCode: 404,
                status: false,
                message: "Request failed"
            }
        }

        // If a new image is uploaded, delete the old image from Cloudinary
        if(req.file){
            if(specialty['image']){
                const publicID = getPublicID(specialty['image']);
                await deleteImage(publicID);
            }
            let result = await fileUpload(req.file?.path || "", "Doctor_finder/Specialty");
            reqBody.image = result;
        }
        // update hospital info
        await Specialties.updateOne({_id: specialtyID}, { $set: reqBody }, { new: true })
        return {
            statusCode: 200,
            status: true,
            message: "Request success",
        }
    }
    catch (e) {
        return {
            statusCode: 500,
            status: false,
            message: "Something went wrong!",
            error: e.message
        }
    }
}

// specialties delete
export const deleteSpecialtyService = async (req)=>{
    try {
        const specialtyID = new objID(req.params.id)
        const specialty = await Specialties.findOne({_id: specialtyID});
        if(!specialty){
            return{
                statusCode: 404,
                status: false,
                message: "Request failed"
            }
        }
        // delete image from cloudinary
        if(specialty['image']){
            const publicID = getPublicID(specialty['image']);
            await deleteImage(publicID);
        }
        // delete hospital info
        await Specialties.deleteOne({_id: specialtyID})
        return {
            statusCode: 200,
            status: true,
            message: "Request success",
        }
    }
    catch (e) {
        return {
            statusCode: 500,
            status: false,
            message: "Something went wrong!",
            error: e.message
        }
    }
}