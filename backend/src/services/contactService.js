import Contact from "../models/contactModel.js";
import mongoose from "mongoose";
import req from "express/lib/request.js";


export const contactService = async (req) => {
    try {
        const reqBody = req.body;
        const newContact = await Contact.create(reqBody);
        if (!newContact) {
            return {
                statusCode: 400,
                status: false,
                message: "Request failed"
            };
        }

        return {
            statusCode: 201,
            status: true,
            message: "Message sent success",
            data: newContact
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

export const messageListService = async () => {
    try {

        const contactList = await Contact.aggregate([
            {
                $project: {
                    updatedAt: 0
                }
            }
        ]);

        if (!contactList || contactList.lenght === 0) {
            return {
                statusCode: 404,
                status: false,
                message: "No contacts found."
            };
        }

        return {
            statusCode: 200,
            status: true,
            message: "Request success",
            data: contactList
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

export const deleteMessageService = async (req) => {
    try {
        const _id = new mongoose.Types.ObjectId(req.params.id);
        const contact = await Contact.findOne({_id})
        if (!contact) {
            return {
                statusCode: 404,
                status: false,
                message: "No contacts found."
            };
        }
        const result = await Contact.deleteOne({_id: _id});
        if (!result) {
            return {
                statusCode: 400,
                status: false,
                message: "Request failed"
            }
        }
        return {
            statusCode: 200,
            status: true,
            message: "Request success"
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

