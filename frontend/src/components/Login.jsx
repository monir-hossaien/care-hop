// Import necessary modules and components
import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { userStore } from "../store/userStore.js";
import ValidationHelper, { errorToast, successToast } from "../helpers/helper.js";
import UserButton from "./UserButton.jsx";
import {FaEnvelope, FaLock} from "react-icons/fa";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import Cookies from "js-cookie";
import api from "../axios/api.js";
import GoogleLoginSkeleton from "../skeleton/googleLoginSkeleton.jsx";



const Login = () => {
    const [show, setShow] = useState(false);
    const [onloading, setOnLoading] = useState(false);
    const { formData, inputOnChange, setLoading, resetFormData, loginRequest, googleLoginRequest} = userStore();
    const navigate = useNavigate();

    // Prepare login data from store state
    const data = {
        email: formData.email,
        password: formData.password
    };

    // Handle login request
    const handleLoginRequest = async () => {
        try {

            // Validate input fields
            if (ValidationHelper.IsEmpty(formData.email)) {
                errorToast("Email is required");
            } else if (!ValidationHelper.IsEmail(formData.email)) {
                errorToast("Invalid email");
            } else if (ValidationHelper.IsEmpty(formData.password)) {
                errorToast("Password is required");
            } else {
                setLoading(true); // Show loading state

                // Call login API
                let result = await loginRequest(data);

                if (result.status === true) {
                    // Success: show toast, reset form, and redirect
                    setLoading(false);
                    successToast(result?.message);
                    resetFormData();
                    window.location.replace("/")
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

    // google login function
    const handleGoogleLogin = async (credentialResponse) => {
        try {
            setOnLoading(true);
            const res = await googleLoginRequest(credentialResponse)
            if(res.status === true) {
                setOnLoading(false);
                navigate("/");
            }

        } catch (err) {
            setOnLoading(false);
            console.error(err.response?.data || err);
        }
    };

    return (
        <div className="relative h-screen flex justify-center items-center bg-[url(/images/hero_bg.jpg)] bg-center bg-cover bg-no-repeat">
            {/* Background overlay */}
            <div className="absolute inset-0 bg-[#57958C] opacity-40 z-10"></div>

            {/* Login form container */}
            <div className="relative z-20 w-full md:w-1/3 px-4">
                <div className="shadow-sm px-8 py-10 space-y-8 rounded-md bg-white">
                    {/* Heading */}
                    <h2 className="text-2xl font-semibold text-center text-[#164193]">
                        Welcome to CareHop
                    </h2>
                    <div className="relative">
                        <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"/>
                        <input
                            value={formData?.email}
                            onChange={(e) => inputOnChange("email", e.target.value)}
                            className="pl-10 text-sm text-gray-600 focus:outline-0 focus:shadow-sm focus:bg-slate-50 w-full border-b border-gray-200 px-3 py-2 rounded"
                            type="email"
                            placeholder="Email"
                        />
                    </div>

                    {/* Password Input with Icon and Toggle */}
                    <div className="relative">
                        <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"/>
                        <input
                            value={formData?.password}
                            onChange={(e) => inputOnChange("password", e.target.value)}
                            className="pl-10 pr-10 text-sm text-gray-600 focus:outline-0 focus:shadow-sm focus:bg-slate-50 w-full border-b border-gray-200 px-3 py-2 rounded"
                            type={show ? "text" : "password"}
                            placeholder="Password"
                        />
                        <div
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-xl text-gray-400"
                            onClick={() => setShow(!show)}
                        >
                            {show ? <AiOutlineEyeInvisible/> : <AiOutlineEye/>}
                        </div>
                    </div>

                    {/* Login button */}
                    <div>
                        <UserButton
                            onClick={handleLoginRequest}
                            className="w-full text-sm text-white px-8 py-3 font-medium bg-[#00B092] rounded cursor-pointer hover:bg-[#009e84] transition"
                            text="Login"
                        />
                    </div>

                    {/*google login*/}

                    <p className="text-sm text-center text-gray-600">Or, Login with</p>

                    <div className="w-full">
                        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
                            {
                                onloading ? (
                                    <GoogleLoginSkeleton/>
                                ):(
                                    <GoogleLogin
                                        onSuccess={handleGoogleLogin}
                                        onError={() => console.log("Login Failed")}
                                    />
                                )
                            }
                        </GoogleOAuthProvider>
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
