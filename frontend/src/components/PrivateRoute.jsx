import React, {useEffect} from 'react';
import {Navigate, Outlet} from 'react-router-dom';
import {userStore} from "../store/userStore.js";


const PrivateRoute = ({ allowedRoles }) => {
    const {role, getRole, isLogin} = userStore()

    if (!isLogin) {
        return <Navigate to="/login" replace />;
    }

    useEffect(()=>{
        (async ()=>{
            isLogin() && await getRole();
        })()
    },[role])

    return allowedRoles.includes(role) && <Outlet />
};

export default PrivateRoute;
