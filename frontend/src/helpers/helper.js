// Import toast for showing success/error notifications
import toast from "react-hot-toast";

// React Router hooks for navigation and route change detection
import { useLocation, useNavigate } from "react-router-dom";

// useEffect for side effects like scroll or redirects
import { useEffect } from "react";

// Cookie management for authentication
import cookies from "js-cookie";

// Validation helper class with static methods
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

// Show a success toast notification
export const successToast = (message) => {
    toast.success(message);
};

// Show an error toast notification
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

// Handle unauthorized API responses (401) by removing token and redirecting to login
export const unauthorized = (code) => {
    if (code === 401) {
        cookies.remove("token");
        window.location.href = "/login";
    }
};

// Get user role from localStorage
export const getRole = () => {
    return localStorage.getItem("role");
};
