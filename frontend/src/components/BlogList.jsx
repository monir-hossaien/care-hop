import React, { useEffect, useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import { blogStore } from "../store/blogStore.js";
import { TimestampToDate } from "../helpers/helper.js";
import BlogSkeleton from "../skeleton/blogSkeleton.jsx";
import Banner from "./Banner.jsx";

const BlogList = () => {
    const location = useLocation();
    const { blogList, viewIncrementRequest, fetchBlogList } = blogStore();

    useEffect(() => {
        (async ()=>{
            await fetchBlogList();
        })()
    },[]);

    return (
        <>
            {/* Hero banner section changes depending on the route */}
            {
                location.pathname === "/blogs" ? (
                    <Banner name={"Blogs"}/>
                ) : (
                    <div className="text-center mt-10">
                        <h1 className="text-4xl text-[#164193] font-bold">Recent Blogs</h1>
                    </div>
                )
            }

            {/* Blog cards grid layout */}
            <div className="container">
                <div className="grid grid-cols-12 gap-6 py-14 px-4 md:px-0">
                    {
                        blogList === null ? (
                            <BlogSkeleton/>
                        ) : (
                            blogList.map((blog) => {
                                const { _id, image, title, shortDes, createdAt, views, user} = blog;

                                return (
                                    <div key={_id} className="col-span-12 md:col-span-4 text-gray-500">
                                        <div>
                                            {/* Image and title link both increment views */}
                                            <Link onClick={() => viewIncrementRequest(_id, {view: views +1})} to={`/blog-details/${_id}`}>
                                                <img src={image} className="rounded w-full h-64" alt="image" />
                                            </Link>

                                            <div className="py-4">
                                                <p className="text-sm text-gray-500">{TimestampToDate(createdAt)}</p>
                                                <div className="space-y-3 py-2">
                                                    <div>
                                                        <Link onClick={() => viewIncrementRequest(_id, {view: views +1})} to={`/blog-details/${_id}`}>
                                                            <h1 className="block font-bold text-xl text-[#1CA288] hover:text-[#164193]">{title}</h1>
                                                        </Link>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm text-gray-500">{shortDes}</p>
                                                    </div>
                                                    <div className="flex justify-between items-center text-sm text-gray-400">
                                                        {/* Display updated view count from local state */}
                                                        <p>Views: {views || 0}</p>
                                                        <p>Created by: {user.role}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        )
                    }
                </div>
            </div>
        </>
    );
};

export default BlogList;
