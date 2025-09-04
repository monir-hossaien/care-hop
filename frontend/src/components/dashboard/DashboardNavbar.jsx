import {Link, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {userStore} from "../../store/userStore.js";
import {errorToast, successToast} from "../../helpers/helper.js";
import {FiLogOut} from "react-icons/fi";
import {useAuthContext} from "../../context/AuthProvider.jsx";

const DashboardNavbar = ({ toggleSidebar }) => {
    const [avatarOpen, setAvatarOpen] = useState(false);
    const {loading, logoutRequest, profileDetails,fetchProfileDetails, fetchDoctorProfile,} = userStore();
    const navigate = useNavigate();
    const {role, isLogin} =useAuthContext()


    useEffect(() => {
        if (!isLogin || role === null) return;

        const fetchProfile = async () => {
            if (role === "doctor") {
                await fetchDoctorProfile();
            } else {
                await fetchProfileDetails();
            }
        };

        fetchProfile();
    }, [role, isLogin]);

    let logoutHandler = async () => {
        try {
            const res = await logoutRequest();
            if (res.status === true) {
                successToast(res?.message);
                navigate("/");
                window.location.reload();
            }
        }catch (error){
            errorToast(error?.response?.data?.message || "Something went wrong");
        }
    };

    let profile = role === "doctor" ? profileDetails : profileDetails?.profile || {};
    let email = role === "doctor" ? profile?.user?.email : profileDetails?.email;

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
                {
                    loading ? (
                        <button
                            onClick={() => setAvatarOpen(!avatarOpen)}
                            className="flex justify-center items-center w-8 h-8 rounded-full border border-[#529188] p-1 cursor-pointer hover:shadow focus:outline-none"
                        >
                            <img
                                src={"/images/default-avatar.png"}
                                alt="User Avatar"
                                className="w-6 h-6 object-cover rounded-full"
                            />
                        </button>
                        ):
                    isLogin && (
                    <>
                        <button
                            onClick={() => setAvatarOpen(!avatarOpen)}
                            className="flex justify-center items-center w-8 h-8 rounded-full border border-[#529188] p-1 cursor-pointer hover:shadow focus:outline-none"
                            aria-label="Toggle avatar menu"
                        >
                            {
                                profileDetails === null ? (
                                    <img
                                        src="/images/default-avatar.png"
                                        alt="User Avatar"
                                        className="w-6 h-6 object-cover rounded-full"
                                    />
                                ) : (
                                    <img
                                        src={profile?.image || "/images/default-avatar.png"}
                                        alt="User Avatar"
                                        className="w-6 h-6 object-cover rounded-full"
                                    />
                                )
                            }
                        </button>

                        {avatarOpen && (
                            <div
                                className="py-3 absolute right-0 mt-2 w-52 bg-white border border-gray-200 rounded shadow-md z-50">
                                <p className="text-xs font-medium py-1 px-3 text-gray-500">{profile?.name || "Guest"}</p>
                                <p className="text-xs py-1 px-3 text-gray-500">{email || "example@gmail.com"}</p>
                                <hr className="border-gray-300 mt-1"/>
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