import React from 'react';
import {Link} from "react-router-dom";
import {FaFacebookF, FaInstagram, FaLinkedin, FaWhatsapp, FaYoutube} from "react-icons/fa";
import {MdEmail} from "react-icons/md";

const Footer = () => {
    return (
        <div className="bg-[#C9E5E9]">
            <div className="container px-4 md:px-0 py-10 md:py-18">
                <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-12 md:col-span-4 space-y-7">
                        <h2 className="text-[#1CA288] text-xl font-bold border-b-2 inline-block pb-2">About</h2>
                        <p className="text-sm text-[#000052] leading-6">CareHop aims to break down barriers for revolutionary and transformative change and create a healthcare system that is sustainable, progressive, effective, and worthy for the people of Bangladesh.</p>
                        <div className="flex gap-4">
                            <Link to="/" className="bg-white p-3 rounded-full"><FaFacebookF className="text-[#1CA288]" /></Link>
                            <Link to="/" className="bg-white p-3 rounded-full"><FaInstagram className="text-[#1CA288]"/></Link>
                            <Link to="/" className="bg-white p-3 rounded-full"><FaYoutube className="text-[#1CA288]"/></Link>
                            <Link to="/" className="bg-white p-3 rounded-full"><FaWhatsapp className="text-[#1CA288]" /></Link>
                            <Link to="/" className="bg-white p-3 rounded-full"><FaLinkedin className="text-[#1CA288]"/></Link>
                            <Link to="/" className="bg-white p-3 rounded-full"><MdEmail className="text-[#1CA288]" /></Link>
                        </div>
                    </div>

                    <div className="col-span-12 md:col-span-2 space-y-7">
                        <h2 className="text-[#1CA288] text-xl font-bold border-b-2 inline-block pb-2">Quick Links</h2>
                        <div className="flex flex-col gap-1 text-gray-600">
                            <Link to="/about">About us</Link>
                            <Link to="/specialities">Doctors</Link>
                            <Link to="/blogs">Blogs</Link>
                            <Link to="/contact">Contact</Link>
                        </div>
                    </div>

                    <div className="col-span-12 md:col-span-4 space-y-7">
                        <h2 className="text-[#1CA288] text-xl font-bold border-b-2 inline-block pb-2">Important Links</h2>
                        <div className="flex flex-col gap-1 text-gray-600">
                            <Link to="/">Ministry of Health and Family Welfare</Link>
                        </div>
                    </div>

                    <div className="col-span-12 md:col-span-2 space-y-7">
                        <h2 className="text-[#1CA288] text-xl font-bold border-b-2 inline-block pb-2">Contact</h2>
                        <p className="text-sm text-gray-600">info@doctorfinder.com</p>
                    </div>
                </div>
            </div>
            <div className="text-center px-4">
                <hr className="text-gray-400"/>
                <p className="py-8 text-sm text-gray-500">Copyright 2025 | All Rights Reserved</p>
            </div>
        </div>
    );
};

export default Footer;