import React, {useEffect, useState} from 'react';

import parse from 'html-react-parser';
import { blogStore } from "../store/blogStore.js";
import { TimestampToDate } from "../helpers/helper.js";
import {Link} from "react-router-dom";
import BlogSkeleton from "../skeleton/blogSkeleton.jsx";
import BlogDetailsSkeleton from "../skeleton/blogDetailsSkeleton.jsx";
import SidebarSkeleton from "../skeleton/sidebarSkeleton.jsx";

const BlogDetails = () => {
    const { blogDetails, blogList, updateBlogRequest } = blogStore();

    if (blogDetails === null) {
        return <BlogDetailsSkeleton/>
    }
    return (
        <div className="container px-4 sm:px-6 md:px-0 py-10">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                {/* Main Content */}
                <div className="md:col-span-8">
                    <div className="w-full h-auto">
                        <img src={blogDetails?.image} alt="Blog Banner" className="w-full rounded-lg object-cover" />
                    </div>
                    <div className="py-6 space-y-4">
                        <p className="text-sm text-gray-500">Category: {blogDetails?.category}</p>
                        <h1 className="text-3xl font-bold text-[#1CA288]">{blogDetails?.title}</h1>
                        {blogDetails?.content.split('\n\n').map((para, idx) => (
                            <p key={idx} className="text-base leading-7 text-gray-700">{parse(para)}</p>
                        ))}
                    </div>
                </div>

                {/* Sidebar: Recent Blogs */}
                <div className="md:col-span-4">
                    <div className="bg-white shadow-md rounded-lg border border-gray-200 p-6">
                        <h2 className="text-xl font-semibold text-[#1CA288]">Recent Blogs</h2>
                        <hr className="mt-2 mb-4 border-[#164193] w-16 border-2" />

                        {blogList === null ? (
                            <SidebarSkeleton/>
                        ) : (
                            blogList.map((blog, index) => {
                                const {_id, image, title, views, createdAt} = blog
                                return (
                                    <div key={index} className="mb-6">
                                        <Link to={`/blog-details/${_id}`} onClick={()=> updateBlogRequest(_id, {views: views + 1})}><img src={image}
                                                                                           alt="Recent Blog"
                                                                                           className="w-full rounded"/></Link>
                                        <div className="mt-3 text-center border-b pb-4 border-gray-300">
                                            <p className="text-sm text-gray-500">{TimestampToDate(createdAt)}</p>
                                            <h3 className="text-lg font-semibold text-[#1CA288] hover:text-[#164193]">{title}</h3>
                                        </div>
                                    </div>
                                )
                            })
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogDetails;
