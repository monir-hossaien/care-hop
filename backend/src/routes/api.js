import express from "express";
const router = express.Router();
import * as UserController from "../controllers/userController.js";
import * as HospitalController from "../controllers/hospitalController.js";
import * as ContactController from "../controllers/contactController.js";
import * as SpecialtyController from "../controllers/specialtiesController.js";
import {upload} from "../helper/helper.js";
import {authenticateUser, isRole} from "../middleware/auth.js";


//user api
router.post("/register", upload.single('profileImage'), UserController.register);
router.post("/login", UserController.login);
router.get("/logout", UserController.logout);

// hospital api
router.post("/assign-hospital",
    authenticateUser,
    isRole("admin"),
    upload.single('image'),
    HospitalController.assignHospital);

router.get("/hospital-list", authenticateUser, HospitalController.hospitalList);

router.post("/update-hospital/:id",
    authenticateUser,
    isRole("admin"),
    upload.single('image'),
    HospitalController.updateHospitalInfo);

router.delete("/delete-hospital/:id", authenticateUser, isRole('admin'), HospitalController.deleteHospitalInfo);

//contact api
router.post("/create-contact", ContactController.contact);
router.get("/contact-list", authenticateUser, isRole('admin'), ContactController.contactList);

//create Specialty
router.post("/create-specialty",
    authenticateUser,
    isRole('admin'),
    upload.single('image'),
    SpecialtyController.assignSpecialties);














export default router;