import React, {useEffect} from 'react';
import DashboardLayout from "../../layout/DashboardLayout.jsx";
import AllHospital from "../../components/dashboard/AllHospital.jsx";
import {hospitalStore} from "../../store/hospitalStore.js";

const HospitalManagePage = () => {

    const {fetchAllHospitalList} = hospitalStore()

    useEffect(() => {
        (async ()=>{
            await fetchAllHospitalList();
        })()
    }, [])
    return (
        <DashboardLayout>
            <AllHospital />
        </DashboardLayout>
    );
};

export default HospitalManagePage;