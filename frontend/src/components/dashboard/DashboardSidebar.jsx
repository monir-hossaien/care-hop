import React from "react";
import {NavLink, useNavigate} from "react-router-dom";
import {FiLogOut} from "react-icons/fi";
import {successToast} from "../../helpers/helper.js";
import {userStore} from "../../store/userStore.js";

const DashboardSidebar = ({ navItems }) => {

    const navigate = useNavigate();
    const {logoutRequest} = userStore();

    const logoutHandler = async () => {
        const res = await logoutRequest();
        successToast(res?.message || "Logout successful");
        navigate("/");
        window.location.reload();
    };

    return (
        <div className="py-3 space-y-2">
            {
                navItems.map((item, index)=>{
                    const {label, icon, path} = item
                    return (
                        <NavLink
                            key={index}
                            to={path}
                            end // this ensures exact path matching
                            className={({ isActive }) =>
                                `text-gray-700 block px-3 py-2 rounded hover:bg-gray-200 font-medium text-sm md:text-[15px] ${
                                    isActive ? "bg-gray-200 text-gray-800" : ""
                                }`
                            }
                        >
                            <div className="flex gap-1 items-center">
                                <span>{icon}</span>
                                <span>{label}</span>
                            </div>
                        </NavLink>

                    )
                })
            }
            <div>
                <button onClick={logoutHandler} className="text-red-600 flex items-center gap-1 px-3 cursor-pointer w-full text-start py-2 rounded hover:bg-gray-200 font-medium"><FiLogOut/>Logout</button>
            </div>
        </div>
    );
};

export default DashboardSidebar;
