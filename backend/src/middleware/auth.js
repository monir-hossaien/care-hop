import {verifyAccessToken} from "../utility/JWT.js";
import User from "../models/userModel.js";
import mongoose from "mongoose";

export const authenticateUser = async (req, res, next) => {

    try{
        // Retrieve token from headers or cookies
        let token = req.headers['accessToken'] || req.cookies['accessToken'];

        if (!token) {
            return res.status(401).json({
                status: false,
                message: "Unauthorized user. Please login first",
            });
        }
        let decodeToken = await verifyAccessToken(token);
        console.log(decodeToken)
        if (!decodeToken) {
            return res.status(401).send({status: false, message:"Invalid or expired token. Please log in again."});
        }else{
            req.headers.email = decodeToken.email;
            req.headers.id = decodeToken._id;
            req.headers.role = decodeToken.role;
            next()
        }
    }catch (e) {
        return e.message;
    }
}

export const isRole = (allowedRoles) => {
    return async (req, res, next) => {
        const id = req.headers.id
        const userID = new mongoose.Types.ObjectId(id);

        try {
            const user = await User.findOne({ _id: userID });
            if (!user) {
                return res.status(404).json({
                    status: false,
                    message: "User not found",
                });
            }
            if (!allowedRoles.includes(user.role)) {
                return res.status(403).json({
                    status: false,
                    message: "Access denied! Please contact the administrator.",
                })
            }

            next(); // Proceed if role is allowed
        } catch (err) {
            return res.status(500).json({
                status: false,
                message: "Something went wrong!",
                error: err.message,
            });
        }
    };
};

