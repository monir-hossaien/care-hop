
import Hospital from "../models/hospitalModel.js";
import mongoose from "mongoose";
import {deleteImage, fileUpload, getPublicID} from "../helper/helper.js";
import DoctorProfile from "../models/doctorProfileModel.js";
const objID = mongoose.Types.ObjectId;

// assign to hospital
export const assignHospitalService = async (req) => {
    try {
        const reqBody = req.body;
        // Check if hospital already exists
        const existingHospital = await Hospital.findOne({ name: reqBody.name });
        if (existingHospital) {
            return {
                statusCode: 400,
                status: false,
                message: "This hospital is already assigned"
            };
        }

        // file upload to cloudinary
        if (req.file) {
            let result = await fileUpload(req.file?.path || "", "Doctor_finder/hospital");
            reqBody.image = result;
        }
        // new hospital info save
        const newHospital = await Hospital.create(reqBody);
        if (!newHospital) {
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
            data: newHospital
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


// hospital list
export const hospitalListService = async (req)=>{
    try {
        // Extract page and limit from query params, with defaults
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        // Get total count for pagination metadata
        const totalItems = await Hospital.countDocuments();

        // Fetch paginated data
        const result = await Hospital.find().skip(skip).limit(limit);

        if(!result){
            return{
                statusCode: 404,
                status: false,
                message: "Request failed"
            }
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

// search hospital by keyword
export const searchHospitalService = async (req)=>{
    try {
        const { division, district, post, area, name } = req.query;

        // Create a dynamic search object
        let searchQuery = {};
        if (name) searchQuery.name = new RegExp(name, "i");
        if (division) searchQuery.division = new RegExp(division, "i");
        if (district) searchQuery.district = new RegExp(district, "i");
        if (post) searchQuery.post = new RegExp(post, "i");
        if (area) searchQuery.area = new RegExp(area, "i");

        const matchStage = {$match: searchQuery};
        const pipeline = [
            matchStage,
        ]
        let result
        if(Object.keys(searchQuery).length > 0){
            result = await Hospital.aggregate(pipeline);
        }

        if(!result){
            return{
                statusCode: 404,
                status: false,
                message: "Request failed"
            }
        }
        return {
            statusCode: 200,
            status: true,
            message: "Request success",
            data: result
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

// update hospital info
export const updateHospitalInfoService = async (req)=>{
    try {
        const reqBody = req.body;
        const hospitalID = new objID(req.params.id)
        const hospital = await Hospital.findOne({_id: hospitalID});
        if(!hospital){
            return{
                statusCode: 404,
                status: false,
                message: "Hospital details not found"
            }
        }

        // If a new image is uploaded, delete the old image from Cloudinary
        if(req.file){
            if(hospital['image']){
                const publicID = getPublicID(hospital['image']);
                await deleteImage(publicID);
            }
            let result = await fileUpload(req.file?.path || "", "Doctor_finder/hospital");
            reqBody.image = result;
        }
        // update hospital info
        await Hospital.updateOne({_id: hospitalID}, { $set: reqBody }, { new: true })
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


// delete hospital info
export const deleteHospitalInfoService = async (req)=>{
    try {
        const hospitalID = new objID(req.params.id)
        const hospital = await Hospital.findOne({_id: hospitalID});
        if(!hospital){
            return{
                statusCode: 404,
                status: false,
                message: "Hospital details not found"
            }
        }
        // delete image from cloudinary
        if(hospital['image']){
            const publicID = getPublicID(hospital['image']);
            await deleteImage(publicID);
        }
        // delete hospital info
        await Hospital.deleteOne({_id: hospitalID})
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


