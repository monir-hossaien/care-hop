import React from 'react';
import MasterLayout from "../layout/MasterLayout.jsx";
import HospitalList from "../components/HospitalList.jsx";
import SearchHospital from "../components/SearchHospital.jsx";

const SearchHospitalPage = () => {
    return (
        <MasterLayout>
            <SearchHospital />
        </MasterLayout>
    );
};

export default SearchHospitalPage;