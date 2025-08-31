// Import necessary libraries and components
import React, {useState} from 'react';
import { Link, useNavigate } from "react-router-dom";
import { userStore } from "../store/userStore.js";
import UserButton from "./UserButton.jsx";
import ValidationHelper, { errorToast, successToast } from "../helpers/helper.js";
import {FaEnvelope, FaLock, FaUser} from "react-icons/fa";
import GoogleLoginSkeleton from "../skeleton/googleLoginSkeleton.jsx";
import {GoogleLogin, GoogleOAuthProvider} from "@react-oauth/google";
import Cookies from "js-cookie";
import api from "../axios/api.js";

const SignUp = () => {
    const [onloading, setOnLoading] = useState(false);
    const { formData, inputOnChange, setLoading, resetFormData, signUpRequest, googleLoginRequest } = userStore();
    const navigate = useNavigate();

    const handleSignUpRequest = async () => {
        try {
            // Validate form input fields
            if (ValidationHelper.IsEmpty(formData.email)) {
                errorToast("Email is required");
            } else if (!ValidationHelper.IsEmail(formData.email)) {
                errorToast("Invalid email");
            } else if (ValidationHelper.IsEmpty(formData.password)) {
                errorToast("Password is required");
            } else {
                // Prepare data for API request
                const data = {
                    email: formData.email,
                    password: formData.password
                };
                setLoading(true); // Show loading spinner or disable button

                // Send API request to sign up user
                const result = await signUpRequest(data);

                if (result.status === true) {
                    // Success: show message, reset form, and redirect
                    successToast(result?.message);
                    resetFormData();
                    navigate("/login");
                } else {
                    // Show error message if API response is unsuccessful
                    errorToast(result?.message);
                }

                setLoading(false); // Stop loading
            }
        } catch (error) {
            // Show error if request fails
            errorToast(error?.response?.data?.message || "Something went wrong");
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
            {/* Semi-transparent overlay for background effect */}
            <div className="absolute inset-0 bg-[#57958C] opacity-40 z-10"></div>

            {/* Form Container */}
            <div className="relative z-20 w-full md:w-1/3 px-4">
                <div className="shadow-sm px-8 py-10 space-y-8 rounded-md bg-white">
                    {/* Heading */}
                    <h2 className="text-2xl font-semibold text-center text-[#164193]">
                        Create an Account
                    </h2>
                    <div className="relative mt-4">
                        <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            value={formData?.email}
                            onChange={(e) => inputOnChange("email", e.target.value)}
                            className="pl-10 text-sm text-gray-600 focus:outline-0 focus:shadow-sm focus:bg-slate-50 w-full border-b border-gray-200 px-3 py-2 rounded"
                            type="email"
                            placeholder="Email"
                        />
                    </div>

                    <div className="relative mt-4">
                        <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            value={formData?.password}
                            onChange={(e) => inputOnChange("password", e.target.value)}
                            className="pl-10 text-sm text-gray-600 focus:outline-0 focus:shadow-sm focus:bg-slate-50 w-full border-b border-gray-200 px-3 py-2 rounded"
                            type="password"
                            placeholder="Password"
                        />
                    </div>


                    {/* Submit Button */}
                    <div>
                        <UserButton
                            className="w-full text-sm text-white px-8 py-3 font-medium bg-[#00B092] rounded cursor-pointer hover:bg-[#009e84] transition"
                            onClick={handleSignUpRequest}
                            text="Sign Up"
                        />
                    </div>

                    {/*google login*/}

                    <p className="text-sm text-center text-gray-600">Or, Login with</p>

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

                    {/* Login Link */}
                    <div>
                        <p className="text-center text-sm text-gray-600">
                            Already have an account?{" "}
                            <Link to="/login" className="text-sky-300 hover:underline">
                                Login
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
