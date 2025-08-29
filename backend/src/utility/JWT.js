import jwt from 'jsonwebtoken';
import {
    JWT_EXPIRATION_TIME_ACCESS_TOKEN,
    JWT_EXPIRATION_TIME_REFRESH_TOKEN,
    JWT_SECRET_ACCESS_TOKEN,
    JWT_SECRET_REFRESH_TOKEN
} from "../config/config.js";



export const createToken = (user) => {
    const payload = { email: user.email, _id: user._id, role: user.role };

    const accessToken = jwt.sign(
        payload,
        process.env.SECRET_KEY_ACCESS_TOKEN,       // must be string
        { expiresIn: process.env.JWT_EXPIRATION_TIME_ACCESS_TOKEN || "15m" } // fallback
    );

    const refreshToken = jwt.sign(
        payload,
        process.env.SECRET_KEY_REFRESH_TOKEN,      // must be string
        { expiresIn: process.env.JWT_EXPIRATION_TIME_REFRESH_TOKEN || "7d" } // fallback
    );

    return { accessToken, refreshToken };
};


export const verifyAccessToken = async (token)=>{
    try {
        return await jwt.verify(token, process.env.SECRET_KEY_ACCESS_TOKEN);
    }catch (err) {
        throw err;
    }
}

export const verifyRefreshToken = async (token) => {
    try {
        return await jwt.verify(token, process.env.SECRET_KEY_REFRESH_TOKEN);
    } catch (err) {
        throw err;
    }
};