import nodemailer from "nodemailer";
import {EMAIL_HOST, EMAIL_PASSWORD, EMAIL_PORT, EMAIL_USER, EMAIL_FROM} from "../config/config";

const SendEmail = async(email, subject, emailBody)=>{


    let transporter = nodemailer.createTransport({
        host: EMAIL_HOST,
        port: EMAIL_PORT,
        secure: false,
        auth:{
            user: EMAIL_USER,
            pass: EMAIL_PASSWORD
        },
        tls:{
            rejectUnauthorized: false
        }
    })

    let mailOptions = {
        from: EMAIL_FROM,
        to: email,
        subject,
        html: emailBody
    }


    return await transporter.sendMail(mailOptions)
}

export default SendEmail;