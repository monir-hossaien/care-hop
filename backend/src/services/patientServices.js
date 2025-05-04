import {deleteImage, fileUpload, getPublicID} from "../helper/helper.js";
import UserProfile from "../models/userProfileModel.js";
import mongoose from "mongoose";
const objID = mongoose.Types.ObjectId;


// save user profile
export const saveUserProfileService = async (req)=>{
    try {
        const reqBody = req.body;
        const userID = new objID(req.headers.id);
        reqBody.userID = userID;

        const userProfile = await UserProfile.findOne({userID});
        // file upload to cloudinary
        if(req.file){
            if(userProfile && userProfile['image']){
                const publicID = getPublicID(userProfile['image']);
                await deleteImage(publicID);
            }
            let result = await fileUpload(req.file?.path || "", "Doctor_finder/user");
            reqBody.image = result;
        }
        // save or update profile
        const result = await UserProfile.updateOne({userID: userID}, {$set: reqBody }, { upsert: true });
        if(!result){
            return{
                statusCode: 400,
                status: false,
                message: "Request failed"
            }
        }
        return {
            statusCode: 201,
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

// fetch user profile
export const fetchUserProfileService = async (req)=>{
    try {
        const userID = new objID(req.headers.id);
        const matchStage = {
            $match:{userID:userID},
        }
        // join with user collection
        const joinWithUser = {
            $lookup: {
                from: "users",
                localField: "userID",
                foreignField: "_id",
                as: "userDetails",
            }

        }
        const projection = {
            $project: {
                _id: 1,
                userID: 1,
                name: 1,
                gender:1,
                profileImage: 1,
                phone: 1,
                "userDetails.status": 1
            }
        }
        const unwind = {$unwind: "$userDetails"}
        const pipeline = [
            matchStage,
            joinWithUser,
            unwind,
            projection,
        ]

        const result = await UserProfile.aggregate(pipeline);

        if(!result){
            return{
                statusCode: 404,
                status: false,
                message: "User not found"
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