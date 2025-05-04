import React, {useEffect} from 'react';

import MasterLayout from "../layout/MasterLayout.jsx";
import BlogDetails from "../components/BlogDetails.jsx";
import {blogStore} from "../store/blogStore.js";
import {useParams} from "react-router-dom";

const BlogDetailsPage = () => {
    const {readBlogRequest, fetchBlogsByCategory} = blogStore();
    const {blogID} = useParams()
    const {category} = useParams()

    useEffect(()=>{
        (async ()=>{
            await readBlogRequest(blogID);
            await fetchBlogsByCategory(category);
        })()
    },[readBlogRequest, fetchBlogsByCategory])

    return (
        <MasterLayout>
            <BlogDetails />
        </MasterLayout>
    );
};

export default BlogDetailsPage;