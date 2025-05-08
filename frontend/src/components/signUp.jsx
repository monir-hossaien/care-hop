import React from 'react';
import { Link } from "react-router-dom";

const SignUp = () => {
    return (
        <div className="relative h-screen flex justify-center items-center bg-[url(/images/hero_bg.jpg)] bg-center bg-cover bg-no-repeat">
            {/* Overlay */}
            <div className="absolute inset-0 bg-[#57958C] opacity-40 z-10"></div>

            {/* Form Container */}
            <div className="relative z-20 w-full md:w-1/3 px-4">
                <div className="shadow-sm px-8 py-10 space-y-8 rounded-md bg-white">
                    <div>
                        <input
                            className="text-sm text-gray-600 focus:outline-0 focus:shadow-sm focus:bg-slate-50 w-full border-b border-gray-200 px-3 py-2 rounded"
                            type="text"
                            placeholder="Name"
                        />
                    </div>
                    <div>
                        <input
                            className="text-sm text-gray-600 focus:outline-0 focus:shadow-sm focus:bg-slate-50 w-full border-b border-gray-200 px-3 py-2 rounded"
                            type="email"
                            placeholder="Email"
                        />
                    </div>
                    <div>
                        <input
                            className="text-sm text-gray-600 focus:outline-0 focus:shadow-sm focus:bg-slate-50 w-full border-b border-gray-200 px-3 py-2 rounded"
                            type="password"
                            placeholder="Password"
                        />
                    </div>
                    <div>
                        <button
                            className="text-white bg-[#57958C] hover:bg-[#45786F] transition-all duration-300 px-8 py-2 rounded-lg w-full"
                        >
                            Register
                        </button>
                    </div>
                    <div>
                        <p className="text-center text-sm text-gray-600">
                            Already have an account? <Link to="/login" className="text-sky-300 hover:underline">Login</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
