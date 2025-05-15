import {mongoose} from "mongoose";

const dataSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ["doctor", "user", "admin"],
            default: "user",
        },
        isDoctorApproved: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const User = mongoose.model("user", dataSchema);

export default User;
