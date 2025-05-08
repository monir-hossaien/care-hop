
import {changePasswordService, loginService, registerService} from "../services/userService.js";
import {COOKIE_EXPIRE_TIME} from "../config/config.js";

// user register
export const register = async (req, res) => {
    const result = await registerService(req)
    return res.status(result.statusCode).json(result)
}

// user login
export const login = async (req, res) => {
    let result = await loginService(req);
    const cookieOptions = {
        httpOnly: true,
        secure: false, // only true in production with HTTPS
        sameSite: "none", // "none" only works with secure: true
        maxAge: COOKIE_EXPIRE_TIME,
        path: "/",
    };
    res.cookie("token", result.token, cookieOptions);
    return res.status(result.statusCode).json(result);
};

// user logout
export const logout = async(req, res)=>{
    try {
        res.clearCookie("token");
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