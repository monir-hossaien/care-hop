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
            unique: true
        },
        phone: {
            type: String,
            required: true,
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