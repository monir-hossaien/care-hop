import React from 'react';

import DashboardLayout from "../../layout/DashboardLayout.jsx";
import AllBlog from "../../components/dashboard/AllBlog.jsx";

const BlogManagePage = () => {


    return (
        <DashboardLayout>
            <AllBlog />
        </DashboardLayout>
    );
};

export default BlogManagePage;