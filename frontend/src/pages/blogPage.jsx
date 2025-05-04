import React, {useEffect} from 'react';
import MasterLayout from "../layout/MasterLayout.jsx";
import BlogList from "../components/BlogList.jsx";
import PostSkeleton from "../skeleton/postSkeleton.jsx";
import {blogStore} from "../store/blogStore.js";

const BlogPage = () => {
    const {fetchBlogList} = blogStore();

    useEffect(() => {
        (async ()=>{
            await fetchBlogList();
        })()
    },[fetchBlogList]);

    return (
        <MasterLayout>
            <BlogList/>
        </MasterLayout>
    );
};

export default BlogPage;