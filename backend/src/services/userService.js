
import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import {createToken, verifyToken} from "../utility/JWT.js";
import {deleteImage, fileUpload, getPublicID} from "../helper/helper.js";
import UserProfile from "../models/userProfileModel.js";
import mongoose from "mongoose";
import DoctorProfile from "../models/doctorProfileModel.js";
const objID = mongoose.Types.ObjectId;



// user registration service
export const registerService = async (req)=>{
    try {
        const {email, password} = req.body;
        //check user exit or not
        const existingUser = await User.findOne({email})
        if(existingUser){
            return{
                statusCode: 400,
                status: false,
                message: "User already exists"
            }
        }
        // password make encrypted
        const hashPassword = await bcrypt.hashSync(password, 10);
        const newUser = {
            email: email,
            password: hashPassword
        }

        const user = await User.create(newUser);
        if(!user){
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

// user login service
export const loginService = async (req) => {
    try {
        const { email, password } = req.body;
        // find user is exits or not
        let user = await User.findOne({email});
        if (!user) {
            return { statusCode: 404, status: false, message: "User not found" };
        }
        let isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            let token = await createToken(user["email"], user["id"], user["role"]);
            let decoded = await verifyToken(token);
            let role = decoded.role;
            return {
                statusCode: 200,
                status: true,
                message: "Login success",
                token: token,
                role: role,
            };
        }else{
            return {
                statusCode: 400,
                status: false,
                message: "Invalid Credentials",
            };
        }
    } catch (err) {
        return {
            statusCode: 500,
            status: false,
            message: "Something went wrong!",
            error: err.message,
        };
    }
};

// change password
export const changePasswordService = async (req)=>{
    try {
        const {oldPassword, newPassword} = req.body;
        const userID = new mongoose.Types.ObjectId(req.headers.id);

        //check user exit or not
        const existingUser = await User.findOne({_id: userID})
        if(!existingUser){
            return{
                statusCode: 404,
                status: false,
                message: "User not found"
            }
        }
        // Check if old password is correct
        const isMatch = await bcrypt.compare(oldPassword, existingUser.password);

        if (!isMatch) {
            return { statusCode: 400, status: false, message: "Incorrect old password" };
        }

        // Hash the new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        const result = await User.updateOne(
            {_id: userID},
            {$set: {password: hashedPassword}},
            {new: true});
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
            message: "Password updated successfully",
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

// request send to create doctor profile
export const doctorProfileRequestService = async (req)=>{
    try {
        const reqBody = req.body;
        const userID = new objID(req.headers.id);
        reqBody.userID = userID;
        let availableSlot = reqBody.availableSlot;
        if (typeof availableSlot === 'string') {
            availableSlot = JSON.parse(availableSlot);
        }
        reqBody.availableSlot = availableSlot;
        const doctorProfile = await DoctorProfile.findOne({userID});
        if(doctorProfile){
            return{
                statusCode: 400,
                status: false,
                message: "Request already exists"
            }
        }
        // file upload to cloudinary
        if(req.file){
            let result = await fileUpload(req.file?.path || "", "Doctor_finder/doctor");
            reqBody.image = result.secure_url;
        }
        // save or update profile
        const result = await DoctorProfile.create(reqBody)
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
            reqBody.image = result.secure_url;
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
        const unwind = {
            $unwind:{path: "$userDetails", preserveNullAndEmptyArrays: true}
        }
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
