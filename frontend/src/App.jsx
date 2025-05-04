import React, {useEffect} from 'react';
import ScrollToTop from "react-scroll-to-top";
import {BrowserRouter, Route, Routes, useLocation} from "react-router-dom";
import HomePage from "./pages/homePage.jsx";
import AboutPage from "./pages/aboutPage.jsx";
import BlogPage from "./pages/blogPage.jsx";
import ContactPage from "./pages/contactPage.jsx";
import SearchDoctorByKeywordPage from "./pages/searchDoctorByKeywordPage.jsx";
import LoginPage from "./pages/loginPage.jsx";
import SignUpPage from "./pages/signUpPage.jsx";
import SpecialityPage from "./pages/specialityPage.jsx";
import SearchDoctorBySpecialityPage from "./pages/searchDoctorBySpecialityPage.jsx";
import SearchHospitalPage from "./pages/searchHospitalPage.jsx";
import BlogDetailsPage from "./pages/blogDetailsPage.jsx";


const ScrollToTopOnNavigation = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [pathname]);

    return null;
};

const App = () => {
    return (
        <BrowserRouter>
            <ScrollToTopOnNavigation/>
            <ScrollToTop smooth className="flex justify-center items-center" height="20" color={"#164193"} />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/specialities" element={<SpecialityPage/>} />
                <Route path="/blogs" element={<BlogPage />} />
                <Route path="/blog-details/:category/:blogID" element={<BlogDetailsPage/>} />
                <Route path="/department/:keyword/:specialityID" element={<SearchDoctorBySpecialityPage/>} />
                <Route path="/search" element={<SearchDoctorByKeywordPage />} />
                <Route path="/search-doctor" element={<SearchDoctorByKeywordPage />} />
                <Route path="/search-hospital" element={<SearchHospitalPage/>} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/sign-up" element={<SignUpPage />} />
                <Route path="/contact" element={<ContactPage />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;