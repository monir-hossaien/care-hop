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
import {createToken, verifyRefreshToken} from "../utility/JWT.js";


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
        let token = createToken(user);
        user.refreshToken = token.refreshToken;
        await user.save();
        let cookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // false on localhost
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
            path: "/",
        };
        res.cookie("refreshToken", token.refreshToken, cookieOptions);
        return res.status(200).json({status: true, message: "Login success", accessToken: token.accessToken});
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
        const token = createToken(user);
        user.refreshToken = token.refreshToken;
        await user.save();
        let cookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // false on localhost
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
            path: "/",
        };
        res.cookie("refreshToken", token.refreshToken, cookieOptions);
        return res.status(200).json({status: true, message: "Login success", accessToken: token.accessToken});
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
        const tokens = createToken(user);
        user.refreshToken = tokens.refreshToken;
        await user.save();
        const cookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // false on localhost
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
            path: "/",
        };
        res.cookie("refreshToken", tokens.refreshToken, cookieOptions);
        return res.status(200).json({status: true, message: "Refresh token successfully", accessToken: tokens.accessToken });
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