import React from 'react';
import {FaLocationDot} from "react-icons/fa6";
import {MdEmail} from "react-icons/md";

const Contact = () => {
    return (
        <div className="container py-20">
            <div className="grid grid-cols-12 gap-12">
                <div className="col-span-12">
                    <h1 className="text-3xl font-bold text-[#00B092] px-4 md:px-1">Get In Touch</h1>
                </div>
                <div className="col-span-12 md:col-span-6 shadow-sm">
                <div className="grid grid-cols-12 gap-5 px-10 py-14 space-y-4">
                        <div className="col-span-6">
                            <input
                                className="text-sm text-gray-600 focus:outline-0 focus:shadow-sm focus:bg-slate-50 w-full border-b-1 border-b-gray-200 px-3 py-2 rounded"
                                placeholder="Name"/>
                        </div>
                        <div className="col-span-6">
                            <input
                                className="text-sm text-gray-600 focus:outline-0 focus:shadow-sm focus:bg-slate-50 w-full border-b-1 border-b-gray-200 px-3 py-2 rounded"
                                placeholder="Email"/>
                        </div>
                        <div className="col-span-6">
                            <input
                                className="text-sm text-gray-600 focus:outline-0 focus:shadow-sm focus:bg-slate-50 w-full border-b-1 border-b-gray-200 px-3 py-2 rounded"
                                placeholder="Phone"/>
                        </div>
                        <div className="col-span-6">
                            <input
                                className="text-sm text-gray-600 focus:outline-0 focus:shadow-sm focus:bg-slate-50 w-full border-b-1 border-b-gray-200 px-3 py-2 rounded"
                                placeholder="Subject"/>
                        </div>
                        <div className="col-span-12">
                            <textarea rows={4}
                                      className="text-sm text-gray-600 focus:outline-0 focus:shadow-sm w-full focus:bg-slate-50 border-b-1 border-b-gray-200 px-3 py-2 rounded"
                                      placeholder="Message"/>
                        </div>
                        <div>
                            <button className="text-white px-10 py-2 bg-[#00B092] rounded cursor-pointer">Send</button>
                        </div>
                    </div>
                </div>

                <div className="col-span-12 md:col-span-6">
                    <div className="shadow-sm px-4 py-10 space-y-10">
                        <div className="flex items-center gap-3">
                            <span className="bg-slate-100 p-2 rounded-full text-[#00B092]"><FaLocationDot
                                className="text-2xl"/></span>
                            <div>
                                <h2 className="text-xl font-bold text-[#00B092]">Address</h2>
                                <p className="text-gray-500">House: #102, Road: #3, Uttara, Dhaka-1206</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="bg-slate-100 p-2 rounded-full text-[#00B092]"><MdEmail
                                className="text-2xl"/></span>
                            <div>
                                <h2 className="text-xl font-bold text-[#00B092]">Email</h2>
                                <p className="text-gray-500">info@doctorfinder.com</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;