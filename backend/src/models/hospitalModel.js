import mongoose from "mongoose";

const dataSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        address: {
            area: { type: String, required: true },
            district: { type: String, required: true },
            division: { type: String, required: true },
        },
        contact: {
            phone: { type: String, required: true },
            email: { type: String },
            website: { type: String },
        },
        rating: { type: Number, min: 1, max: 5, default: 5 }, // Rating range 1-5
    },
    { timestamps: true }
);

const Hospital = mongoose.model("Hospital", dataSchema);

export default Hospital;
