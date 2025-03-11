import {verifyToken} from "../utility/JWT.js";

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