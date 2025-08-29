
import {create} from "zustand"
import axios from "axios";
import {unauthorized} from "../helpers/helper.js";
import {base_url} from "../baseURL/index.js";
import api from "../axios/api.js";

export const contactStore = create((set)=>({


    createContact: async (data) => {
        let result = await axios.post(`${base_url}/create-contact`, data)
        return result.data
    },

    messageList: null,
    fetchMessageList: async (data) => {
        try{
            let result = await api.get("/message-list")
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
            let result = await api.delete(`/delete-message/${id}`)
            return result.data
        }catch(error){
            unauthorized(error?.response?.status);
            throw error
        }
    }
}))