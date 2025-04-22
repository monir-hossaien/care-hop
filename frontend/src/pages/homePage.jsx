import React from 'react';
import MasterLayout from "../layout/MasterLayout.jsx";
import Hero from "../components/Hero.jsx";
import Speciality from "../components/Speciality.jsx";
import Post from "../components/Post.jsx";

const HomePage = () => {
    return (
        <MasterLayout>
            <Hero/>
            <Speciality/>
            <Post/>
        </MasterLayout>
    );
};

export default HomePage;