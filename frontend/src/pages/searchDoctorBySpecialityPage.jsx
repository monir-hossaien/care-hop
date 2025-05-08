import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CiSearch } from 'react-icons/ci';
import { RxDividerVertical } from 'react-icons/rx';

import MasterLayout from "../layout/MasterLayout.jsx";
import DoctorList from "../components/DoctorList.jsx";
import { doctorStore } from "../store/doctorStore.js";
import { commonStore } from "../store/commmonStore.js";
import SearchDoctorBySpecialty from "../components/SearchDoctorBySpecialty.jsx";

const SearchDoctorBySpecialityPage = () => {
    // Extract necessary store actions & states
    const { fetchDoctorListBySpeciality} = doctorStore();

    // URL parameters
    const {specialityID } = useParams();


    // Fetch doctors by selected speciality when the page loads or speciality changes
    useEffect(() => {
        (async () => {
            if(specialityID){
                await fetchDoctorListBySpeciality(specialityID);
            }
        })();
    }, []);

    return (
        <MasterLayout>
            <SearchDoctorBySpecialty/>
        </MasterLayout>
    );
};

export default SearchDoctorBySpecialityPage;
