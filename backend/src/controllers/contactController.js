
// contact hospital
import {contactService, contactListService} from "../services/contactService.js";

export const contact = async (req, res) => {
    const result = await contactService(req)
    return res.status(result.statusCode).json(result)
}

// contact list
export const contactList = async (req, res) => {
    const result = await contactListService(req)
    return res.status(result.statusCode).json(result)
}