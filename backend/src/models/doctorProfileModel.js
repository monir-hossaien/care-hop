import mongoose from "mongoose";

const dataSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        designation: {
            type: String,
            required: true,
        },
        registrationNo: {
            type: String,
            required: true,
        },
        phone:{
            type: String,
            required: true,
        },
        experience: { type: Number, required: true },
        degree: { type: String, required: true },
        consultationFee: { type: Number, required: true },
        gender: { type: String, default: "" },
        availableSlot: {
            days: {
                type: [String],
                enum: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                required: true
            },
            timeSlots: {
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
            required: true
        },
        image: {
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
        },
        status: {
            type: String,
            enum: ['pending', 'approved', 'rejected'],
            default: 'pending',
            lowerCase: true,
        },
    },{
        timestamps: true,
        versionKey: false,
    }
);

const DoctorProfile = mongoose.model("doctorProfile", dataSchema);

export default DoctorProfile;
