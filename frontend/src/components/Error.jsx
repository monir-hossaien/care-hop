import React from 'react';
import {Link} from "react-router-dom";
import {IoIosArrowRoundBack} from "react-icons/io";

const Error = () => {
    return (
        <>
            <section className="bg-white min-h-screen flex items-center">
                <div className="container mx-auto flex justify-center">
                    <div className="text-center">
                        <p className="text-4xl text-red-600">404!</p>
                        <h1 className="mt-3 text-2xl text-gray-800">
                            Page not found
                        </h1>
                        <p className="mt-2 text-gray-500">
                            The page you are looking for doesn't exist. Here are some helpful links:
                        </p>
                        <div className="flex justify-center mt-4 gap-2">
                            <button className="cursor-pointer border border-gray-400 flex items-center gap-2 px-4 py-2"
                                    onClick={()=>window.history.back()}>
                                <IoIosArrowRoundBack className="text-2xl" />
                                <span>Go back</span>
                            </button>
                            <Link to="/" class="bg-gray-800 text-white px-4 py-2">
                                Take me home
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Error;