
import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import {createToken} from "../utility/JWT.js";
import mongoose from "mongoose";



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
        // file upload to cloudinary
        // if(req.file){
        //     let result = await fileUpload(req.file?.path ||"", "Doctor_finder/user");
        //     reqBody.profileImage = result;
        // }
        // new user create

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
            let token = await createToken(user["email"], user["id"]);
            return {
                statusCode: 200,
                status: true,
                message: "Login success",
                token: token,
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
        console.log(isMatch)
        if (!isMatch) {
            return { statusCode: 400, status: false, message: "Incorrect old password" };
        }

        // Hash the new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        console.log(hashedPassword)
        const result = await User.updateOne(
            {_id: userID},
            {$set: {password: hashedPassword}},
            {new: true});
        console.log(result)
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
