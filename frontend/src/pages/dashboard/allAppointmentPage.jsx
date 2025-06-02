import React, {useEffect} from 'react';
import DashboardLayout from "../../layout/DashboardLayout.jsx";
import Appointments from "../../components/dashboard/Appointments.jsx";
import {appointmentStore} from "../../store/appointmentStore.js";

const AllAppointmentPage = () => {

    const {appointmentList, fetchDoctorAppointmentList} = appointmentStore();

    useEffect(() => {
        (async ()=>{
            await fetchDoctorAppointmentList();
        })()
    }, [])

    return (
        <DashboardLayout>
            <Appointments appointmentList={appointmentList} />
        </DashboardLayout>
    );
};

export default AllAppointmentPage;