import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { FaBarsStaggered } from "react-icons/fa6";
import { AiOutlineClose } from "react-icons/ai";

const Navbar = () => {
    const location = useLocation(); // Get current route
    const [open, setOpen] = useState(false);

    return (
        <div className="shadow-sm sticky top-0 bg-white z-50">
            <nav className="container">
                <div className="flex justify-between items-center px-4 md:px-0 py-3">
                    {/* Logo */}
                    <div className="">
                        <Link to="/">
                            <img className="w-22 h-15" src={"/images/logo.png"} alt="Logo" />
                        </Link>
                    </div>

                    {/* Toggle Icon */}
                    <div className="flex items-center">
                        <button className="md:hidden" onClick={() => setOpen(!open)}>
                            {open ? (
                                <AiOutlineClose className="cursor-pointer text-2xl transition-all duration-150" />
                            ) : (
                                <FaBarsStaggered className="cursor-pointer text-2xl transition-all duration-150" />
                            )}
                        </button>
                    </div>

                    {/*/!* Mobile Menu Overlay *!/*/}
                    {/*{open && (*/}
                    {/*    <div*/}
                    {/*        className="fixed inset-0 bg-gray-100 bg-opacity-50 z-10 md:hidden"*/}
                    {/*        onClick={() => setOpen(false)}*/}
                    {/*    ></div>*/}
                    {/*)}*/}

                    {/* Menu Items */}
                    <div
                        className={`fixed md:relative top-0 left-0 h-screen md:h-auto w-[80%] md:w-auto bg-white md:bg-transparent shadow-lg md:shadow-none z-50 transform transition-transform duration-300 md:translate-x-0 ${
                            open ? "translate-x-0" : "-translate-x-full"
                        }`}
                    >
                        <ul className="flex flex-col md:flex-row gap-2 md:gap-6 md:p-0 py-12">
                            {[
                                { path: "/", label: "Home" },
                                { path: "/about", label: "About Us" },
                                { path: "/specialities", label: "Doctors" },
                                { path: "/blogs", label: "Blogs" },
                                { path: "/search", label: "Search" },
                                { path: "/contact", label: "Contact" },
                            ].map((item) => (
                                <li key={item.path}>
                                    <Link
                                        className={`text-sm block md:inline-block py-2 px-4 md:px-0 md:py-0 border-b-1 border-b-gray-200 md:border-0 md:text-[16px] ${
                                            location.pathname === item.path
                                                ? "text-[#164193] font-bold"
                                                : "text-gray-700"
                                        }`}
                                        to={item.path}
                                        onClick={() => setOpen(false)} // Close menu on click
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                            {/* Login Button */}
                            <div className="text-sm flex items-center gap-1 px-4 py-5 md:px-0 md:py-0 md:text-[16px]">
                                <FaUser />
                                <Link to="/login">Login</Link>
                            </div>
                        </ul>

                    </div>

                </div>
            </nav>
        </div>
    );
};

export default Navbar;
