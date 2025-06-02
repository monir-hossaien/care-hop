import React from 'react';
import {ImSpinner9} from "react-icons/im";

const LoadingModal = ({ message = "Processing..." }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-xs backdrop-brightness-100 px-4 sm:px-6 py-10 overflow-y-auto">
            <div className="flex items-center justify-center space-y-4">
                <ImSpinner9 className="text-5xl animate-spin text-indigo-500" />
            </div>
        </div>
    );
};

export default LoadingModal;
