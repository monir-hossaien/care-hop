import mongoose from "mongoose";

import Blog from "../models/blogModel.js";
import {deleteImage, fileUpload, getPublicID} from "../helper/helper.js";
const objID = mongoose.Types.ObjectId;

export const createBlogService = async (req) => {
    try {
        const reqBody = req.body;
        const userID = new objID(req.headers.id);
        reqBody.userID = userID;
        const title = reqBody.title;
        const blog = await Blog.findOne({title})
        if (blog) {
            return{
                statusCode: 400,
                status: false,
                message: "This blog already exists"
            }
        }
        // file upload to cloudinary
        if (req.file) {
            let result = await fileUpload(req.file?.path || "", "Doctor_finder/blog");
            reqBody.image = result;
        }
        // save or update profile
        const result = await Blog.create(reqBody)
        if(!result){
            return{
                statusCode: 400,
                status: false,
                message: "Request failed"
            }
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

export const fetchBlogListService = async (req) => {
    try {
        const matchStage = {$match:{}}
        const joinWithUserCollection = {
            $lookup: {
                from: "users",
                localField: "userID",
                foreignField: "_id",
                as: "user"
            }
        }
        const unwindStage = {
            $unwind: {
                path: "$user",
                preserveNullAndEmptyArrays: true
            }
        }
        const projection = {
            $project: {
                title: 1,
                image: 1,
                shortDes: 1,
                createdAt: 1,
                views: 1,
                category: 1,
                "user.role": 1
            }
        }
        const pipeline = [
            matchStage,
            joinWithUserCollection,
            unwindStage,
            projection
        ]
        const result = await Blog.aggregate(pipeline)
        if (!result || result.length === 0) {
            return {
                statusCode: 404,
                status: false,
                message: "No blogs found"
            };
        }
        return {
            statusCode: 200,
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

export const fetchBlogsByCategoryService = async (req) => {
    try {
        const category = req.params.category;
        const matchStage = {
            $match:{category}
        }
        const joinWithUserCollection = {
            $lookup: {
                from: "users",
                localField: "userID",
                foreignField: "_id",
                as: "user"
            }
        }
        const unwindStage = {
            $unwind: {
                path: "$user",
                preserveNullAndEmptyArrays: true
            }
        }
        const projection = {
            $project: {
                title: 1,
                image: 1,
                category: 1,
                shortDes: 1,
                createdAt: 1,
                views: 1,
                "user.role": 1
            }
        }
        const pipeline = [
            matchStage,
            joinWithUserCollection,
            unwindStage,
            projection
        ]
        const result = await Blog.aggregate(pipeline)
        if (!result || result.length === 0) {
            return {
                statusCode: 404,
                status: false,
                message: "No blogs found"
            };
        }
        return {
            statusCode: 200,
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

export const readBlogService = async (req) => {
    try {
        const blogID = new objID(req.params.blogID);
        const result = await Blog.findOne({_id: blogID})
        if(!result || result.length < 1){
            return{
                statusCode: 404,
                status: false,
                message: "Blog not found!"
            }
        }
        return {
            statusCode: 200,
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

export const updateBlogService = async (req) => {
    try {
        const reqBody = req.body;
        let views = parseInt(reqBody.views);
        reqBody.views = views;
        const blogID = new objID(req.params.blogID);
        const blog = await Blog.findOne({_id: blogID})
        if(!blog || blog.length < 1){
            return{
                statusCode: 404,
                status: false,
                message: "Blog not found!"
            }
        }
        // file upload to cloudinary
        if(req.file){
            if(blog && blog['image']){
                const publicID = getPublicID(blog['image']);
                await deleteImage(publicID);
            }
            let result = await fileUpload(req.file?.path || "", "Doctor_finder/blog");
            reqBody.image = result;
        }
        // save or update profile
        const result = await Blog.updateOne({_id: blogID}, {$set: reqBody, new: true})
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

export const deleteBlogService = async (req) => {
    try {
        const blogID = new objID(req.params.blogID);
        const result = await Blog.findOne({_id: blogID})
        if(!result || result.length < 1){
            return{
                statusCode: 404,
                status: false,
                message: "Blog not found!"
            }
        }
        await Blog.deleteOne({_id: blogID})
        return {
            statusCode: 200,
            status: true,
            message: "Request success",
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