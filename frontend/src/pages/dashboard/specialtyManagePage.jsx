import React, {useEffect} from 'react';
import DashboardLayout from "../../layout/DashboardLayout.jsx";
import AllSpecialties from "../../components/dashboard/AllSpecialties.jsx";
import {specialitiesStore} from "../../store/specialitiesStore.js";

const SpecialtyManagePage = () => {
    const {fetchSpecialtiesList} = specialitiesStore()

    useEffect(()=>{
        (async ()=>{
            await fetchSpecialtiesList();
        })()
    },[])

    return (
        <DashboardLayout>
            <AllSpecialties />
        </DashboardLayout>
    );
};

export default SpecialtyManagePage;