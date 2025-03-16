import {verifyToken} from "../utility/JWT.js";
import User from "../models/userModel.js";

export const authenticateUser = async (req, res, next) => {

    // Retrieve token from headers or cookies
    let token = req.headers['token'] || req.cookies['token'];

    if (!token) {
        return res.status(401).json({
            status: "fail",
            message: "Unauthorized user. Please login first",
        });
    }
    let decodeToken = await verifyToken(token);

    if (!decodeToken) {
        return res.status(401).send({status: "fail", message:"Invalid or expired token. Please log in again."});
    }else{
        let email = decodeToken.email;
        let id = decodeToken.id;
        req.headers.email = email;
        req.headers.id = id;
        next()
    }
}

export const isRole = (requiredRole) => {
    return async (req, res, next) => {
        try {
            const user = await User.findOne({ email: req.headers.email });

            if (!user) {
                return res.status(404).json({
                    status: false,
                    message: "User not found",
                });
            }

            if (user.role !== requiredRole) {
                return res.status(403).json({
                    status: false,
                    message: `Access denied! please contact with administrator`,
                });
            }

            next(); // Proceed if role matches
        } catch (err) {
            return res.status(500).json({
                status: false,
                message: "Something went wrong!",
                error: err.message,
            });
        }
    };
};
