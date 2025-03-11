import mongoose from "mongoose";

const dataSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        hospitalId: { type: mongoose.Schema.Types.ObjectId, ref: "Hospital", required: true },
        specialization: { type: mongoose.Schema.Types.ObjectId, ref: "Specialties", required: true },
        experience: { type: Number, required: true },
        degrees: { type: String},
        consultationFee: { type: Number, required: true },
        availableSlots: [
            {
                day: { type: [String], required: true },
                timeSlots: { type: [String], required: true },
            },
        ],
        ratings: { type: Number, default: 0 },
        reviews: { type: mongoose.Schema.Types.ObjectId, ref: "Review" },
        status: { type: String, enum: ["active", "Inactive"], default: "active"},
        location: {
            area: String,
            district: String,
            division: String
        },
    },
    { timestamps: true }
);

const Doctor = mongoose.model("Doctor", dataSchema);
