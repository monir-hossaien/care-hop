
import { mongoose } from 'mongoose';

const dataSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            minlength: [4, "Name must be at least 4 characters"],
            maxlength: [30, "Name must be less than 20 characters"],
        },
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
        address: {
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

const Profile = mongoose.model("Profile", dataSchema);

export default Profile;
