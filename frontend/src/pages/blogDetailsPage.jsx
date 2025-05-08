import React, {useEffect} from 'react';

import MasterLayout from "../layout/MasterLayout.jsx";
import BlogDetails from "../components/BlogDetails.jsx";
import {blogStore} from "../store/blogStore.js";
import {useLocation, useParams} from "react-router-dom";

const BlogDetailsPage = () => {
    const {blogDetails, readBlogRequest, fetchBlogsByCategory} = blogStore();
    const {blogID} = useParams()
    const category = blogDetails?.category
    const pathName = useLocation().pathname;

    useEffect(()=>{
        (async ()=>{
            await readBlogRequest(blogID);
            if(blogDetails !== null){
                await fetchBlogsByCategory(category);
            }
        })()
    },[pathName, category, readBlogRequest, fetchBlogsByCategory])

    return (
        <MasterLayout>
            <BlogDetails />
        </MasterLayout>
    );
};

export default BlogDetailsPage;