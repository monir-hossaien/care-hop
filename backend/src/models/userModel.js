import {mongoose} from "mongoose";

const dataSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        password: {
            type: String
        },
        role: {
            type: String,
            enum: ["doctor", "user", "admin"],
            default: "user",
        },
        isDoctorApproved: {
            type: Boolean,
            default: false
        },
        provider: {
            type: String,
            enum: ["google", "email"],
            default: "email",
        },
        refreshToken: {
            type: String,
            default: "",
        }
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const User = mongoose.model("user", dataSchema);

export default User;
