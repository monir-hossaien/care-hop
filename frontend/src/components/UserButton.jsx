import React from 'react';
import {commonStore} from "../store/commmonStore.js";
import {CgSpinner} from "react-icons/cg";

const UserButton = (props) => {
    const {loading} = commonStore()
    const {className, onClick, text} = props;
    if (loading) {
        return (
            <button
                className={className}
                onClick={onClick}
            >
                <div className="flex items-center justify-center gap-1">
                    <CgSpinner className="animate-spin text-2xl" />
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