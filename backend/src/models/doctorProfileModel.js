import mongoose from "mongoose";

const dataSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        designation: {
            type: String,
            default: "",
        },
        experience: { type: Number, required: true },
        degrees: { type: String, default: ""},
        consultationFee: { type: Number, required: true },
        availableSlots: {
            day: {
                type: [String],
                enum: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                required: true
            },
            timeSlot: {
                type: [String],
                required: true
            }
        },
        division: {
            type: String,
            required: true
        },
        district: {
            type: String,
            required: true
        },
        post: {
            type: String,
            required: true
        },
        area: {
            type: String,
        },
        profileImage: {
            type: String,
            default: "https://www.ibnsinatrust.com/upload/default.jpg"
        },
        hospitalID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Hospital",
            required: true
        },
        specialityID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Specialities",
            required: true
        },
        userID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
        }
    },{
        timestamps: true,
        versionKey: false,
    }
);

const DoctorProfile = mongoose.model("doctorProfile", dataSchema);

export default DoctorProfile;
