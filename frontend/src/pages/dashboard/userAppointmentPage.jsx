import React, {useEffect} from 'react';
import DashboardLayout from "../../layout/DashboardLayout.jsx";
import Appointments from "../../components/dashboard/Appointments.jsx";
import {appointmentStore} from "../../store/appointmentStore.js";

const UserAppointmentPage = () => {

    const {appointmentList, fetchPatientAppointmentList} = appointmentStore()

    useEffect(() => {
        (async ()=>{
            await fetchPatientAppointmentList();
        })()
    }, [])

    return (
        <DashboardLayout>
            <Appointments appointmentList={appointmentList} />
        </DashboardLayout>
    );
};

export default UserAppointmentPage;