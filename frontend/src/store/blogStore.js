import {create} from "zustand"
import axios from "axios";
import {unauthorized} from "../helpers/helper.js";
const base_url = "http://localhost:5000/api/v1"


export const blogStore = create((set)=>({

    formData: {
        title: '',
        category: '',
        shortDes: '',
        content: '',
        image: '',
    },
    inputOnChange: (name, value) => {
        set((state) => ({
            formData: {
                ...state.formData,
                [name]: value
            }
        }))
    },

    resetFormData: () => set({
        formData: {
            title: '',
            category: '',
            shortDes: '',
            content: '',
            image: '',
        },
    }),

    blogList: null,
    fetchBlogList: async () => {
        let result = await axios.get(`${base_url}/fetch-blogs`)
        if(result.data.status === true){
            set({blogList: result.data?.data})
        }
    },
    fetchDoctorBlogs: async () => {
        try{
            let result = await axios.get(`${base_url}/fetch-doctor-blog` , {withCredentials: true})
            if(result.data.status === true){
                set({blogList: result.data?.data})
            }
        }catch(error){
            unauthorized(error?.response?.status)
            throw error;
        }
    },
    viewIncrementRequest: async (blogID, data) => {
         await axios.patch(`${base_url}/update-blog/view/${blogID}`, data)
    },

    blogDetails: null,
    readBlogRequest: async (blogID) => {
        let result = await axios.get(`${base_url}/read-blog/${blogID}`)
        if(result.data.status === true){
            set({blogDetails: result.data.data})
            set({formData: result.data.data})
        }
    },

    fetchBlogsByCategory: async (category) => {
        let result = await axios.get(`${base_url}/fetch-blogs-by-category/${category}`)
        if(result.data.status === true){
            set({blogList: result.data.data})
        }
    },

    postBlogRequest: async (data) => {
        try{
            let result = await axios.post(`${base_url}/create-blog`, data, {withCredentials: true})
            return result.data
        }catch(err){
            unauthorized(err?.response?.status);
            throw err;
        }
    },

    updateBlogRequest: async (blogID, data) => {
        try{
            let result = await axios.put(`${base_url}/update-blog/${blogID}`, data, {withCredentials: true})
            return result.data
        }catch(err){
            unauthorized(err?.response?.status);
            throw err;
        }
    },
    deleteBlogRequest: async (blogID) => {
        try{
            let result = await axios.delete(`${base_url}/delete-blog/${blogID}`, {withCredentials: true})
            return result.data
        }catch(err){
            unauthorized(err?.response?.status);
            throw err;
        }
    }

}))
