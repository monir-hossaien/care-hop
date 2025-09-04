import React from 'react';
import {Navigate, Outlet} from 'react-router-dom';
import {useAuthContext} from "../context/AuthProvider.jsx";


const PrivateRoute = ({ allowedRoles }) => {
    const {role, isLogin} = useAuthContext()

    if (!isLogin) {
        return <Navigate to="/login" replace />;
    }

    return allowedRoles.includes(role) && <Outlet />
};

export default PrivateRoute;
