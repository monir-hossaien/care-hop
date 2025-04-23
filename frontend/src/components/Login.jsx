import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

const Login = () => {
    const [show, setShow] = useState(false);

    return (
        <div className="h-screen flex justify-center items-center bg-[url(/images/hero_bg.jpg)] bg-center bg-cover bg-no-repeat">
            <div className="w-full md:w-1/3 mx-auto px-4 md:px-0">
                <div className="shadow-sm px-8 py-15 space-y-8 rounded-md bg-white">
                    <div>
                        <input
                            className="text-sm text-gray-600 focus:outline-0 focus:shadow-sm focus:bg-slate-50 w-full border-b border-gray-200 px-3 py-2 rounded"
                            type="email"
                            placeholder="Email"
                        />
                    </div>

                    <div className="relative">
                        <input
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

                    <div>
                        <button
                            className="text-gray-500 cursor-pointer bg-slate-200 hover:bg-slate-300 hover:text-gray-700 transition-all duration-300 px-8 py-2 rounded-lg w-full"
                        >
                            Login
                        </button>
                    </div>

                    <div>
                        <p className="text-center text-sm text-gray-500">
                            Not a member? <Link to="/sign-up" className="text-sky-300">Register</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
