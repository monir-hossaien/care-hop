import React, {useEffect} from 'react';
import DashboardLayout from "../../layout/DashboardLayout.jsx";
import DoctorRequestForm from "../../components/doctorRequestForm.jsx";
import PasswordChange from "../../components/dashboard/PasswordChange.jsx";
import Profile from "../../components/dashboard/Profile.jsx";
import {userStore} from "../../store/userStore.js";
import {doctorStore} from "../../store/doctorStore.js";
import {commonStore} from "../../store/commmonStore.js";
import {specialitiesStore} from "../../store/specialitiesStore.js";
import {hospitalStore} from "../../store/hospitalStore.js";
import DoctorProfile from "../../components/dashboard/DoctorProfile.jsx";

const DoctorProfilePage = () => {

    const {fetchDoctorProfile} = userStore();

    useEffect(()=>{
        (async ()=>{
            await fetchDoctorProfile();
        })()
    },[])

    return (
        <DashboardLayout>
            <div className="grid grid-cols-12 gap-6 max-w-6xl mx-auto py-3">
               <div className="col-span-12 md:col-span-7">
                   <DoctorProfile />
               </div>
                <div className="col-span-12 md:col-span-5">
                    <PasswordChange />
                </div>
            </div>
        </DashboardLayout>
    );
};

export default DoctorProfilePage;