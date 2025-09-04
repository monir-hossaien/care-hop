import jwt from 'jsonwebtoken';
import {
    JWT_EXPIRATION_TIME_ACCESS_TOKEN,
    JWT_EXPIRATION_TIME_REFRESH_TOKEN,
    JWT_SECRET_ACCESS_TOKEN,
    JWT_SECRET_REFRESH_TOKEN
} from "../config/config.js";



export const generateAccessToken = (user) => {
    const payload = { email: user.email, _id: user._id, role: user.role };
    return jwt.sign(
        payload,
        process.env.SECRET_KEY_ACCESS_TOKEN,
        { expiresIn: process.env.JWT_EXPIRATION_TIME_ACCESS_TOKEN } // fallback
    );
}


export const generateRefreshToken = (user) => {
    const payload = { email: user.email, _id: user._id, role: user.role };
    return jwt.sign(
        payload,
        process.env.SECRET_KEY_REFRESH_TOKEN,
        { expiresIn: process.env.JWT_EXPIRATION_TIME_REFRESH_TOKEN || "7d" } // fallback
    );
}




export const verifyAccessToken = async (token)=>{
    try {
        const decodeToken = await jwt.verify(token, process.env.SECRET_KEY_ACCESS_TOKEN);
        return decodeToken;
    }catch (err) {
        throw err;
    }
}

export const verifyRefreshToken = async (token) => {
    try {
        const decodeToken = await jwt.verify(token, process.env.SECRET_KEY_REFRESH_TOKEN);
        return decodeToken;
    } catch (err) {
        throw err;
    }
};