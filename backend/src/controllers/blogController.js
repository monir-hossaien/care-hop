import {
    createBlogService,
    deleteBlogService,
    fetchBlogListService,
    readBlogService,
    updateBlogService,
    fetchBlogsByCategoryService, viewIncrementService, fetchDoctorBlogService
} from "../services/blogService.js";

export const createBlog  = async (req, res) => {
    const result = await createBlogService(req)
    return res.status(result.statusCode).json(result)
}

export const fetchBlogs  = async (req, res) => {
    const result = await fetchBlogListService()
    return res.status(result.statusCode).json(result)
}

export const fetchBlogsByCategory  = async (req, res) => {
    const result = await fetchBlogsByCategoryService(req)
    return res.status(result.statusCode).json(result)
}

export const readBlog  = async (req, res) => {
    const result = await readBlogService(req)
    return res.status(result.statusCode).json(result)
}

export const updateBlog  = async (req, res) => {
    const result = await updateBlogService(req)
    return res.status(result.statusCode).json(result)
}

export const viewIncrement  = async (req, res) => {
    const result = await viewIncrementService(req)
    return res.status(result.statusCode).json(result)
}

export const deleteBlog  = async (req, res) => {
    const result = await deleteBlogService(req)
    return res.status(result.statusCode).json(result)
}

export const fetchDoctorBlog  = async (req, res) => {
    const result = await fetchDoctorBlogService(req)
    return res.status(result.statusCode).json(result)
}