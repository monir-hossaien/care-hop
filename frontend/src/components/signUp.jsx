// Import necessary libraries and components
import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { userStore } from "../store/userStore.js";
import UserButton from "./UserButton.jsx";
import ValidationHelper, { errorToast, successToast } from "../helpers/helper.js";

const SignUp = () => {
    // Extract state and methods from the global store
    const { formData, inputOnChange, setLoading, resetFormData, signUpRequest } = userStore();
    const navigate = useNavigate();

    // Prepare data for API request
    const data = {
        email: formData.email,
        password: formData.password
    };

    // Handle sign-up button click
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

    return (
        <div className="relative h-screen flex justify-center items-center bg-[url(/images/hero_bg.jpg)] bg-center bg-cover bg-no-repeat">
            {/* Semi-transparent overlay for background effect */}
            <div className="absolute inset-0 bg-[#57958C] opacity-40 z-10"></div>

            {/* Form Container */}
            <div className="relative z-20 w-full md:w-1/3 px-4">
                <div className="shadow-sm px-8 py-10 space-y-8 rounded-md bg-white">
                    {/* Email Input */}
                    <div>
                        <input
                            value={formData?.email}
                            onChange={(e) => inputOnChange("email", e.target.value)}
                            className="text-sm text-gray-600 focus:outline-0 focus:shadow-sm focus:bg-slate-50 w-full border-b border-gray-200 px-3 py-2 rounded"
                            type="email"
                            placeholder="Email"
                        />
                    </div>

                    {/* Password Input */}
                    <div>
                        <input
                            value={formData?.password}
                            onChange={(e) => inputOnChange("password", e.target.value)}
                            className="text-sm text-gray-600 focus:outline-0 focus:shadow-sm focus:bg-slate-50 w-full border-b border-gray-200 px-3 py-2 rounded"
                            type="password"
                            placeholder="Password"
                        />
                    </div>

                    {/* Submit Button */}
                    <div>
                        <UserButton
                            className="cursor-pointer text-white bg-[#57958C] hover:bg-[#45786F] transition-all duration-300 px-8 py-2 rounded-lg w-full"
                            onClick={handleSignUpRequest}
                            text="Sign Up"
                        />
                    </div>

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
