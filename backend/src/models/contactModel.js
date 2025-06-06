import mongoose from "mongoose";

const dataSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email:{
            type: String,
            required: true,
            lowercase: true,
            trim: true,
        },
        phone: {
            type: String,
            required: true,
        },
        subject: {
            type: String,
            required: true,
            trim: true,
        },
        message: {
            type: String,
            required: true,
            trim: true,
        }

    },{
        timestamps: true,
        versionKey: false,
    })

const Contact = mongoose.model("contact", dataSchema);

export default Contact;