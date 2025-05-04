import React, { useEffect, useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import { blogStore } from "../store/blogStore.js";
import { TimestampToDate } from "../helper.js";

const BlogList = () => {
    const location = useLocation();
    const { blogList, updateBlogRequest } = blogStore();

    // State to track view counts for each blog (by blog ID)
    const [viewCounts, setViewCounts] = useState({});

    // Initialize viewCounts from blogList on component mount or update
    useEffect(() => {
        if (blogList) {
            const initialCounts = {};
            blogList.forEach(blog => {
                initialCounts[blog._id] = blog.views || 0;
            });
            setViewCounts(initialCounts);
        }
    }, [blogList]);

    // Increment local view count and update the server via store method
    const handleViewIncrement = async (_id) => {
        const newViews = (viewCounts[_id] || 0) + 1;

        // Update local state
        setViewCounts(prev => ({
            ...prev,
            [_id]: newViews
        }));

        // Send updated view count to backend
        await updateBlogRequest(_id, { views: newViews });
    };

    return (
        <>
            {/* Hero banner section changes depending on the route */}
            {
                location.pathname === "/blogs" ? (
                    <div className="text-center py-32 bg-[url(/images/hero_bg.jpg)] bg-center bg-cover bg-no-repeat">
                        <h1 className="text-4xl text-[#357B7A] font-medium opacity-100">Blogs</h1>
                    </div>
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
                            <p>Loading</p>
                        ) : (
                            blogList.map((blog) => {
                                const { _id, image, title, shortDes, createdAt, views, user, category } = blog;

                                return (
                                    <div key={_id} className="col-span-12 md:col-span-4 text-gray-500">
                                        <div>
                                            {/* Image and title link both increment views */}
                                            <Link onClick={() => handleViewIncrement(_id)} to={`/blog-details/${category}/${_id}`}>
                                                <img src={image} className="rounded w-full h-64" alt="image" />
                                            </Link>

                                            <div className="py-4">
                                                <p className="text-sm text-gray-500">{TimestampToDate(createdAt)}</p>
                                                <div className="space-y-3 py-2">
                                                    <div>
                                                        <Link onClick={() => handleViewIncrement(_id)} to={`/blog-details/${_id}`}>
                                                            <h1 className="block font-bold text-xl text-[#1CA288] hover:text-[#164193]">{title}</h1>
                                                        </Link>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm text-gray-500">{shortDes}</p>
                                                    </div>
                                                    <div className="flex justify-between items-center text-sm text-gray-400">
                                                        {/* Display updated view count from local state */}
                                                        <p>Views: {viewCounts[_id] || views}</p>
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
