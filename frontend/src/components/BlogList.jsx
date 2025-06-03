import React, { useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";
import { blogStore } from "../store/blogStore.js";
import { TimestampToDate } from "../helpers/helper.js";
import BlogSkeleton from "../skeleton/blogSkeleton.jsx";
import Banner from "./Banner.jsx";
import NotFound from "./NotFound.jsx";
import { motion } from 'framer-motion';

const BlogList = () => {
    const location = useLocation();
    const { blogList, viewIncrementRequest, fetchBlogList } = blogStore();

    useEffect(() => {
        (async ()=>{
            if (!blogList) {
                await fetchBlogList();
            }
        })()
    }, []);

    const handleViewIncrement = async (_id, currentViews) => {
        await viewIncrementRequest(_id, { view: currentViews + 1 });
    };

    return (
        <>
            {location.pathname === "/blogs" ? (
                <Banner name={"Blogs"} />
            ) : (
                <div className="text-center mt-10">
                    <motion.h1
                        initial={{ opacity: 0, y: 100 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="text-4xl text-[#164193] font-bold"
                    >
                        Recent Blogs
                    </motion.h1>
                </div>
            )}

            <div className="container">
                <div className="grid grid-cols-12 gap-6 py-14 px-4 md:px-0">
                    {
                        blogList === null ? (
                            <BlogSkeleton />
                        ) : blogList.length === 0 ? (
                            <div className="col-span-12">
                                <NotFound message="No Blogs found." />
                            </div>
                        ) : (
                            blogList.map(({ _id, image, title, shortDes, createdAt, views, user }) => (
                                <div key={_id} className="col-span-12 md:col-span-4 text-gray-500">
                                    <motion.div
                                        initial={{ opacity: 0, y: 100, scale: 0.95 }}
                                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                        transition={{ duration: 0.6, ease: "easeOut" }}
                                    >
                                        <Link onClick={() => handleViewIncrement(_id, views)} to={`/blog-details/${_id}`}>
                                            <img
                                                src={image}
                                                alt={`Blog: ${title}`}
                                                className="rounded w-full h-64 object-cover"
                                            />
                                        </Link>

                                        <div className="py-4">
                                            <p className="text-sm text-gray-500">{TimestampToDate(createdAt)}</p>
                                            <div className="space-y-3 py-2">
                                                <div>
                                                    <Link onClick={() => handleViewIncrement(_id, views)} to={`/blog-details/${_id}`}>
                                                        <h2 className="font-bold text-xl text-[#1CA288] hover:text-[#164193]">
                                                            {title}
                                                        </h2>
                                                    </Link>
                                                </div>
                                                <p className="text-sm text-gray-500 line-clamp-3">{shortDes}</p>
                                                <div className="flex justify-between items-center text-sm text-gray-400">
                                                    <p>Views: {views || 0}</p>
                                                    <p>Created by: {user?.role || 'N/A'}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                </div>
                            ))
                        )
                    }
                </div>
            </div>
        </>
    );
};

export default BlogList;
