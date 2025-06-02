import React, {useEffect} from 'react';
import DashboardLayout from "../../layout/DashboardLayout.jsx";
import {userStore} from "../../store/userStore.js";
import Profile from "../../components/dashboard/Profile.jsx";

const ProfileManagePage = () => {

    const {profileDetails, fetchProfileDetails} = userStore()

    useEffect(()=>{
        (async ()=>{
            if(!profileDetails) {
                await fetchProfileDetails();
            }
        })()
    },[])

    return (
        <DashboardLayout>
            <Profile />
        </DashboardLayout>
    );
};

export default ProfileManagePage;