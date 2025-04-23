import React from 'react';
import MasterLayout from "../layout/MasterLayout.jsx";
import Speciality from "../components/Speciality.jsx";
import SpecialitySkeleton from "../skeleton/specialitySkeleton.jsx";
import DoctorList from "../components/DoctorList.jsx";

const DoctorPage = () => {
    return (
        <MasterLayout>
            <DoctorList/>
        </MasterLayout>
    );
};

export default DoctorPage;