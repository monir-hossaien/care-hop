
// contact hospital
import {contactService, deleteMessageService, messageListService} from "../services/contactService.js";

export const contact = async (req, res) => {
    const result = await contactService(req)
    return res.status(result.statusCode).json(result)
}

// contact list
export const messageList = async (req, res) => {
    const result = await messageListService()
    return res.status(result.statusCode).json(result)
}

// delete message
export const deleteMessage = async (req, res) => {
    const result = await deleteMessageService(req)
    return res.status(result.statusCode).json(result)
}