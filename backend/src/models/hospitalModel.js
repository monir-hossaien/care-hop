import mongoose from "mongoose";

const dataSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        image: {
            type: String
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
        phone: {
            type: String,
            required: true
        },
        email: {
            type: String
        },
        website: {
            type: String
        }
    },{
        timestamps: true,
        versionKey: false,
    }
);

const Hospital = mongoose.model("Hospital", dataSchema);

export default Hospital;
