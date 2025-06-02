import React, { useEffect, useState, useRef } from 'react';
import { IoMdClose } from "react-icons/io";
import { MdAttachFile } from "react-icons/md";
import { userStore } from "../../store/userStore.js";
import { blogStore } from "../../store/blogStore.js";
import ValidationHelper, { errorToast, successToast } from "../../helpers/helper.js";
import UserButton from "../UserButton.jsx";

const blogCategories = ["Health Tips", "Diseases", "Medicine", "Nutrition", "News"];

const BlogUpdateModal = ({ blog, onClose, role }) => {
    const { formData, inputOnChange, resetFormData, readBlogRequest, fetchBlogList, fetchDoctorBlogs, updateBlogRequest } = blogStore();
    const { setLoading } = userStore();

    const fileInputRef = useRef(null);
    const [image, setImage] = useState('images/default-avatar.png');

    const { _id } = blog;

    // Load blog data when modal opens
    useEffect(() => {
        (async () => {
            resetFormData();
            await readBlogRequest(_id);
        })();
    }, [_id]);

    // Sync image state when formData.image changes
    useEffect(() => {
        if (formData?.image) {
            if (typeof formData.image === 'string') {
                setImage(formData.image);
            } else {
                const reader = new FileReader();
                reader.onload = () => setImage(reader.result);
                reader.readAsDataURL(formData.image);
            }
        }
    }, [formData.image]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
            inputOnChange('image', file);
        }
    };

    const handleUpdateBlog = async (e) => {
        e.preventDefault();

        // VALIDATION
        if (ValidationHelper.IsEmpty(formData.title.trim())) return errorToast("Title is required");
        if (ValidationHelper.IsEmpty(formData.shortDes.trim())) return errorToast("ShortDes is required");
        if (ValidationHelper.IsEmpty(formData.category.trim())) return errorToast("Category is required");
        if (ValidationHelper.IsEmpty(formData.image)) return errorToast("Image is required");
        if (ValidationHelper.IsEmpty(formData.content)) return errorToast("Content is required");

        const data = new FormData();
        data.append('title', formData.title);
        data.append('shortDes', formData.shortDes);
        data.append('category', formData.category);
        data.append('image', formData.image);
        data.append('content', formData.content);

        try {
            setLoading(true);
            const result = await updateBlogRequest(_id, data);
            if (result.status === true) {
                if (role === "admin") {
                    await fetchBlogList();
                } else {
                    await fetchDoctorBlogs();
                }
                successToast(result?.message);
                setLoading(false);
                fileInputRef.current.value = null;
                resetFormData();
                onClose(); // Optionally close modal
            } else {
                errorToast(result?.message || "Failed to post blog.");
                setLoading(false);
            }
        } catch (err) {
            setLoading(false);
            const msg = err?.response?.data?.message || err?.message || "Something went wrong!";
            errorToast(msg);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-xs backdrop-brightness-90 px-4 sm:px-6 py-10 overflow-y-auto">
            <div className="relative bg-white rounded-lg w-full max-w-md shadow-lg">

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="cursor-pointer hover:bg-gray-100 p-1 rounded-full transition-all duration-300 absolute top-3 right-3 text-gray-500 hover:text-red-500 transition text-xl"
                >
                    <IoMdClose />
                </button>

                {/* Thumbnail Preview */}
                <div className="relative w-20 h-20 mx-auto mt-5">
                    <label htmlFor="fileInput" className="cursor-pointer">
                        <img
                            src={image}
                            alt="Thumbnail"
                            className="w-20 h-20 object-cover rounded-full border border-blue-400 shadow"
                        />
                        <div className="absolute bottom-0 right-0 bg-white border rounded-full p-1 shadow">
                            <MdAttachFile className="text-gray-600" />
                        </div>
                    </label>
                    <input
                        id="fileInput"
                        name="image"
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                        className="hidden"
                    />
                </div>

                {/* Blog Form */}
                <form
                    onSubmit={handleUpdateBlog}
                    className="p-6 pt-6 space-y-5"
                    encType="multipart/form-data"
                >
                    <h2 className="text-lg font-semibold text-gray-800 mb-3">Update Blog Info</h2>
                    <input
                        name="title"
                        type="text"
                        placeholder="Title"
                        value={formData?.title}
                        onChange={(e) => inputOnChange('title', e.target.value)}
                        className="text-gray-700 text-sm w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                    />

                    <input
                        name="shortDes"
                        type="text"
                        placeholder="Short Description"
                        value={formData?.shortDes}
                        onChange={(e) => inputOnChange('shortDes', e.target.value)}
                        className="text-gray-700 text-sm w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                    />

                    <select
                        name="category"
                        value={formData?.category}
                        onChange={(e) => inputOnChange('category', e.target.value)}
                        className="text-gray-700 text-sm w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                    >
                        <option value="">{formData?.category}</option>
                        {blogCategories.map((cat, index) => (
                            <option key={index} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>

                    <textarea
                        rows={4}
                        name="content"
                        value={formData?.content}
                        onChange={(e) => inputOnChange('content', e.target.value)}
                        placeholder="Write content with line breaks..."
                        className="text-gray-700 text-sm w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                    />

                    <UserButton
                        className="cursor-pointer w-full text-sm text-white px-4 py-3 font-medium bg-[#00B092] rounded-md hover:bg-[#009e84] transition"
                        text="Save changes"
                    />
                </form>
            </div>
        </div>
    );
};

export default BlogUpdateModal;
