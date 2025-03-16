
import Hospital from "../models/hospitalModel.js";
import mongoose from "mongoose";
import {deleteImage, fileUpload, getPublicID} from "../helper/helper.js";
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
        const res = await Hospital.find();

        if(!res){
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
            data: res
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


