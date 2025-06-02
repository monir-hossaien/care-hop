
import {create} from "zustand"
import axios from "axios";
import {unauthorized} from "../helpers/helper.js";
const base_url = "https://care-hop.vercel.app/api/v1"


export const contactStore = create((set)=>({


    createContact: async (data) => {
        let result = await axios.post(`${base_url}/create-contact`, data)
        return result.data
    },

    messageList: null,
    fetchMessageList: async (data) => {
        try{
            let result = await axios.get(`${base_url}/message-list`, {withCredentials: true})
            if(result.data.status === true){
                const data = result.data?.data
                set({messageList: data})
            }
        }catch(error){
            unauthorized(error?.response?.status);
            throw error
        }
    },

    deleteMessageRequest: async (id) => {
        try{
            let result = await axios.delete(`${base_url}/delete-message/${id}`, {withCredentials: true})
            return result.data
        }catch(error){
            unauthorized(error?.response?.status);
            throw error
        }
    }
}))