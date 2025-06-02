import React, {useEffect} from 'react';
import DashboardLayout from "../../layout/DashboardLayout.jsx";
import WelcomeCard from "../../components/dashboard/WelComeCard.jsx";
import {userStore} from "../../store/userStore.js";

const DoctorHomePage = () => {

    const {profileDetails, fetchDoctorProfile} = userStore();

    useEffect(() => {
        (async ()=>{
            await fetchDoctorProfile();
        })()
    }, []);

    const name = profileDetails?.name

    return (
        <DashboardLayout>
            <WelcomeCard name={name} />
        </DashboardLayout>
    );
};

export default DoctorHomePage;