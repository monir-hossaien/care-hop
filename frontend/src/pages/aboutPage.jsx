import React from 'react';
import MasterLayout from "../layout/MasterLayout.jsx";
import About from "../components/About.jsx";
import OurGoals from "../components/OurGoals.jsx";

const AboutPage = () => {
    return (
        <MasterLayout>
            <About />
            <OurGoals />
        </MasterLayout>
    );
};

export default AboutPage;