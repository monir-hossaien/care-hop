import React, {useEffect, useState} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {FaUser} from "react-icons/fa";
import {FaBarsStaggered} from "react-icons/fa6";
import {AiOutlineClose} from "react-icons/ai";
import {FiLogOut} from "react-icons/fi";
import {MdDashboard} from "react-icons/md";

import {userStore} from "../store/userStore.js";
import {successToast} from "../helpers/helper.js";
import cookies from "js-cookie";


const Navbar = () => {

    const navItems = [
        {path: "/", label: "Home"},
        {path: "/registration-form", label: "Doctor Form"},
        {path: "/about", label: "About Us"},
        {path: "/specialities", label: "Doctors"},
        {path: "/blogs", label: "Blogs"},
        {path: "/search", label: "Search"},
        {path: "/contact", label: "Contact"},
    ];

    const location = useLocation();
    const navigate = useNavigate();

    const [menuOpen, setMenuOpen] = useState(false);
    const [avatarOpen, setAvatarOpen] = useState(false);

    const {
        isLogin,
        logoutRequest,
        profileDetails,
        fetchProfileDetails,
        fetchDoctorProfile,
        role,
        getRole
    } = userStore();

    useEffect(() => {
        (async () => {
            if (isLogin()) {
                await getRole();
            }
        })();
    }, []);

    useEffect(() => {
        (async ()=>{
            if (isLogin() && role === "doctor") {
                await fetchDoctorProfile();
            }else{
               isLogin() && await fetchProfileDetails()
            }
        })()
    }, [role]);



    const dashboardNavigateHandler = () => {
        let url = "";
        if (role === "admin") url = "/admin/dashboard";
        else if (role === "doctor") url = "/doctor/dashboard";
        else if (role === "user") url = "/user/dashboard";

        if (url) window.open(url, "_blank");
    };

    let logoutHandler = () => {
        cookies.remove("token");
        successToast("Logout successful");
        navigate("/");
        window.location.reload();
    };

    let profile = role === "doctor" ? profileDetails : profileDetails?.profile || {};
    let email = role === "doctor" ? profile?.user?.email : profileDetails?.email;


    // console.log(profile);

    return (
        <div className="shadow-sm sticky top-0 bg-white z-[100]">
            <nav className="container">
                <div className="flex justify-between items-center px-4 md:px-0 py-3">
                    {/* Logo */}
                    <div className="flex-1 md:flex-none flex md:justify-start">
                        <Link to="/">
                            <img className="w-15 h-11" src="/images/logo.png" alt="Logo"/>
                        </Link>
                    </div>

                    {/* Mobile Toggle */}
                    <div className="md:hidden">
                        <button onClick={() => setMenuOpen(!menuOpen)}>
                            <FaBarsStaggered className="text-2xl"/>
                        </button>
                    </div>

                    {/* Desktop Menu */}
                    <ul className="hidden md:flex items-center gap-6">
                        {navItems
                            .filter((item) => {
                                // Show "Doctor Form" only if role is "user"
                                if (item.path === "/registration-form") {
                                    return role === "user";
                                }
                                return true; // Show all other items normally
                            })
                            .map((item) => (
                                <Link
                                    key={item.path}
                                    className={`text-sm md:text-[16px] hover:text-[#164193] ${
                                        location.pathname === item.path
                                            ? "text-[#164193] font-semibold"
                                            : "text-gray-700"
                                    }`}
                                    to={item.path}
                                >
                                    {item.label}
                                </Link>
                            ))}


                        {/* Avatar or Login (Desktop) */}
                        <div className="relative">
                            {isLogin() ? (
                                <>
                                    <button
                                        onClick={() => setAvatarOpen(!avatarOpen)}
                                        className="flex justify-center items-center w-8 h-8 rounded-full border border-[#529188] p-1 cursor-pointer hover:shadow focus:outline-none"
                                    >
                                        <img
                                            src={profile?.image || "/images/default-avatar.png"}
                                            alt="User Avatar"
                                            className="w-6 h-6 object-cover rounded-full"
                                        />
                                    </button>

                                    {avatarOpen && (
                                        <div
                                            className="py-4 absolute right-0 mt-2 w-52 bg-white border border-gray-200 rounded shadow-md z-50">
                                            <p className="text-xs font-medium py-1 px-3 text-gray-500">
                                                {profile?.name || "Guest"}
                                            </p>
                                            <p className="text-xs py-1 px-3 text-gray-500">
                                                {email || "example@gmail.com"}
                                            </p>
                                            <hr className="border-gray-300 mt-1"/>
                                            <button
                                                onClick={dashboardNavigateHandler}
                                                className="cursor-pointer flex items-center gap-1 w-full text-left px-3 py-2 text-sm text-gray-700 hover:text-gray-800 hover:bg-gray-100"
                                            >
                                                <MdDashboard/>
                                                Dashboard
                                            </button>
                                            <button
                                                onClick={logoutHandler}
                                                className="cursor-pointer flex items-center gap-1 w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-gray-100"
                                            >
                                                <FiLogOut/>
                                                Logout
                                            </button>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <div className="flex items-center gap-1 text-sm md:text-base text-[#529188]">
                                    <FaUser/>
                                    <Link to="/login" className="hover:underline">
                                        Login
                                    </Link>
                                </div>
                            )}
                        </div>
                    </ul>
                </div>

                {/* Mobile Menu Drawer */}
                <div
                    className={`fixed inset-y-0 left-0 z-50 w-64 bg-white transform transition-transform duration-300 ease-in-out md:hidden shadow-lg ${
                        menuOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
                >
                    <div className="flex justify-between items-center p-4">
                        <img src="/images/logo.png" alt="Logo" className="w-15 h-11"/>
                        <AiOutlineClose
                            className="text-2xl cursor-pointer"
                            onClick={() => setMenuOpen(false)}
                        />
                    </div>

                    <ul className="flex flex-col space-y-1">
                        {navItems
                            .filter((item) => {
                                if (item.path === "/registration-form") {
                                    return role === "user";
                                }
                                return true;
                            })
                            .map((item) => (
                                <li key={item.path}>
                                    <Link
                                        className={`block px-4 py-2 rounded hover:bg-gray-100 ${
                                            location.pathname === item.path
                                                ? "text-[#164193] font-semibold"
                                                : "text-gray-700"
                                        }`}
                                        to={item.path}
                                        onClick={() => setMenuOpen(false)}
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}


                        {isLogin() ? (
                            <>
                                <button
                                    onClick={() => {
                                        setMenuOpen(false);
                                        dashboardNavigateHandler();
                                    }}
                                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                                >
                                    Dashboard
                                </button>
                                <button
                                    onClick={() => {
                                        setMenuOpen(false);
                                        logoutHandler();
                                    }}
                                    className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <Link
                                to="/login"
                                className="flex items-center gap-2 px-4 py-2 text-[#529188] hover:bg-gray-100"
                                onClick={() => setMenuOpen(false)}
                            >
                                <FaUser/>
                                Login
                            </Link>
                        )}
                    </ul>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
