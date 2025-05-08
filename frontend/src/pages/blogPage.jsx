import React from 'react';

import MasterLayout from "../layout/MasterLayout.jsx";
import BlogList from "../components/BlogList.jsx";

const BlogPage = () => {

    return (
        <MasterLayout>
            <BlogList/>
        </MasterLayout>
    );
};

export default BlogPage;