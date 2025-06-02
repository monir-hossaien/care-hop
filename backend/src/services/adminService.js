import DoctorProfileModel from "../models/doctorProfileModel.js";
import mongoose from "mongoose";
import UserModel from "../models/userModel.js";
import DoctorProfile from "../models/doctorProfileModel.js";
import {deleteImage, getPublicID} from "../helper/helper.js";
import Contact from "../models/contactModel.js";
import Specialties from "../models/SpecialtiesModel.js";
import Hospital from "../models/hospitalModel.js";
import Blog from "../models/blogModel.js";
import User from "../models/userModel.js";

const objectID = mongoose.Types.ObjectId;

//verify doctor request
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
                message: "Doctor not found"
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
        }else{
            await UserModel.updateOne(
                { _id: userID },
                { $set: { role: "user", isDoctorApproved: false } }
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

// fetch all doctorList
export const fetchDoctorListService = async ()=>{
    try {
        const matchStage = {
            $match: {}
        }
        // join with user collection
        const joinWithUser = {
            $lookup:{
                from: "users",
                localField: "userID",
                foreignField: "_id",
                as: "user",
            }
        }
        // join with hospital collection
        const joinWithHospital = {
            $lookup:{
                from: "hospitals",
                localField: "hospitalID",
                foreignField: "_id",
                as: "hospitalDetails",
            }
        }
        // join with specialities collection
        const joinWithSpecialities = {
            $lookup:{
                from: "specialties",
                localField: "specialityID",
                foreignField: "_id",
                as: "specialities",
            }
        }

        // join with review collection
        const joinWithReview = {
            $lookup:{
                from: "reviews",
                localField: "doctorID",
                foreignField: "_id",
                as: "reviews",
            }
        }
        const projection = {
            $project: {
                _id: 1,
                userID: 1,
                name: 1,
                designation: 1,
                registrationNo: 1,
                image: 1,
                degree: 1,
                experience: 1,
                gender: 1,
                phone: 1,
                consultationFee: 1,
                availableSlot: 1,
                specialization: 1,
                status: 1,
                createdAt: 1,
                "user.email": 1,
                "hospitalDetails.name": 1,
                "hospitalDetails.area": 1,
                "specialities.name": 1,
            }
        }
        const pipeline = [
            matchStage,
            joinWithUser,
            {$unwind: {path: "$user", preserveNullAndEmptyArrays: true}},
            joinWithHospital,
            {$unwind: {path: "$hospitalDetails", preserveNullAndEmptyArrays: true}},
            joinWithSpecialities,
            {$unwind: {path: "$specialities", preserveNullAndEmptyArrays: true}},
            joinWithReview,
            {$unwind: {path: "$reviews", preserveNullAndEmptyArrays: true}},
            projection,
        ]
        const result = await DoctorProfile.aggregate(pipeline);

        if(!result){
            return{
                statusCode: 400,
                status: false,
                message: "Request failed"
            }
        }
        return {
            statusCode: 200,
            status: true,
            message: "Request success",
            data: result
        }
    }
    catch (e) {
        return {
            statusCode: 500,
            status: false,
            message: "Something went wrong!",
            error: e.message
        }
    }
}

// delete doctor
export const deleteDoctorService = async (req)=>{
    try {
        const doctorID = new objectID(req.params.doctorID);
        const doctor = await DoctorProfile.findOne({userID: doctorID})
        if (!doctor) {
            return {
                statusCode: 404,
                status: false,
                message: "Doctor not found"
            }
        }
        // delete image from cloudinary
        if(doctor['image']){
            const publicID = getPublicID(doctor['image']);
            await deleteImage(publicID);
        }
        await DoctorProfileModel.deleteOne({userID: doctorID});
        await UserModel.deleteOne({_id: doctorID});

        return {
            statusCode: 200,
            status: true,
            message: "Request success",
        }
    }
    catch (e) {
        return {
            statusCode: 500,
            status: false,
            message: "Something went wrong!",
            error: e.message
        }
    }
}

// total doctor count
export const doctorCountService = async () => {
    try {
        const doctorCount = await DoctorProfileModel.find({ status: "approved" }).countDocuments();
        if (!doctorCount) {
            return {
                statusCode: 404,
                status: false,
                message: "Doctor not found"
            };
        }

        return {
            statusCode: 200,
            status: true,
            message: "Request success",
            data: doctorCount
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

// total user count
export const userCountService = async () => {
    try {
        const userCount = await User.find().countDocuments();
        if (!userCount) {
            return {
                statusCode: 404,
                status: false,
                message: "No user found"
            };
        }

        return {
            statusCode: 200,
            status: true,
            message: "Request success",
            data: userCount
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

// total blog count
export const blogCountService = async () => {
    try {
        const blogCount = await Blog.find().countDocuments();
        if (!blogCount) {
            return {
                statusCode: 404,
                status: false,
                message: "No blog found"
            };
        }

        return {
            statusCode: 200,
            status: true,
            message: "Request success",
            data: blogCount
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

// total hospital count
export const hospitalCountService = async () => {
    try {
        const hospitalCount = await Hospital.find().countDocuments();
        if (!hospitalCount) {
            return {
                statusCode: 404,
                status: false,
                message: "No hospital found"
            };
        }

        return {
            statusCode: 200,
            status: true,
            message: "Request success",
            data: hospitalCount
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

// total specialities count
export const specialitiesCountService = async () => {
    try {
        const specialitiesCount = await Specialties.find().countDocuments();
        if (!specialitiesCount) {
            return {
                statusCode: 404,
                status: false,
                message: "No specialities found"
            };
        }

        return {
            statusCode: 200,
            status: true,
            message: "Request success",
            data: specialitiesCount
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

// total message Count
export const messageCountService = async () => {
    try {
        const messageCount = await Contact.find().countDocuments();
        if (!messageCount) {
            return {
                statusCode: 404,
                status: false,
                message: "No message found"
            };
        }

        return {
            statusCode: 200,
            status: true,
            message: "Request success",
            data: messageCount
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

// total doctor request count
export const doctorRequestCountService = async () => {
    try {
        const doctorRequestCount = await DoctorProfileModel.find({ status: "pending" }).countDocuments();
        if (!doctorRequestCount) {
            return {
                statusCode: 404,
                status: false,
                message: "No Request found",
            };
        }

        return {
            statusCode: 200,
            status: true,
            message: "Request success",
            data: doctorRequestCount
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
