import React from 'react';
import MasterLayout from "../layout/MasterLayout.jsx";
import BlogList from "../components/BlogList.jsx";
import PostSkeleton from "../skeleton/postSkeleton.jsx";

const BlogPage = () => {
    return (
        <MasterLayout>
            <BlogList/>
        </MasterLayout>
    );
};

export default BlogPage;