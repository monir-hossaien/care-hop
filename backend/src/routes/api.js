import express from "express";

const router = express.Router();

import * as UserController from "../controllers/userController.js";
import * as HospitalController from "../controllers/hospitalController.js";
import * as ContactController from "../controllers/contactController.js";
import * as SpecialtyController from "../controllers/specialtiesController.js";
import * as ReviewController from "../controllers/reviewController.js";
import * as DoctorController from "../controllers/doctorController.js";
import * as AppointmentController from "../controllers/appointmentController.js";
import * as BlogController from "../controllers/blogController.js";
import * as AdminController from "../controllers/adminController.js";

import {upload} from "../helper/helper.js";
import {authenticateUser, isRole} from "../middleware/auth.js";


//user api
router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.post("/refresh-token", UserController.refreshToken);
router.get("/logout", UserController.logout);
router.get("/auth", authenticateUser, UserController.fetchRole);
router.post("/send-doctor-request", authenticateUser, isRole('user'), upload.single('image'), UserController.doctorProfileRequest);
router.post("/change-password", authenticateUser, UserController.changePassword);
router.post("/save-profile", authenticateUser, upload.single('image'), UserController.saveUserProfile);
router.get("/fetch-user-profile", authenticateUser, UserController.fetchUserProfile);
router.get("/fetch-user-list", authenticateUser, isRole('admin'), UserController.fetchUserList);
router.get("/fetch-user-list", authenticateUser, isRole('admin'), UserController.fetchUserList);
router.delete("/delete-user/:userID", authenticateUser, isRole('admin'), UserController.deleteUser);

// hospital api
router.post("/assign-hospital",
    authenticateUser,
    isRole("admin"),
    upload.single('image'),
    HospitalController.assignHospital);

router.get("/fetch-hospital-details/:id", authenticateUser, isRole('admin'), HospitalController.fetchHospitalDetails);
router.get("/hospital-list", HospitalController.fetchHospitalList);
router.get("/search-hospital", HospitalController.searchHospital);

router.put("/update-hospital/:id",
    authenticateUser,
    isRole("admin"),
    upload.single('image'),
    HospitalController.updateHospitalInfo);

router.delete("/delete-hospital/:id", authenticateUser, isRole('admin'), HospitalController.deleteHospitalInfo);

//contact api
router.post("/create-contact", ContactController.contact);
router.get("/message-list", authenticateUser, isRole('admin'), ContactController.messageList);
router.delete("/delete-message/:id", authenticateUser, isRole('admin'), ContactController.deleteMessage);

//Specialty api
router.post("/create-specialty",
    authenticateUser,
    isRole('admin'),
    upload.single('image'),
    SpecialtyController.assignSpecialty);

router.get("/specialities", SpecialtyController.specialtiesList);
router.get("/read-specialty/:id", authenticateUser, isRole('admin'), SpecialtyController.readSpecialty);
router.put("/update-specialty/:id", authenticateUser, isRole('admin'), upload.single('image'), SpecialtyController.updateSpecialty);
router.delete("/delete-specialty/:id", authenticateUser, isRole('admin'), SpecialtyController.deleteSpecialty);

// review api
router.post("/post-review/:doctorID", authenticateUser, isRole('user'), ReviewController.postReview)
router.get("/fetch-reviews", ReviewController.fetchReviews)


// doctor api
router.put("/update-doctor-profile", authenticateUser, isRole('doctor'), upload.single('image'), DoctorController.updateDoctorProfile)
router.get("/fetch-doctor-profile", authenticateUser, isRole('doctor'), DoctorController.fetchDoctorProfile)
// router.get("/view-doctor-profile/:doctorID", DoctorController.viewProfile)
router.get("/fetch-doctors-by-specialty/:specialityID", DoctorController.fetchDoctorsBySpecialty)
router.get("/search-doctor", DoctorController.searchDoctor)


// appointment api
router.post("/book-appointment/:doctorID", authenticateUser, AppointmentController.bookAppointment)
router.get("/get-user-appointments", authenticateUser, isRole('user'), AppointmentController.getUserAppointments)
router.get("/get-doctor-appointments", authenticateUser, isRole('doctor'), AppointmentController.getDoctorAppointments)
router.put("/update-appointment-status/:id", authenticateUser, isRole('doctor'), AppointmentController.updateAppointmentStatus)
router.delete("/cancel-appointment/:appointmentID", authenticateUser, isRole('user'), AppointmentController.cancelAppointment)

// blog api
router.post("/create-blog", authenticateUser, isRole(['doctor', 'admin']), upload.single('image'), BlogController.createBlog)
router.get("/fetch-blogs", BlogController.fetchBlogs)
router.get("/fetch-blogs-by-category/:category", BlogController.fetchBlogsByCategory)
router.get("/read-blog/:blogID", BlogController.readBlog)
router.patch("/update-blog/view/:blogID", BlogController.viewIncrement)
router.put("/update-blog/:blogID", authenticateUser, isRole(['doctor', 'admin']), upload.single('image'), BlogController.updateBlog)
router.delete("/delete-blog/:blogID", authenticateUser, isRole(['doctor', 'admin']), BlogController.deleteBlog)
router.get("/fetch-doctor-blog", authenticateUser, isRole('doctor'), BlogController.fetchDoctorBlog)


// admin api
router.put("/verify-doctor-request/:doctorID", authenticateUser, isRole('admin'), AdminController.verifyDoctorRequest)
router.get("/fetch-doctor-list", authenticateUser, isRole('admin'), AdminController.fetchDoctorList)
router.delete("/delete-doctor/:doctorID", authenticateUser, isRole('admin'), AdminController.deleteDoctor)
router.get("/doctor-count", authenticateUser, isRole('admin'), AdminController.doctorCount)
router.get("/doctor-request-count", authenticateUser, isRole('admin'), AdminController.doctorRequestCount)
router.get("/user-count", authenticateUser, isRole('admin'), AdminController.userCount)
router.get("/blog-count", authenticateUser, isRole('admin'), AdminController.blogCount)
router.get("/hospital-count", authenticateUser, isRole('admin'), AdminController.hospitalCount)
router.get("/specialties-count", authenticateUser, isRole('admin'), AdminController.specialitiesCount)
router.get("/message-count", authenticateUser, isRole('admin'), AdminController.messageCount)




export default router;