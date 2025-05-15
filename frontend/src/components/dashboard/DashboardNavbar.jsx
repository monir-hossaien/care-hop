import {Link, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import Skeleton from "react-loading-skeleton";
import {FaUser} from "react-icons/fa";
import {userStore} from "../../store/userStore.js";
import {getRole, successToast} from "../../helpers/helper.js";
import {FiLogOut} from "react-icons/fi";

const DashboardNavbar = ({ toggleSidebar }) => {
    const [avatarOpen, setAvatarOpen] = useState(false);
    const { isLogin, logoutRequest, profile, fetchDoctorProfile } = userStore();
    const role = getRole()
    const navigate = useNavigate();

    useEffect(()=>{
        (async ()=>{
            if(role === "doctor"){
                await fetchDoctorProfile()
            }
        })()
    },[])

    const logoutHandler = () => {
        let res = logoutRequest();
        successToast(res?.message);
        localStorage.removeItem("role");
        navigate("/");
        window.location.reload();
    };

    return (
        <nav className="flex items-center justify-between px-4 py-3 bg-white">
            {/* Hamburger on small screens */}
            {/* Logo */}
            <div className="flex-1 md:flex-none flex md:justify-start">
                <Link to="/">
                    <img className="w-15 h-11" src="/images/logo.png" alt="Logo" />
                </Link>
            </div>

            <button
                onClick={toggleSidebar}
                className="cursor-pointer md:hidden text-gray-600 focus:outline-none"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2}
                     viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round"
                          d="M4 6h16M4 12h16M4 18h16"/>
                </svg>
            </button>
            .
            {/* Avatar or Login (Desktop) */}
            <div className="relative hidden md:block">
                {isLogin() && (
                    <>
                        <button
                            onClick={() => setAvatarOpen(!avatarOpen)}
                            className="flex justify-center items-center w-8 h-8 rounded-full border border-[#529188] p-1 cursor-pointer hover:shadow focus:outline-none"
                            aria-label="Toggle avatar menu"
                        >
                            {
                                profile === null ? (
                                    <img
                                        src="/images/default-avatar.png"
                                        alt="User Avatar"
                                        className="w-6 h-6 object-cover rounded-full"
                                    />
                                ) : (
                                    <img
                                        src={profile?.image}
                                        alt="User Avatar"
                                        className="w-6 h-6 object-cover rounded-full"
                                    />
                                )
                            }
                        </button>

                        {avatarOpen && (
                            <div
                                className="py-3 absolute right-0 mt-2 w-52 bg-white border border-gray-200 rounded shadow-md z-50">
                                <p className="text-[12px] py-1 px-3 text-gray-500">{profile?.name || "Guest"}</p>
                                <hr className="border-gray-300" />
                                <button
                                    onClick={logoutHandler}
                                    className="font-medium flex items-center gap-1 cursor-pointer w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-gray-200"
                                ><FiLogOut/>
                                    Logout
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>

        </nav>
    );
};
export default DashboardNavbar