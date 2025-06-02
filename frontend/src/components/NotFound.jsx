import React from 'react';

const NotFound = ({message}) => {
    return (
        <div className="flex flex-col justify-center items-center min-h-[60vh] text-center">
            <img
                className="w-40 md:w-52 mb-6 opacity-80"
                src="https://cdn-icons-png.flaticon.com/512/2748/2748558.png"
                alt="Not Found"
            />
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-2">
                404 - Not Found
            </h2>
            <p className="text-gray-600 text-sm md:text-base">{message}</p>
        </div>
    );
};

export default NotFound;
