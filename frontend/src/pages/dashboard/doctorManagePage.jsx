import React, {useEffect} from 'react';
import DashboardLayout from "../../layout/DashboardLayout.jsx";
import AllDoctor from "../../components/dashboard/AllDoctor.jsx";
import {doctorStore} from "../../store/doctorStore.js";

const DoctorManagePage = () => {
    const {fetchDoctorList} = doctorStore()

    useEffect(()=>{
        (async ()=>{
            await fetchDoctorList();
        })()
    },[])
    return (
        <DashboardLayout>
            <AllDoctor />
        </DashboardLayout>
    );
};

export default DoctorManagePage;