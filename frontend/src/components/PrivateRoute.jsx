import React, {useEffect, useState} from 'react';
import {userStore} from "../store/userStore.js";

// Navigate allows redirection to a different route
import {Navigate, Outlet} from 'react-router-dom';

// For accessing stored token in cookies
import cookies from "js-cookie";

// Helper function to extract role from token or local data
// import { getRole } from "../helpers/helper.js";


// PrivateRoute component protects routes based on user authentication and role
const PrivateRoute = ({ allowedRoles }) => {
    const { role, getRole } = userStore();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            if (!role) {
                await getRole();
            }
            setLoading(false);
        })();
    }, [role]);

    const token = cookies.get('token');

    if (!token) return <Navigate to="/login" replace />;
    if (loading) return <div></div>;

    if (allowedRoles.includes(role)) {
        return <Outlet />;
    } else {
        return <Navigate to="/" replace />;
    }
};

export default PrivateRoute;
