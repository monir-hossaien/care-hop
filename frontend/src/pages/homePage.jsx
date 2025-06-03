import React from 'react';
import MasterLayout from "../layout/MasterLayout.jsx";
import Hero from "../components/Hero.jsx";
import Speciality from "../components/Speciality.jsx";
import BlogList from "../components/BlogList.jsx";
import SearchBanner from "../components/SearchBanner.jsx";

const HomePage = () => {
    return (
        <MasterLayout>
            <div className="overflow-hidden">
                <Hero/>
                <Speciality/>
                <SearchBanner/>
                <BlogList/>
            </div>
        </MasterLayout>
    );
};

export default HomePage;