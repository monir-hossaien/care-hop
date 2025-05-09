import React, {useEffect} from 'react';

import MasterLayout from "../layout/MasterLayout.jsx";
import BlogDetails from "../components/BlogDetails.jsx";
import {blogStore} from "../store/blogStore.js";
import {useLocation, useParams} from "react-router-dom";

const BlogDetailsPage = () => {
    const { blogDetails, readBlogRequest, fetchBlogsByCategory } = blogStore();
    const { blogID } = useParams();
    const pathname = useLocation().pathname;

    // 1. Fetch blog details on pathname/blogID change
    useEffect(() => {
        (async () => {
            await readBlogRequest(blogID);
        })();
    }, [pathname, blogID]);

    // 2. When blogDetails.category is available, fetch related blogs
    useEffect(() => {
        (async ()=>{
            if (blogDetails?.category) {
                await fetchBlogsByCategory(blogDetails.category);
            }
        })()
    }, [blogDetails?.category]);

    return (
        <MasterLayout>
            <BlogDetails />
        </MasterLayout>
    );
};

export default BlogDetailsPage;