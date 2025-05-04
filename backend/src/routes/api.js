import express from "express";
const router = express.Router();

import * as UserController from "../controllers/userController.js";
import * as HospitalController from "../controllers/hospitalController.js";
import * as ContactController from "../controllers/contactController.js";
import * as SpecialtyController from "../controllers/specialtiesController.js";
import * as ReviewController from "../controllers/reviewController.js";
import * as DoctorController from "../controllers/doctorController.js";
import * as PatientController from "../controllers/patientController.js";
import * as AppointmentController from "../controllers/appointmentController.js";
import * as BlogController from "../controllers/blogController.js"

import {upload} from "../helper/helper.js";
import {authenticateUser, isRole} from "../middleware/auth.js";




//user api
router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.get("/logout", UserController.logout);
router.post("/change-password", authenticateUser, UserController.changePassword);
// patient api
router.post("/save-profile", authenticateUser, isRole('user'), upload.single('image'), PatientController.saveUserProfile);
router.get("/fetch-profile", authenticateUser, isRole('user'), PatientController.fetchUserProfile);


// hospital api
router.post("/assign-hospital",
    authenticateUser,
    isRole("admin"),
    upload.single('image'),
    HospitalController.assignHospital);

router.get("/hospital-list", HospitalController.hospitalList);
router.get("/search-hospital", HospitalController.searchHospital);

router.put("/update-hospital/:id",
    authenticateUser,
    isRole("admin"),
    upload.single('image'),
    HospitalController.updateHospitalInfo);

router.delete("/delete-hospital/:id", authenticateUser, isRole('admin'), HospitalController.deleteHospitalInfo);

//contact api
router.post("/create-contact", ContactController.contact);
router.get("/contact-list", authenticateUser, isRole('admin'), ContactController.contactList);

//Specialty api
router.post("/create-specialty",
    authenticateUser,
    isRole('admin'),
    upload.single('image'),
    SpecialtyController.assignSpecialty);

router.get("/specialities", SpecialtyController.specialtiesList);
router.put("/update-specialty/:id",
    authenticateUser,
    isRole('admin'),
    upload.single('image'), SpecialtyController.updateSpecialty);
router.delete("/delete-specialty/:id",
    authenticateUser,
    isRole('admin'),
    SpecialtyController.deleteSpecialty);

// review api
router.post("/post-review/:doctorID", authenticateUser, isRole('user'), ReviewController.postReview)
router.get("/fetch-reviews", ReviewController.fetchReviews)


// doctor api
router.post("/save-doctor-profile", authenticateUser, isRole('doctor'), upload.single('image'), DoctorController.saveProfile)
router.get("/fetch-doctor-profile", authenticateUser, isRole('doctor'), DoctorController.fetchProfile)
router.get("/view-doctor-profile/:doctorID", DoctorController.viewProfile)
router.get("/fetch-doctor-list/:specialityID", DoctorController.fetchDoctorList)
router.get("/search-doctor", DoctorController.searchDoctor)


// appointment api
router.post("/book-appointment/:doctorID", authenticateUser, isRole('user'), AppointmentController.bookAppointment)
router.get("/get-user-appointments", authenticateUser, isRole('user'), AppointmentController.getUserAppointments)
router.get("/get-doctor-appointments", authenticateUser, isRole('doctor'), AppointmentController.getDoctorAppointments)
router.put("/update-appointment-status", authenticateUser, isRole('doctor'), AppointmentController.updateAppointmentStatus)
router.delete("/cancel-appointment/:appointmentID", authenticateUser, AppointmentController.cancelAppointment)

// blog api
router.post("/create-blog", authenticateUser, isRole(['doctor', 'admin']), upload.single('image'), BlogController.createBlog)
router.get("/fetch-blogs",  BlogController.fetchBlogs)
router.get("/fetch-blogs-by-category/:category",  BlogController.fetchBlogsByCategory)
router.get("/read-blog/:blogID",  BlogController.readBlog)
router.put("/update-blog/:blogID", upload.single('image'), BlogController.updateBlog)
router.delete("/delete-blog/:blogID", authenticateUser, isRole(['doctor', 'admin']), BlogController.deleteBlog)









export default router;