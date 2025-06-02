import React from 'react';
import DoctorRequestForm from "../components/doctorRequestForm.jsx";
import MasterLayout from "../layout/MasterLayout.jsx";

const DoctorRegistrationPage = () => {
    return (
        <MasterLayout>
            <DoctorRequestForm />
        </MasterLayout>
    );
};

export default DoctorRegistrationPage;