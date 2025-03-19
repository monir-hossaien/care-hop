import Review from "../models/reviewModel.js";
import mongoose from "mongoose";
const objID = mongoose.Types.ObjectId;

export const saveReviewService = async (req) => {
    try {
        let reqBody = req.body;
        const doctorID = new objID(req.params.doctorID);
        reqBody.doctorID = doctorID;

        const result = await Review.create(reqBody);
        if (!result) {
            return {
                statusCode: 400,
                status: false,
                message: "Request failed"
            };
        }

        return {
            statusCode: 201,
            status: true,
            message: "Request success",
            data: result
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


export const fetchReviewsService = async (req) => {
    try {
        const result = await Review.find();
        if (!result) {
            return {
                statusCode: 400,
                status: false,
                message: "Request failed"
            };
        }

        return {
            statusCode: 201,
            status: true,
            message: "Request success",
            data: result
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
