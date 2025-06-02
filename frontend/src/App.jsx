// React core and hooks
import React from 'react';

// Scroll-to-top button component
import ScrollToTop from "react-scroll-to-top";

// React Router DOM tools
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Public pages
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
import { ScrollToTopOnNavigation } from "./helpers/helper.js";

// Admin dashboard pages
import AdminHomePage from "./pages/dashboard/adminHomePage.jsx";
import BlogManagePage from "./pages/dashboard/blogManagePage.jsx";
import DoctorManagePage from "./pages/dashboard/doctorManagePage.jsx";
import UserManagePage from "./pages/dashboard/userManagePage.jsx";
import HospitalManagePage from "./pages/dashboard/hospitalManagePage.jsx";
import SpecialtyManagePage from "./pages/dashboard/specialtyManagePage.jsx";

// Doctor dashboard pages
import DoctorHomePage from "./pages/dashboard/doctorHomePage.jsx";
import AllAppointmentPage from "./pages/dashboard/allAppointmentPage.jsx";
import DoctorBlogPage from "./pages/dashboard/doctorBlogPage.jsx";
import DoctorProfilePage from "./pages/dashboard/doctorProfilePage.jsx";

// User dashboard pages
import UserHomePage from "./pages/dashboard/userHomePage.jsx";
import UserAppointmentPage from "./pages/dashboard/userAppointmentPage.jsx";


// Error page for undefined routes
import ErrorPage from "./pages/errorPage.jsx";

// Role-based route protection
import PrivateRoute from "./components/PrivateRoute.jsx";
import DoctorRegistrationPage from "./pages/doctorRegistrationPage.jsx";
import AllMessagePage from "./pages/dashboard/allMessagePage.jsx";
import ProfileManagePage from "./pages/dashboard/profileManagePage.jsx";

const App = () => {
    return (
        <BrowserRouter>
            {/* Scroll to top on route change */}
            <ScrollToTopOnNavigation />

            {/* Floating Scroll-to-Top button */}
            <ScrollToTop smooth className="flex justify-center items-center" height="20" color={"#164193"} />

            {/* Application routes */}
            <Routes>

                {/* Public routes */}
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/specialities" element={<SpecialityPage />} />
                <Route path="/blogs" element={<BlogPage />} />
                <Route path="/blog-details/:blogID" element={<BlogDetailsPage />} />
                <Route path="/department/:name/:specialityID" element={<SearchDoctorBySpecialityPage />} />
                <Route path="/search" element={<SearchDoctorByKeywordPage />} />
                <Route path="/search-doctor" element={<SearchDoctorByKeywordPage />} />
                <Route path="/search-hospital" element={<SearchHospitalPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/sign-up" element={<SignUpPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="*" element={<ErrorPage />} />

                {/* Admin routes - Protected by PrivateRoute */}
                <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
                    <Route path="/admin/dashboard" element={<AdminHomePage />} />
                    <Route path="/admin/blog" element={<BlogManagePage />} />
                    <Route path="/admin/doctor" element={<DoctorManagePage />} />
                    <Route path="/admin/user" element={<UserManagePage />} />
                    <Route path="/admin/profile" element={<ProfileManagePage />} />
                    <Route path="/admin/hospital" element={<HospitalManagePage />} />
                    <Route path="/admin/specialty" element={<SpecialtyManagePage />} />
                    <Route path="/admin/message" element={<AllMessagePage />} />
                </Route>

                {/* Doctor routes - Protected by PrivateRoute */}
                <Route element={<PrivateRoute allowedRoles={["doctor"]} />}>
                    <Route path="/doctor/dashboard" element={<DoctorHomePage />} />
                    <Route path="/doctor/appointments" element={<AllAppointmentPage />} />
                    <Route path="/doctor/blog" element={<DoctorBlogPage />} />
                    <Route path="/doctor/profile" element={<DoctorProfilePage />} />
                </Route>

                {/* User routes - Protected by PrivateRoute */}
                <Route element={<PrivateRoute allowedRoles={["user"]} />}>
                    <Route path="/user/dashboard" element={<UserHomePage />} />
                    <Route path="/registration-form" element={<DoctorRegistrationPage />} />
                    <Route path="/user/appointments" element={<UserAppointmentPage />} />
                    <Route path="/user/profile" element={<ProfileManagePage />} />
                </Route>

            </Routes>
        </BrowserRouter>
    );
};

export default App;
