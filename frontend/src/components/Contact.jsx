// Import necessary libraries and icons
import React from 'react';
import { FaLocationDot } from "react-icons/fa6"; // Location icon
import { MdEmail } from "react-icons/md";        // Email icon

// Import global state stores
import { contactStore } from "../store/contactStore.js";
import {userStore} from "../store/userStore.js";
// Import reusable button component
import UserButton from "./UserButton.jsx";

// Import helper functions for validation and toast notifications
import ValidationHelper, { errorToast, successToast } from "../helpers/helper.js";
import Banner from "./Banner.jsx";


const Contact = () => {
    // Destructure state and methods from stores
    const { formData, inputOnChange, setLoading, resetFormData} = userStore();
    const { createContact } = contactStore();

    // Prepare contact data payload
    const data = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message,
    };

    // Handle contact form submission
    const handleCreateContact = async () => {
        // Client-side validation
        if (ValidationHelper.IsEmpty(formData.name)) {
            errorToast("Name is required");
        } else if (ValidationHelper.IsEmpty(formData.email)) {
            errorToast("Email is required");
        }
        else if(!ValidationHelper.IsEmail(formData.email)) {
            errorToast("Enter valid email");
        }
        else if (ValidationHelper.IsEmpty(formData.phone)) {
            errorToast("Phone number required");
        } else if(!ValidationHelper.IsMobile(formData.phone)) {
            errorToast("Enter valid phone number");
        }
        else if (ValidationHelper.IsEmpty(formData.subject)) {
            errorToast("Subject is required");
        } else if (ValidationHelper.IsEmpty(formData.message)) {
            errorToast("Message is required");
        } else {
            // Submit data
            try {
                setLoading(true); // Show loading state
                let result = await createContact(data);

                if (result.status === true) {
                    setLoading(false);
                    successToast(result.message); // Show success toast
                    resetFormData();

                } else {
                    setLoading(false);
                    errorToast(result.message); // Show error toast
                }
            } catch (error) {
                setLoading(false);
                errorToast(error.response?.data?.message || "Something went wrong");
            }
        }
    };

    return (
        <>
            <Banner name={"Get In Touch"}/>
            <div className="container py-10">
                {/* Grid container for layout */}
                <div className="grid grid-cols-12 gap-5 px-4 md:px-0">
                    {/* Contact Form Section */}
                    <div className="col-span-12 md:col-span-6 shadow-sm">
                        <div className="grid grid-cols-12 gap-5 px-4 sm:px-6 md:px-10 py-10">

                            {/* Name Field */}
                            <div className="col-span-12 sm:col-span-6">
                                <input
                                    value={formData.name}
                                    onChange={(e) => inputOnChange("name", e.target.value)}
                                    type="text"
                                    className="text-sm text-gray-600 focus:outline-0 focus:shadow-sm focus:bg-slate-50 w-full border border-gray-200 px-3 py-2 rounded"
                                    placeholder="Name"
                                />
                            </div>

                            {/* Email Field */}
                            <div className="col-span-12 sm:col-span-6">
                                <input
                                    value={formData.email}
                                    onChange={(e) => inputOnChange("email", e.target.value)}
                                    type="email"
                                    className="text-sm text-gray-600 focus:outline-0 focus:shadow-sm focus:bg-slate-50 w-full border border-gray-200 px-3 py-2 rounded"
                                    placeholder="Email"
                                />
                            </div>

                            {/* Phone Field */}
                            <div className="col-span-12 sm:col-span-6">
                                <input
                                    value={formData.phone}
                                    onChange={(e) => inputOnChange("phone", e.target.value)}
                                    type="text"
                                    className="text-sm text-gray-600 focus:outline-0 focus:shadow-sm focus:bg-slate-50 w-full border border-gray-200 px-3 py-2 rounded"
                                    placeholder="Phone"
                                />
                            </div>

                            {/* Subject Field */}
                            <div className="col-span-12 sm:col-span-6">
                                <input
                                    value={formData.subject}
                                    onChange={(e) => inputOnChange("subject", e.target.value)}
                                    type="text"
                                    className="text-sm text-gray-600 focus:outline-0 focus:shadow-sm focus:bg-slate-50 w-full border border-gray-200 px-3 py-2 rounded"
                                    placeholder="Subject"
                                />
                            </div>

                            {/* Message Field */}
                            <div className="col-span-12">
                            <textarea
                                value={formData.message}
                                onChange={(e) => inputOnChange("message", e.target.value)}
                                rows={4}
                                className="text-sm text-gray-600 focus:outline-0 focus:shadow-sm focus:bg-slate-50 w-full border border-gray-200 px-3 py-2 rounded"
                                placeholder="Message"
                            />
                            </div>

                            {/* Submit Button */}
                            <div className="col-span-12">
                                <UserButton
                                    onClick={handleCreateContact}
                                    className="text-sm text-white px-8 py-3 font-medium bg-[#00B092] rounded cursor-pointer hover:bg-[#009e84] transition"
                                    text="Send Message"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Contact Info Section */}
                    <div className="col-span-12 md:col-span-6">
                        <div className="shadow-sm px-4 py-10 space-y-10">

                            {/* Address Information */}
                            <div className="flex items-start gap-3">
                            <span className="bg-slate-100 p-2 rounded-full text-[#00B092]">
                                <FaLocationDot className="text-2xl"/>
                            </span>
                                <div>
                                    <h2 className="text-xl font-bold text-[#00B092]">Address</h2>
                                    <p className="text-gray-500">House: #102, Road: #3, Uttara, Dhaka-1206</p>
                                </div>
                            </div>

                            {/* Email Information */}
                            <div className="flex items-start gap-3">
                            <span className="bg-slate-100 p-2 rounded-full text-[#00B092]">
                                <MdEmail className="text-2xl"/>
                            </span>
                                <div>
                                    <h2 className="text-xl font-bold text-[#00B092]">Email</h2>
                                    <p className="text-gray-500">info@doctorfinder.com</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
};

export default Contact;
