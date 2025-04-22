import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "./pages/homePage.jsx";
import AboutPage from "./pages/aboutPage.jsx";
import DoctorPage from "./pages/doctorPage.jsx";
import PostPage from "./pages/postPage.jsx";
import ContactPage from "./pages/contactPage.jsx";
import SearchPage from "./pages/searchPage.jsx";
import LoginPage from "./pages/loginPage.jsx";
import SignUpPage from "./pages/signUpPage.jsx";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/doctors" element={<DoctorPage />} />
                <Route path="/posts" element={<PostPage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/sign-up" element={<SignUpPage />} />
                <Route path="/contact" element={<ContactPage />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;