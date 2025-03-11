import jwt from 'jsonwebtoken';
import {JWT_EXPIRATION_TIME_ACCESS_TOKEN, JWT_SECRET_ACCESS_TOKEN} from "../config/config.js";

export const createToken = (email, _id)=>{
    const payload = {email:email, id: _id};
    const options = {expiresIn: JWT_EXPIRATION_TIME_ACCESS_TOKEN}
    const token  = jwt.sign(payload, JWT_SECRET_ACCESS_TOKEN, options);
    return token;
}

export const verifyToken = async (token)=>{
    try {
        const decodedToken = await jwt.verify(token, JWT_SECRET_ACCESS_TOKEN);
        return decodedToken;
    }catch (e) {
        return null;
    }
}