import React, {useEffect} from 'react';
import DashboardLayout from "../../layout/DashboardLayout.jsx";
import WelcomeCard from "../../components/dashboard/WelComeCard.jsx";
import {userStore} from "../../store/userStore.js";

const UserHomePage = () => {

    const { profileDetails , fetchProfileDetails} = userStore();

    useEffect(() => {
        (async ()=>{
            await fetchProfileDetails();
        })()
    }, []);

    const name = profileDetails?.profile?.name;

    return (
        <DashboardLayout>
            <WelcomeCard name={name} />
        </DashboardLayout>
    );
};

export default UserHomePage;