import React from 'react';
import DoctorForm from "../components/doctorForm.jsx";
import MasterLayout from "../layout/MasterLayout.jsx";

const DoctorRegistrationPage = () => {
    return (
        <MasterLayout>
            <DoctorForm />
        </MasterLayout>
    );
};

export default DoctorRegistrationPage;