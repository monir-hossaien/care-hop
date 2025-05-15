import React from 'react';

// Navigate allows redirection to a different route
import {Navigate, Outlet} from 'react-router-dom';

// For accessing stored token in cookies
import cookies from "js-cookie";

// Helper function to extract role from token or local data
import { getRole } from "../helpers/helper.js";

// PrivateRoute component protects routes based on user authentication and role
const PrivateRoute = ({allowedRoles}) => {
    // Get token from cookies
    const token = cookies.get('token');

    // If no token found, redirect user to login page
    if (!token) return <Navigate to="/login" replace />;

    // Get the user's role
    const role = getRole();

    // If user's role is allowed, render the children (protected route)
    if (allowedRoles.includes(role)) {
        return <Outlet />
    } else {
        // If role is not permitted, redirect to login page
        return <Navigate to="/" replace />;
    }
};

export default PrivateRoute;
