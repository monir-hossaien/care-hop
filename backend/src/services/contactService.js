import Contact from "../models/contactModel.js";


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

export const contactListService = async (req) => {
    try {

        const contactList = await Contact.aggregate([
            {
                $project: {
                    createdAt: 0,
                    updatedAt: 0
                }
            }
        ]);

        if (!contactList) {
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

