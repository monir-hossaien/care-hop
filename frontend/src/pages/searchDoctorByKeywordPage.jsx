import React from 'react';
import MasterLayout from "../layout/MasterLayout.jsx";
import SearchDoctorByKeyword from "../components/SearchDoctorByKeyword.jsx";

const SearchDoctorByKeywordPage = () => {
    return (
        <MasterLayout>
            <SearchDoctorByKeyword/>
        </MasterLayout>
    );
};

export default SearchDoctorByKeywordPage;