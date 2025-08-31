import React, {useEffect, useState} from 'react';
import {userStore} from "../store/userStore.js";
import {Navigate, Outlet} from 'react-router-dom';
import GoogleLoginSkeleton from "../skeleton/googleLoginSkeleton.jsx";


const PrivateRoute = ({ allowedRoles }) => {
    const { role, getRole, isLogin } = userStore();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRole = async () => {
            if (isLogin() && role === null) {
                setLoading(true);
                await getRole();
            }
            setLoading(false);
        };

        fetchRole();
    }, [role, isLogin, getRole]);

    if (!isLogin()) {
        return <Navigate to="/login" replace />;
    }

    if (loading) {
        return <GoogleLoginSkeleton />
    }

    return allowedRoles.includes(role) ? (
        <Outlet />
    ) : (
        <Navigate to="/" replace />
    );
};

export default PrivateRoute;
