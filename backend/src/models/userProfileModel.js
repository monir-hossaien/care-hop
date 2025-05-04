
import { mongoose } from 'mongoose';

const dataSchema = new mongoose.Schema(
    {
        phone: {
            type: String,
            required: true
        },
        gender: {
            type: String,
            enum: ["Male", "Female", "Other"],
            required: true
        },
        image: {
            type: String,
            default: "",
        },
        userID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const UserProfile = mongoose.model("userProfile", dataSchema);

export default UserProfile;
