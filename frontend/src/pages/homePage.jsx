import React from 'react';
import MasterLayout from "../layout/MasterLayout.jsx";
import Hero from "../components/Hero.jsx";
import Speciality from "../components/Speciality.jsx";
import BlogList from "../components/BlogList.jsx";
import SearchDoctorBanner from "../components/SearchDoctorBanner.jsx";

const HomePage = () => {
    return (
        <MasterLayout>
            <Hero/>
            <Speciality/>
            <SearchDoctorBanner/>
            <BlogList/>
        </MasterLayout>
    );
};

export default HomePage;