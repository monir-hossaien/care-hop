import React from 'react';
import {CgSpinner} from "react-icons/cg";
import {userStore} from "../store/userStore.js";

const UserButton = (props) => {
    const {loading} = userStore();
    const {className, onClick, text} = props;
    if (loading) {
        return (
            <button
                className={className}
                onClick={onClick}
            >
                <div className="flex items-center justify-center gap-1">
                    <CgSpinner className="animate-spin text-xl" />
                    <span className="text-sm">Processing…</span>
                </div>
            </button>
        )
    } else {
        return (
            <button
                className={className}
                onClick={onClick}
            >
                {text}
            </button>
        )
    }
};

export default UserButton;