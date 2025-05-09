import {create} from "zustand"
import axios from "axios";
const base_url = "http://localhost:5000/api/v1"

export const blogStore = create((set)=>({

    blogList: null,
    fetchBlogList: async () => {
        let result = await axios.get(`${base_url}/fetch-blogs`)
        if(result.data.status === true){
            set({blogList: result.data.data})
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
        }
    },
    fetchBlogsByCategory: async (category) => {
        let result = await axios.get(`${base_url}/fetch-blogs-by-category/${category}`)
        if(result.data.status === true){
            set({blogList: result.data.data})
        }
    }

}))
