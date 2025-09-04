import dotenv from 'dotenv';
dotenv.config();
import { OAuth2Client } from 'google-auth-library';
import {
    changePasswordService, deleteUserService, doctorProfileRequestService, fetchRoleService, fetchUserListService,
    fetchUserProfileService,
    registerService,
    saveUserProfileService
} from "../services/userService.js";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import {generateAccessToken, generateRefreshToken, verifyRefreshToken} from "../utility/JWT.js";
import {accessCookieOptions, refreshCookieOptions} from "../const/index.js";


// user register
export const register = async (req, res) => {
    const result = await registerService(req)
    return res.status(result.statusCode).json(result)
}

// user login
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if(!email || !password){
            return res.status(400).json({status: false, message: "Email and password required"})
        }
        // find user is exits or not
        let user = await User.findOne({email});
        if (!user) {
            return res.status(404).json({status: false, message: "User not found"});
        }
        let isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({status: false, message: "Invalid Credentials"});
        }
        let refreshToken = generateRefreshToken(user);
        let accessToken = generateAccessToken(user);
        user.refreshToken = refreshToken;
        await user.save();
        res.cookie("refreshToken", refreshToken, refreshCookieOptions);
        res.cookie("accessToken", accessToken, accessCookieOptions);
        return res.status(200).json({status: true, message: "Login success", accessToken: accessToken});
    } catch (err) {
        return res.status(500).json({ status: false, message: "Something went wrong!", error: err.message });
    }
};



//google login
export const googleLogin = async (req, res) => {
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    try {
        const { tokenId } = req.body;
        const ticket = await client.verifyIdToken({ idToken: tokenId, audience: process.env.GOOGLE_CLIENT_ID });
        const {  email } = ticket.getPayload();
        let user = await User.findOne({email});
        const newUser = {
            email,
            provider: 'google',
            role: email === "abirupc786@gmail.com" ? "admin": "user"
        }
        if (!user) user = await User.create(newUser);
        let refreshToken = generateRefreshToken(user);
        let accessToken = generateAccessToken(user);
        user.refreshToken = refreshToken;
        await user.save();
        res.cookie("refreshToken", refreshToken, refreshCookieOptions);
        res.cookie("accessToken", accessToken, accessCookieOptions);
        return res.status(200).json({status: true, message: "Login success", accessToken: accessToken})
    } catch (err) {
        return res.status(500).json({ status: false, message: "Something went wrong!", error: err.message });
    }
};

// refresh token
export const refreshToken = async (req, res) => {
    try {
        const token = req.cookies.refreshToken;
        const decodeToken = await verifyRefreshToken(token);
        let user = await User.findOne({email: decodeToken.email});
        if (!user || user.refreshToken !== token) {
            return res.status(403).json({ status: false, message: 'Invalid token' });
        }
        let newRefreshToken = generateRefreshToken(user);
        let newAccessToken = generateAccessToken(user);
        user.refreshToken = newRefreshToken;
        await user.save();
        res.cookie("refreshToken", newRefreshToken, refreshCookieOptions);
        res.cookie("accessToken", newAccessToken, accessCookieOptions);

        return res.status(200).json({status: true, message: "Refresh token successfully", accessToken: newAccessToken});
    }catch(err){
        res.status(500).json({status: false, message: 'Something went wrong!', error: err.message });
    }
}

// user logout
export const logout = async(req, res)=>{
    try {
        const token = req.cookies.refreshToken;
        const user = await User.findOne({refreshToken: token})
        if(user){
            user.refreshToken = "";
            await user.save()
        }
        res.clearCookie("refreshToken");
        res.clearCookie("accessToken");
        return res.status(200).json({ status: true , message: "Logout success" });
    } catch (error) {
        res.status(500).json({status: false, message: "Something went wrong"})
    }
}

// change password
export const changePassword = async (req, res) => {
    const result = await changePasswordService(req)
    return res.status(result.statusCode).json(result)
}


// save user profile
export const saveUserProfile = async (req, res) => {
    const result = await saveUserProfileService(req)
    return res.status(result.statusCode).json(result)
}


// fetch user profile
export const fetchUserProfile = async (req, res) => {
    const result = await fetchUserProfileService(req)
    return res.status(result.statusCode).json(result)
}

// request send to create doctor profile
export const doctorProfileRequest = async (req, res) => {
    const result = await doctorProfileRequestService(req)
    return res.status(result.statusCode).json(result)
}

// fetch user list for admin
export const fetchUserList = async (req, res) => {
    const result = await fetchUserListService()
    return res.status(result.statusCode).json(result)
}


// delete user
export const deleteUser = async (req, res) => {
    const result = await deleteUserService(req)
    return res.status(result.statusCode).json(result)
}

// // auth
export const fetchRole = async (req, res) => {
    const result = await fetchRoleService(req)
    return res.status(result.statusCode).json(result)
}