import React from 'react';
import {userStore} from "../store/userStore.js";
import {Navigate, Outlet} from 'react-router-dom';
import GoogleLoginSkeleton from "../skeleton/googleLoginSkeleton.jsx";
import {useAuthContext} from "../context/AuthProvider.jsx";


const PrivateRoute = ({ allowedRoles }) => {
    const {loading } = userStore();
    const {role, isLogin} = useAuthContext()

    if (!isLogin) {
        return <Navigate to="/login" replace />;
    }

    if (loading) {
        return <GoogleLoginSkeleton />
    }

    return allowedRoles.includes(role) && <Outlet />
};

export default PrivateRoute;
