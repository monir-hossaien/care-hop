
import mongoose from "mongoose";
import DoctorProfile from "../models/doctorProfileModel.js";
import {deleteImage, fileUpload, getPublicID} from "../helper/helper.js";
const objID = mongoose.Types.ObjectId;

// save doctor profile
export const updateDoctorProfileService = async (req)=>{
    try {
        const reqBody = req.body;
        const userID = new objID(req.headers.id);
        let availableSlot = reqBody.availableSlot;
        if (typeof availableSlot === 'string') {
            availableSlot = JSON.parse(availableSlot);
        }
        reqBody.availableSlot = availableSlot;

        const profile = await DoctorProfile.findOne({userID});
        // file upload to cloudinary
        if(req.file){
            if(profile && profile['image']){
                const publicID = getPublicID(profile['image']);
                await deleteImage(publicID);
            }
            let result = await fileUpload(req.file?.path || "", "Doctor_finder/doctor");
            reqBody.image = result.secure_url;
        }
        // save or update profile
        const result = await DoctorProfile.updateOne({userID}, {$set: reqBody }, { new: true });
        if(!result){
            return{
                statusCode: 400,
                status: false,
                message: "Request failed"
            }
        }
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

// fetch profile
export const fetchDoctorProfileService = async (req)=>{
    try {
        const userID = new objID(req.headers.id);
        const matchStage = {
            $match: {userID}
        }
        // join with user collection
        const joinWithUser = {
            $lookup:{
                from: "users",
                localField: "userID",
                foreignField: "_id",
                as: "user",
            }
        }
        // join with hospital collection
        const joinWithHospital = {
            $lookup:{
                from: "hospitals",
                localField: "hospitalID",
                foreignField: "_id",
                as: "hospitalDetails",
            }
        }
        // join with specialities collection
        const joinWithSpecialities = {
            $lookup:{
                from: "specialties",
                localField: "specialityID",
                foreignField: "_id",
                as: "specialities",
            }
        }

        // join with review collection
        const joinWithReview = {
            $lookup:{
                from: "reviews",
                localField: "doctorID",
                foreignField: "_id",
                as: "reviews",
            }
        }

        const pipeline = [
            matchStage,
            joinWithUser,
            {$unwind: {path: "$user", preserveNullAndEmptyArrays: true}},
            joinWithHospital,
            {$unwind: {path: "$hospitalDetails", preserveNullAndEmptyArrays: true}},
            joinWithSpecialities,
            {$unwind: {path: "$specialities", preserveNullAndEmptyArrays: true}},
            joinWithReview,
            {$unwind: {path: "$reviews", preserveNullAndEmptyArrays: true}},
        ]
        const result = await DoctorProfile.aggregate(pipeline);

        if(!result || result.length === 0){
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
            data: result[0]
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

// view doctors profile for user
export const viewProfileService = async (req)=>{
    try {
        const doctorID = new objID(req.params.doctorID);
        const matchStage = {
            $match: {userID: doctorID}
        }
        // join with hospital collection
        const joinWithHospital = {
            $lookup:{
                from: "hospitals",
                localField: "hospitalID",
                foreignField: "_id",
                as: "hospitalDetails",
            }
        }
        // join with specialities collection
        const joinWithSpecialities = {
            $lookup:{
                from: "specialties",
                localField: "specialityID",
                foreignField: "_id",
                as: "specialities",
            }
        }
        // join with review collection
        const joinWithReview = {
            $lookup:{
                from: "reviews",
                localField: "doctorID",
                foreignField: "_id",
                as: "reviews",
            }
        }
        const projection = {
            $project: {
                _id: 1,
                userID: 1,
                name: 1,
                designation: 1,
                experience: 1,
                profileImage: 1,
                degrees: 1,
                consultationFee: 1,
                availableSlot: 1,
                specialization: 1,
                "hospitalDetails.name": 1,
                "hospitalDetails.area": 1,
                "specialities.name": 1,
            }
        }
        const pipeline = [
            matchStage,
            joinWithHospital,
            {$unwind: "$hospitalDetails"},
            joinWithSpecialities,
            {$unwind: "$specialities"},
            joinWithReview,
            projection,
        ]
        const result = await DoctorProfile.aggregate(pipeline);

        if(!result){
            return{
                statusCode: 400,
                status: false,
                message: "Request failed"
            }
        }
        return {
            statusCode: 200,
            status: true,
            message: "Request success",
            data: result[0]
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

// fetch doctors list
export const fetchDoctorsBySpecialtyService = async (req)=>{
    try {
        const specialityID = new objID(req.params.specialityID);
        const {status = 'approved'} = req.query;
        const matchStage = {
            $match: {
                specialityID,
                status: status.toLowerCase()
            },
        }
        // join with user collection
        const joinWithUser = {
            $lookup:{
                from: "users",
                localField: "userID",
                foreignField: "_id",
                as: "user",
            }
        }
        // join with hospital collection
        const joinWithHospital = {
            $lookup:{
                from: "hospitals",
                localField: "hospitalID",
                foreignField: "_id",
                as: "hospitalDetails",
            }
        }
        // join with specialities collection
        const joinWithSpecialities = {
            $lookup:{
                from: "specialties",
                localField: "specialityID",
                foreignField: "_id",
                as: "specialities",
            }
        }
        const projection = {
            $project: {
                name:1,
                image: 1,
                userID: 1,
                designation: 1,
                experience: 1,
                degrees: 1,
                profileImage: 1,
                consultationFee: 1,
                availableSlot: 1,
                specialization: 1,
                "hospitalDetails.name": 1,
                "hospitalDetails.area": 1,
                "specialities.name": 1
            }
        }
        const pipeline = [
            matchStage,
            joinWithUser,
            {$unwind: {path: "$user", preserveNullAndEmptyArrays: true}},
            joinWithHospital,
            {$unwind: {path:"$hospitalDetails", preserveNullAndEmptyArrays: true} },
            joinWithSpecialities,
            {$unwind: {path:"$specialities", preserveNullAndEmptyArrays: true }},
            projection,
        ]
        const result = await DoctorProfile.aggregate(pipeline);

        if(!result){
            return{
                statusCode: 400,
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

// search doctors by keyword
export const searchDoctorService = async (req)=>{
    try {
        let { division, district, post, name, specialityID, status = "approved" } = req.query;
        // Create a dynamic search object
        let searchQuery = {};
        if (name) searchQuery.name = new RegExp(name, "i");
        if (division) searchQuery.division = new RegExp(division, "i");
        if (district) searchQuery.district = new RegExp(district, "i");
        if (post) searchQuery.post = new RegExp(post, "i");
        if (status) searchQuery.status = new RegExp(status, "i");
        if (specialityID) searchQuery.specialityID = new mongoose.Types.ObjectId(specialityID)
        // let {status = 'approved'} = req.query;

        const matchStage = {
            $match: searchQuery
        }
        // join with user collection
        const joinWithUser = {
            $lookup:{
                from: "users",
                localField: "userID",
                foreignField: "_id",
                as: "user",
            }
        }
        // join with hospital collection
        const joinWithHospital = {
            $lookup:{
                from: "hospitals",
                localField: "hospitalID",
                foreignField: "_id",
                as: "hospitalDetails",
            }
        }
        // join with specialities collection
        const joinWithSpecialities = {
            $lookup:{
                from: "specialties",
                localField: "specialityID",
                foreignField: "_id",
                as: "specialities",
            }
        }
        const projection = {
            $project: {
                name:1,
                userID: 1,
                designation: 1,
                experience: 1,
                degrees: 1,
                consultationFee: 1,
                availableSlot: 1,
                specialization: 1,
                image: 1,
                "hospitalDetails.name": 1,
                "hospitalDetails.area": 1,
                "specialities.name": 1
            }
        }
        const pipeline = [
            matchStage,
            joinWithUser,
            {$unwind: {path: "$user", preserveNullAndEmptyArrays: true}},
            joinWithHospital,
            {$unwind: {path:"$hospitalDetails",  preserveNullAndEmptyArrays: true}},
            joinWithSpecialities,
            {$unwind: {path:"$specialities",  preserveNullAndEmptyArrays: true}},
            projection,
        ]
        let result
        if(Object.keys(searchQuery).length > 0){
           result = await DoctorProfile.aggregate(pipeline);
        }

        if(!result){
            return{
                statusCode: 400,
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

