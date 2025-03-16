
import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import {createToken} from "../utility/JWT.js";
import {fileUpload} from "../helper/helper.js";


// user registration service
export const registerService = async (req)=>{
    try {
        const reqBody = req.body;
        // password make encrypted
        let salt = bcrypt.genSaltSync(10);
        const hashPassword = await bcrypt.hashSync(reqBody.password, salt);
        reqBody.password = hashPassword;

        //check user exit or not
        const existingUser = await User.findOne({email: reqBody.email})
        if(existingUser){
            return{
                statusCode: 400,
                status: false,
                message: "User already exists"
            }
        }
        // file upload to cloudinary
        if(req.file){
            let result = await fileUpload(req.file?.path ||"", "Doctor_finder/user");
            reqBody.profileImage = result;
        }
        // new user create
        const user = await User.create(reqBody);
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
