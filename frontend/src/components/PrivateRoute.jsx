import React from 'react';
import {userStore} from "../store/userStore.js";
import {Navigate, Outlet} from 'react-router-dom';
import cookies from "js-cookie";


const PrivateRoute = ({ allowedRoles }) => {
    const { role} = userStore();
    const token = cookies.get('accessToken');

    if (!token) return <Navigate to="/login" replace />;
    if (role === null) return;

    if (allowedRoles.includes(role)) {
        return <Outlet />;
    } else {
        return <Navigate to="/" replace />;
    }
};

export default PrivateRoute;
