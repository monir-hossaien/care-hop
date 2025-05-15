// React core and hooks
import React, { useEffect } from 'react';

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
import AdminHomePage from "./pages/dashboard/admin/adminHomePage.jsx";
import BlogManagePage from "./pages/dashboard/admin/blogManagePage.jsx";
import DoctorManagePage from "./pages/dashboard/admin/doctorManagePage.jsx";
import UserManagePage from "./pages/dashboard/admin/userManagePage.jsx";
import AppointmentManagePage from "./pages/dashboard/admin/appointmentManagePage.jsx";
import AdminProfilePage from "./pages/dashboard/admin/adminProfilePage.jsx";
import HospitalManagePage from "./pages/dashboard/admin/hospitalManagePage.jsx";
import SpecialtyManagePage from "./pages/dashboard/admin/specialtyManagePage.jsx";

// Doctor dashboard pages
import DoctorHomePage from "./pages/dashboard/doctor/doctorHomePage.jsx";
import AllAppointmentPage from "./pages/dashboard/doctor/allAppointmentPage.jsx";
import DoctorBlogPage from "./pages/dashboard/doctor/doctorBlogPage.jsx";
import DoctorProfilePage from "./pages/dashboard/doctor/doctorProfilePage.jsx";

// User dashboard pages
import UserHomePage from "./pages/dashboard/user/userHomePage.jsx";
import UserAppointmentPage from "./pages/dashboard/user/userAppointmentPage.jsx";
import UserProfilePage from "./pages/dashboard/user/userProfilePage.jsx";

// Shared settings page for all roles
import AccountSettingPage from "./pages/accountSettingPage.jsx";

// Error page for undefined routes
import ErrorPage from "./pages/errorPage.jsx";

// Role-based route protection
import PrivateRoute from "./components/PrivateRoute.jsx";
import DoctorRegistrationPage from "./pages/doctorRegistrationPage.jsx";

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
                    <Route path="/admin/profile" element={<AdminProfilePage />} />
                    <Route path="/admin/appointment" element={<AppointmentManagePage />} />
                    <Route path="/admin/hospital" element={<HospitalManagePage />} />
                    <Route path="/admin/specialty" element={<SpecialtyManagePage />} />
                    <Route path="/admin/account-settings" element={<AccountSettingPage />} />
                </Route>

                {/* Doctor routes - Protected by PrivateRoute */}
                <Route element={<PrivateRoute allowedRoles={["doctor"]} />}>
                    <Route path="/doctor/dashboard" element={<DoctorHomePage />} />
                    <Route path="/doctor/appointments" element={<AllAppointmentPage />} />
                    <Route path="/doctor/blog" element={<DoctorBlogPage />} />
                    <Route path="/doctor/profile" element={<DoctorProfilePage />} />
                    <Route path="/doctor/account-settings" element={<AccountSettingPage />} />
                </Route>

                {/* User routes - Protected by PrivateRoute */}
                <Route element={<PrivateRoute allowedRoles={["user"]} />}>
                    <Route path="/user/dashboard" element={<UserHomePage />} />
                    <Route path="/registration-form" element={<DoctorRegistrationPage />} />
                    <Route path="/user/appointments" element={<UserAppointmentPage />} />
                    <Route path="/user/profile" element={<UserProfilePage />} />
                    <Route path="/user/account-settings" element={<AccountSettingPage />} />
                </Route>

            </Routes>
        </BrowserRouter>
    );
};

export default App;
