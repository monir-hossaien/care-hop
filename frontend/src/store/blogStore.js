import {create} from "zustand"
import axios from "axios";
import {unauthorized} from "../helpers/helper.js";
import {base_url} from "../../baseURL/index.js";
import api from "../axios/api.js";

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
            let result = await api.get("/fetch-doctor-blog")
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
            let result = await api.post("/create-blog", data)
            return result.data
        }catch(err){
            unauthorized(err?.response?.status);
            throw err;
        }
    },

    updateBlogRequest: async (blogID, data) => {
        try{
            let result = await api.put(`/update-blog/${blogID}`, data)
            return result.data
        }catch(err){
            unauthorized(err?.response?.status);
            throw err;
        }
    },
    deleteBlogRequest: async (blogID) => {
        try{
            let result = await api.delete(`/delete-blog/${blogID}`)
            return result.data
        }catch(err){
            unauthorized(err?.response?.status);
            throw err;
        }
    }

}))
