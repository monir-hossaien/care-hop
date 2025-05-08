// Import necessary modules and components
import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { userStore } from "../store/userStore.js";
import { commonStore } from "../store/commmonStore.js";
import ValidationHelper, { errorToast, successToast } from "../helpers/helper.js";
import UserButton from "./UserButton.jsx";

const Login = () => {
    // Local state to toggle password visibility
    const [show, setShow] = useState(false);

    // Access state and methods from global stores
    const { searchParams, resetSearchParams, inputOnChange, setLoading } = commonStore();
    const { loginRequest } = userStore();

    // React Router hook for navigation
    const navigate = useNavigate();

    // Prepare login data from store state
    const data = {
        email: searchParams.email,
        password: searchParams.password
    };

    // Handle login request
    const handleLoginRequest = async () => {
        try {

            // Validate input fields
            if (ValidationHelper.IsEmpty(searchParams.email)) {
                errorToast("Email is required");
            } else if (!ValidationHelper.IsEmail(searchParams.email)) {
                errorToast("Invalid email");
            } else if (ValidationHelper.IsEmpty(searchParams.password)) {
                errorToast("Password is required");
            } else {
                setLoading(true); // Show loading state

                // Call login API
                let result = await loginRequest(data);

                if (result.status === true) {
                    // Success: show toast, reset form, and redirect
                    setLoading(false);
                    successToast(result?.message);
                    resetSearchParams();
                    navigate("/");
                } else {
                    // Failed login
                    errorToast(result?.message);
                    setLoading(false);
                }
            }
        } catch (error) {
            // Handle error
            errorToast(error?.response?.data?.message);
            setLoading(false);
        }
    };

    return (
        <div className="relative h-screen flex justify-center items-center bg-[url(/images/hero_bg.jpg)] bg-center bg-cover bg-no-repeat">
            {/* Background overlay */}
            <div className="absolute inset-0 bg-[#57958C] opacity-40 z-10"></div>

            {/* Login form container */}
            <div className="relative z-20 w-full md:w-1/3 px-4">
                <div className="shadow-sm px-8 py-10 space-y-8 rounded-md bg-white">

                    {/* Email input */}
                    <div>
                        <input
                            value={searchParams?.email}
                            onChange={(e) => inputOnChange("email", e.target.value)}
                            className="text-sm text-gray-600 focus:outline-0 focus:shadow-sm focus:bg-slate-50 w-full border-b border-gray-200 px-3 py-2 rounded"
                            type="email"
                            placeholder="Email"
                        />
                    </div>

                    {/* Password input with visibility toggle */}
                    <div className="relative">
                        <input
                            value={searchParams?.password}
                            onChange={(e) => inputOnChange("password", e.target.value)}
                            className="text-sm text-gray-600 focus:outline-0 focus:shadow-sm focus:bg-slate-50 w-full border-b border-gray-200 px-3 py-2 rounded pr-10"
                            type={show ? "text" : "password"}
                            placeholder="Password"
                        />
                        <div
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-xl text-gray-400"
                            onClick={() => setShow(!show)}
                        >
                            {show ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                        </div>
                    </div>

                    {/* Login button */}
                    <div>
                        <UserButton
                            onClick={handleLoginRequest}
                            className="cursor-pointer text-white bg-[#57958C] hover:bg-[#45786F] transition-all duration-300 px-8 py-2 rounded-lg w-full"
                            text="Login"
                        />
                    </div>

                    {/* Register link */}
                    <div>
                        <p className="text-center text-sm text-gray-600">
                            Not a member? <Link to="/sign-up" className="text-sky-300 hover:underline">Register</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
