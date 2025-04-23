import React from 'react';
import {Link} from "react-router-dom";

const SignUp = () => {
    return (
        <div>
            <div className="h-screen flex justify-center items-center bg-[url(/images/hero_bg.jpg)] bg-center bg-cover bg-no-repeat">
                <div className="w-full md:w-1/3 mx-auto px-4 md:px-0">
                    <div className="shadow-sm px-8 py-15 space-y-8 rounded-md bg-white">
                        <div>
                            <input
                                className="text-sm text-gray-600 focus:outline-0 focus:shadow-sm focus:bg-slate-50 w-full border-b-1 border-b-gray-200 px-3 py-2 rounded"
                                type="text" placeholder="Name"/>
                        </div>
                        <div>
                            <input
                                className="text-sm text-gray-600 focus:outline-0 focus:shadow-sm focus:bg-slate-50 w-full border-b-1 border-b-gray-200 px-3 py-2 rounded"
                                type="email" placeholder="Email"/>
                        </div>
                        <div>
                            <input
                                className="text-sm text-gray-600 focus:outline-0 focus:shadow-sm focus:bg-slate-50 w-full border-b-1 border-b-gray-200 px-3 py-2 rounded"
                                type="password" placeholder="Password"/>
                        </div>
                        <div>
                            <button
                                className="text-gray-500 cursor-pointer bg-slate-200 hover:bg-slate-300 hover:text-gray-700 transition-all duration-300 px-8 py-2 rounded-lg w-full"
                            >
                                Register
                            </button>
                        </div>
                        <div>
                            <p className="text-center text-sm text-gray-500">Already have an account? <Link to="/login"
                                                                                                            className="text-sky-300">Login</Link>
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default SignUp;