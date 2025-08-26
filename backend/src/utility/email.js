// import nodemailer from "nodemailer";
// import {EMAIL_HOST, EMAIL_PASSWORD, EMAIL_PORT, EMAIL_USER, EMAIL_FROM} from "../config/config.js";
//
// const SendEmail = async(email, subject, text)=>{
//
//     let transporter = nodemailer.createTransport({
//         host: EMAIL_HOST,
//         port: EMAIL_PORT,
//         secure: false,
//         auth:{
//             user: EMAIL_USER,
//             pass: EMAIL_PASSWORD
//         },
//         tls:{
//             rejectUnauthorized: false
//         }
//     })
//
//     let mailOptions = {
//         from: EMAIL_FROM,
//         to: email,
//         subject,
//         text: text
//     }
//
//
//     return await transporter.sendMail(mailOptions)
// }
//
// export default SendEmail;

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const SendEmail = async (email, subject, text) => {
    try {
        const result = await resend.emails.send({
            from: 'onboarding@resend.dev', // ✅ Must be EXACTLY this
            to: email,
            subject,
            text,
        });
        console.log("Email sent:", result);
    } catch (err) {
        console.error("Resend email error:", err);
        throw err;
    }
};





