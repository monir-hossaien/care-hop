import React, { useState } from "react";
import DashboardNavbar from "../components/dashboard/DashboardNavbar.jsx";
import DashboardSidebar from "../components/dashboard/DashboardSidebar.jsx";
import {MdDashboard} from "react-icons/md";
import {FaBlog, FaRegHospital, FaUserDoctor} from "react-icons/fa6";
import {FaUser} from "react-icons/fa";
import {IoSettingsSharp} from "react-icons/io5";
import {SiHomepage, SiSemaphoreci} from "react-icons/si";
import {ImProfile} from "react-icons/im";
import {GrUserExpert} from "react-icons/gr";

const DashboardLayout = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const role = localStorage.getItem("role");

    // Define role-based nav items
    const navItems = {
        admin: [
            { label: "Dashboard", icon: <MdDashboard />, path: "/admin/dashboard" },
            { label: "Home", icon: <SiHomepage />,path: "/" },
            { label: "Blogs", icon: <FaBlog />,path: "/admin/blog" },
            { label: "Manage Doctors", icon: <FaUserDoctor />, path: "/admin/doctor" },
            { label: "Manage Users", icon: <FaUser />, path: "/admin/user" },
            { label: "Manage Appointments", icon: <SiSemaphoreci />, path: "/admin/appointment" },
            { label: "Manage Hospital", icon: <FaRegHospital />, path: "/admin/hospital" },
            { label: "Manage Specialty", icon: <GrUserExpert />, path: "/admin/specialty" },
            { label: "Profile", icon: <ImProfile />, path: "/admin/profile" },
            { label: "Account Settings", icon: <IoSettingsSharp />, path: "/admin/account-settings" },
        ],
        doctor: [
            { label: "Dashboard", icon: <MdDashboard />, path: "/doctor/dashboard" },
            { label: "Home", icon: <SiHomepage />,path: "/" },
            { label: "Appointments", icon: <SiSemaphoreci />, path: "/doctor/appointments" },
            { label: "Blogs", icon: <FaBlog />, path: "/doctor/blog" },
            { label: "Profile", icon: <ImProfile />, path: "/doctor/profile" },
            { label: "Account Settings", icon: <IoSettingsSharp />, path: "/doctor/account-settings" },
        ],
        user: [
            { label: "Dashboard", icon: <MdDashboard />, path: "/user/dashboard" },
            { label: "Home", icon: <SiHomepage />,path: "/" },
            { label: "My Appointments", icon: <SiSemaphoreci />, path: "/user/appointments" },
            { label: "Profile", icon: <ImProfile />, path: "/user/profile" },
            { label: "Account Settings", icon: <IoSettingsSharp />, path: "/user/account-settings" },
        ],
    };

    return (
        <div className="h-screen overflow-y-scroll flex flex-col">
            {/* Navbar */}
            <div className="w-full shadow z-20">
                <DashboardNavbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
            </div>

            {/* Body: Sidebar + Content */}
            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar (collapsible on mobile) */}
                <aside
                    className={`
            p-4 transition-all duration-300 shadow bg-white
            fixed inset-y-0 left-0 z-10 top-17 w-60 
            transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
            md:translate-x-0 md:static md:flex-shrink-0
          `}
                >
                    <DashboardSidebar navItems={navItems[role] || []} />
                </aside>

                {/* Overlay on mobile when sidebar is open */}
                {isSidebarOpen && (
                    <div
                        className="fixed inset-0 z-0 md:hidden"
                        onClick={() => setIsSidebarOpen(false)}
                    />
                )}

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto px-8 py-6 bg-gray-50">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
