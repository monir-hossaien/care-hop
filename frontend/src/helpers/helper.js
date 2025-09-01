import {toast} from "react-toastify";
import Swal from 'sweetalert2'
import { useLocation} from "react-router-dom";
import { useEffect } from "react";
import Cookies from "js-cookie";

class ValidationHelper {

    // Check if input contains only letters and common punctuation
    static IsLater(value) {
        let OnlyLaterRegx = /^[A-Za-z\'\s\.\,\-\!\@\#\$\%\^\&\*\(\)\[\]\{\}\:\;\"\<\>\?\/\+\=\_\\\|`\~]+$/;
        return OnlyLaterRegx.test(value);
    }

    // Validate email format
    static IsEmail(value) {
        let EmailRegx = /\S+@\S+\.\S+/;
        return EmailRegx.test(value);
    }

    // Validate Bangladeshi mobile number format
    static IsMobile(value) {
        let MobileRegx = /(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/;
        return MobileRegx.test(value);
    }

    // Check if value is a valid number (integer or decimal)
    static IsNumber(value) {
        let OnlyNumberRegx = /^\d+(\.\d+)?$/;
        return OnlyNumberRegx.test(value);
    }

    // Check if value is null
    static IsNull(value) {
        return value == null;
    }

    // Check if value is an empty string or array
    static IsEmpty(value) {
        return value.length === 0;
    }
}

export default ValidationHelper;

export const successToast = (message) => {
    toast.success(message);
};

export const errorToast = (message) => {
    toast.error(message);
};

// Convert timestamp to a formatted date string (e.g., 12 May, 2025)
export const TimestampToDate = (timestamp) => {
    let date = new Date(timestamp);
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return date.getDate() + " " + monthNames[date.getMonth()] + ", " + date.getFullYear();
};

// Automatically scroll to top on route change
export const ScrollToTopOnNavigation = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [pathname]);

    return null;
};

// Handle unauthorized API responses (401) by removing token and redirecting to
export const unauthorized = (code) => {
    if (code === 401) {
        Cookies.remove("accessToken");
        window.location.href = ('/login');
    }
};


export const  DeleteAlert = async ()=> {
    const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to remove this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, remove it!",
        allowOutsideClick: false
    });
    return result.isConfirmed;
}

export const SuccessAlert = async (msg)=> {
    const result = await Swal.fire({
        text: msg,
        icon: "success",
        confirmButtonColor: "#198754",
        confirmButtonText: "OK",
        allowOutsideClick: false
    });
    return result.isConfirmed;
}

export const FailAlert = async (msg)=> {
    const result = await Swal.fire({
        text: msg,
        icon: "warning",
        confirmButtonColor: "#fcac3f",
        confirmButtonText: "Try Again",
        allowOutsideClick: false
    });
    return result.isConfirmed;
}

export const InfoAlert = async (msg)=> {
    const result = await Swal.fire({
        text: msg,
        icon: "info",
        confirmButtonColor: "#198754",
        confirmButtonText: "Go Ahead",
        allowOutsideClick: false
    });
    return result.isConfirmed;
}
