import React, { useEffect, useState } from 'react';
import { blogStore } from "../../store/blogStore.js";
import { userStore } from "../../store/userStore.js";
import {
    DeleteAlert,
    errorToast,
    successToast,
    TimestampToDate
} from "../../helpers/helper.js";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { FaPlus } from "react-icons/fa";

import PostBlogModal from "../modal/PostBlogModal.jsx";
import BlogUpdateModal from "../modal/BlogUpdateModal.jsx";
import TableSkeleton from "../../skeleton/tableSkeleton.jsx";
import NotFound from "../NotFound.jsx";

const AllBlog = () => {
    const { blogList, deleteBlogRequest, fetchBlogList, fetchDoctorBlogs } = blogStore();
    const { role, getRole } = userStore();

    const [addBlogModal, setAddBlogModal] = useState(false);
    const [updateBlogModal, setUpdateBlogModal] = useState(false);
    const [selectedBlog, setSelectedBlog] = useState(null);

    // Fetch user role on mount
    useEffect(() => {
        (async () => {
            if (!role) {
                await getRole();
            }
        })();
    }, []);

    // Fetch blog list based on role
    useEffect(() => {
        if (!role) return;

        (async () => {
            if (role === "admin") {
                await fetchBlogList();
            } else {
                await fetchDoctorBlogs();
            }
        })();
    }, [role]);

    const handleUpdateModalOpen = (blog) => {
        setSelectedBlog(blog);
        setUpdateBlogModal(true);
    };

    const handleBlogDelete = async (_id) => {
        try {
            const isConfirmed = await DeleteAlert();
            if (isConfirmed) {
                const result = await deleteBlogRequest(_id);
                if (result.status === true) {
                    successToast(result.message);
                    if (role === "admin") {
                        await fetchBlogList();
                    } else {
                        await fetchDoctorBlogs();
                    }
                } else {
                    errorToast(result.message);
                }
            }
        } catch (err) {
            const msg =
                err?.response?.data?.error ||
                err?.message ||
                "Something went wrong!";
            errorToast(msg);
        }
    };

    return (
        <>
            <div className="flex justify-end">
                <button
                    onClick={() => setAddBlogModal(true)}
                    className="hover:text-white hover:bg-blue-500 transition-all duration-300 flex items-center gap-1 cursor-pointer px-5 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium">
                    <FaPlus /> Post Blog
                </button>
            </div>

            {/* Conditional blog list rendering */}
            {blogList === null ? (
                <TableSkeleton />
            ) : blogList.length === 0 ? (
                <NotFound message="No blogs available at the moment." />
            ) : (
                <div className="py-5">
                    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="min-w-full text-sm text-left text-gray-700">
                                <thead className="bg-gray-100 text-xs text-gray-600 uppercase tracking-wider">
                                <tr>
                                    <th className="px-6 py-4">Image</th>
                                    <th className="px-6 py-4">Title</th>
                                    <th className="px-6 py-4">Category</th>
                                    <th className="px-6 py-4">Published</th>
                                    <th className="px-6 py-4">Views</th>
                                    {
                                        role === "admin" &&
                                        <th className="px-6 py-4">Author</th>
                                    }
                                    <th className="px-6 py-4">Action</th>
                                </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                {blogList.map((blog, index) => {
                                    const { _id, image, title, category, createdAt, views, user } = blog;
                                    return (
                                        <tr key={index} className="hover:bg-gray-50 transition-all">
                                            <td className="px-6 py-4">
                                                <img
                                                    src={image}
                                                    alt="Blog thumbnail"
                                                    className="w-16 h-12 rounded-md object-cover border shadow"
                                                />
                                            </td>
                                            <td className="px-6 py-4 font-medium text-gray-800">{title}</td>
                                            <td className="px-6 py-4">
                                                    <span className="inline-block px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                                                        {category}
                                                    </span>
                                            </td>
                                            <td className="px-6 py-4 text-gray-500">
                                                {TimestampToDate(createdAt)}
                                            </td>
                                            <td className="px-6 py-4 font-semibold text-gray-700">{views}</td>
                                            {
                                                role === "admin" &&
                                                <td className="px-6 py-4">
                                                    <span
                                                        className="inline-block px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs capitalize">
                                                        {user?.role || 'N/A'}
                                                    </span>
                                                </td>
                                            }
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <button
                                                        onClick={() => handleUpdateModalOpen(blog)}
                                                        className="cursor-pointer text-blue-600 hover:text-blue-800 transition"
                                                        title="Edit"
                                                    >
                                                        <CiEdit size={20} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleBlogDelete(_id)}
                                                        className="cursor-pointer text-red-600 hover:text-red-800 transition"
                                                        title="Delete"
                                                    >
                                                        <MdDelete size={20} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}


            {addBlogModal && (
                <PostBlogModal onClose={() => setAddBlogModal(false)} role={role} />
            )}

            {updateBlogModal && (
                <BlogUpdateModal
                    role={role}
                    blog={selectedBlog}
                    onClose={() => setUpdateBlogModal(false)}
                />
            )}
        </>
    );
};

export default AllBlog;
