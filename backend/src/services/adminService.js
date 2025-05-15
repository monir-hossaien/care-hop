import DoctorProfileModel from "../models/doctorProfileModel.js";
import mongoose from "mongoose";
import UserModel from "../models/userModel.js";

const objectID = mongoose.Types.ObjectId;

export const verifyDoctorRequestService = async (req) => {
    try {
        const userID = new objectID(req.params.doctorID); // doctorID is actually the userID
        const status = req.body.status?.toLowerCase();

        if (!["approved", "rejected", "pending"].includes(status)) {
            return {
                statusCode: 400,
                status: false,
                message: "Invalid status value"
            };
        }

        const doctorProfile = await DoctorProfileModel.findOne({ userID });
        if (!doctorProfile) {
            return {
                statusCode: 404,
                status: false,
                message: "Doctor profile not found"
            };
        }

        await DoctorProfileModel.updateOne(
            { userID },
            { $set: { status } }
        );

        if (status === "approved") {
            await UserModel.updateOne(
                { _id: userID },
                { $set: { role: "doctor", isDoctorApproved: true } }
            );
        }

        return {
            statusCode: 200,
            status: true,
            message: "Status updated successfully"
        };
    } catch (e) {
        return {
            statusCode: 500,
            status: false,
            message: "Something went wrong!",
            error: e.message
        };
    }
};
