import mongoose from 'mongoose'
import Appointment from "../models/appointmentModel.js";
import DoctorProfile from "../models/doctorProfileModel.js";
import SendEmail from "../utility/email.js";
import User from "../models/userModel.js";
import Profile from "../models/profileModel.js";
const objectId = mongoose.Types.ObjectId

// book Appointment
export const bookAppointmentService = async (req) => {
    try {
        const {day, timeSlot} = req.body;
        const patientID = new objectId(req.headers.id)
        const doctorID = new objectId(req.params.doctorID)

        const existingAppointment = await Appointment.findOne({patientID, doctorID, day, timeSlot})
        if (existingAppointment) {
            return {
                statusCode: 400,
                status: false,
                message: "Your appointment has been booked"
            };
        }

        const isProfile = await Profile.findOne({userID: patientID})
        if (!isProfile) {
            return {
                statusCode: 400,
                status: false,
                message: "Please fill your profile details to book appointment"
            };
        }

        // Fetch doctor and patient details
        const doctor = await DoctorProfile.aggregate([
            {$match: {userID: doctorID}},

            //join with user collection
            {
                $lookup: {
                    from: "users",
                    localField: "userID",
                    foreignField: "_id",
                    as: "user",
                }
            },
            {$unwind: { path : "$user", preserveNullAndEmptyArrays: true }},

            // join with hospital collection
            {
                $lookup: {
                    from: "hospitals",
                    localField: "hospitalID",
                    foreignField: "_id",
                    as: "hospital",
                }
            },
            {$unwind: { path : "$hospital", preserveNullAndEmptyArrays: true }},
            {
                $project: {
                    name: 1,
                    "user.email": 1,
                    "hospital.name": 1,
                    "hospital.area": 1,
                }
            }
        ]);
        if(!doctor || doctor.length === 0){
            return {
                statusCode: 404,
                status: false,
                message: "Doctor not found"
            }
        }

        const patient = await User.aggregate([
            {$match: {_id: patientID}},

            // join with user profiles collection
            {
                $lookup: {
                    from: "profiles",
                    localField: "_id",
                    foreignField: "userID",
                    as: "profile",
                }
            },
            {$unwind: { path : "$profile", preserveNullAndEmptyArrays: true }},
            {
                $project: {
                    email: 1,
                    "profile.name": 1
                }
            }
        ]);
        if(!patient || patient.length === 0){
            return {
                statusCode: 404,
                status: false,
                message: "Patient not found"
            }
        }

        const DoctorEmailSubject = "Appointment Request";
        const doctorEmailMessage = `Dear ${doctor[0]?.name}, You have a new appointment with ${patient[0]?.profile?.name} on ${day} at ${timeSlot}. Location ${doctor[0]?.hospital?.name}, ${doctor[0]?.hospital?.area}.Please confirm it.`;

        // Send email notifications asynchronously
        await SendEmail(doctor[0]?.user?.email, DoctorEmailSubject, doctorEmailMessage);

        const newAppointment = {
            patientID,
            doctorID,
            timeSlot,
            day
        }

        const result = await Appointment.create(newAppointment);

        return {
            statusCode: 201,
            status: true,
            message: "Appointment booked successfully",
            data: result
        };
    } catch (e) {
        return {
            statusCode: 500,
            status: false,
            message: "Something went wrong!",
            error: e.message
        };
    }
};

// get appointments for specific user
export const getUserAppointmentsService = async (req) => {
    try {
        const patientID = new objectId(req.headers.id)
        const matchStage = {
            $match:{patientID: patientID},
        }
        // join with doctorProfile collection
        const joinWithDoctorProfile = {
            $lookup:{
                from: "doctorprofiles",
                localField: "doctorID",
                foreignField: "userID",
                as: "doctor",
            }
        }
        const projection = {
            $project: {
                _id: 1,
                day: 1,
                timeSlot: 1,
                status: 1,
                createdAt: 1,
                "doctor.name": 1,
                "doctor.designation": 1
            }
        }
        const result = await Appointment.aggregate([
            matchStage,
            joinWithDoctorProfile,
            {$unwind: {path: "$doctor", preserveNullAndEmptyArrays: true}},
            projection
        ]);
        if (!result) {
            return {
                statusCode: 400,
                status: false,
                message: "Request failed"
            };
        }

        return {
            statusCode: 200,
            status: true,
            message: "Request success",
            data: result
        };
    } catch (e) {
        return {
            statusCode: 500,
            status: false,
            message: "Something went wrong!",
            error: e.message
        };
    }
};

// get appointments for specific doctor
export const getDoctorAppointmentsService = async (req) => {
    try {
        const doctorID = new objectId(req.headers.id);
        const matchStage = {
            $match:{doctorID: doctorID},
        }
        // join with patient Profile collection
        const joinWithPatientProfile = {
            $lookup:{
                from: "profiles",
                localField: "patientID",
                foreignField: "userID",
                as: "patient",
            }
        }
        const projection = {
            $project: {
                _id: 1,
                day: 1,
                timeSlot: 1,
                status: 1,
                createdAt: 1,
                "patient.name": 1
            }
        }

        const result = await Appointment.aggregate([
            matchStage,
            joinWithPatientProfile,
            {$unwind: {path: "$patient", preserveNullAndEmptyArrays: true}},
            projection
        ])
        if (!result) {
            return {
                statusCode: 400,
                status: false,
                message: "Request failed"
            };
        }
        return {
            statusCode: 200,
            status: true,
            message: "Request success",
            data: result
        };
    } catch (e) {
        return {
            statusCode: 500,
            status: false,
            message: "Something went wrong!",
            error: e.message
        };
    }
};


// updateAppointmentStatus for doctor
export const updateAppointmentStatusService = async (req) => {
    try {
        const {status} = req.body;
        if (!["Pending", "Confirmed", "Canceled"].includes(status)) {
            return {
                statusCode: 400,
                status: false,
                message: "Invalid status value"
            };
        }
        const doctorID = new objectId(req.headers.id);
        const appointmentID = new objectId(req.params.id);

        await Appointment.updateOne({doctorID, _id: appointmentID}, {$set: {status}}, {new: true});

        const appointment = await Appointment.findOne({_id: appointmentID});
        if (!appointment) {
            return {
                statusCode: 404,
                status: false,
                message: "Appointment not found"
            };
        }

        // Fetch doctor and patient details
        const doctor = await DoctorProfile.aggregate([
            {$match: {userID: doctorID}},

            //join with user collection
            {
                $lookup: {
                    from: "users",
                    localField: "userID",
                    foreignField: "_id",
                    as: "user",
                }
            },
            {$unwind: { path : "$user", preserveNullAndEmptyArrays: true }},

            // join with hospital collection
            {
                $lookup: {
                    from: "hospitals",
                    localField: "hospitalID",
                    foreignField: "_id",
                    as: "hospital",
                }
            },
            {$unwind: { path : "$hospital", preserveNullAndEmptyArrays: true }},
            {
                $project: {
                    name: 1,
                    "user.email": 1,
                    "hospital.name": 1,
                    "hospital.area": 1,
                }
            }
        ]);
        if(!doctor || doctor.length === 0){
            return {
                statusCode: 404,
                status: false,
                message: "Doctor not found"
            }
        }

        const patient = await User.aggregate([
            {$match: {_id: appointment?.patientID}},

            // join with user profiles collection
            {
                $lookup: {
                    from: "profiles",
                    localField: "_id",
                    foreignField: "userID",
                    as: "profile",
                }
            },
            {$unwind: { path : "$profile", preserveNullAndEmptyArrays: true }},
            {
                $project: {
                    email: 1,
                    "profile.name": 1
                }
            }
        ]);
        if(!patient || patient.length === 0){
            return {
                statusCode: 404,
                status: false,
                message: "Patient not found"
            }
        }
        // Send email notifications asynchronously
        if (appointment.status === "Confirmed") {
            // Prepare email content
            const subject = "Appointment Confirmation";
            const message = `Dear ${patient[0]?.profile?.name},\n\nYour appointment with Dr. ${doctor[0]?.name} is confirmed for ${appointment?.day} at ${appointment?.timeSlot}.\n\nLocation: ${doctor[0]?.hospital?.name}, ${doctor[0]?.hospital?.area}.\n\nThank you!`;

            await SendEmail(patient[0]?.email, subject, message);

        } else if (appointment.status === "Canceled") {
            const subject = "Appointment Cancellation";
            const message = `Dear ${patient[0]?.profile?.name},\n\nYour appointment with Dr. ${doctor[0]?.name} has been canceled.\n\nPlease contact us if you have any questions.\n\nThank you.`;

            await SendEmail(patient[0]?.email, subject, message);

        } else {
            // Optional: Log unknown status
            console.warn(`Unhandled appointment status: ${appointment.status}`);
        }

        return {
            statusCode: 200,
            status: true,
            message: "Request success",
        };
    } catch (e) {
        return {
            statusCode: 500,
            status: false,
            message: "Something went wrong!",
            error: e.message
        };
    }
};


// cancel appointment for patient or doctor
export const cancelAppointmentService = async (req) => {
    try {
        const appointmentID = new objectId(req.params.appointmentID);
        const result = await Appointment.findOne({_id: appointmentID});
        if (!result) {
            return {
                statusCode: 404,
                status: false,
                message: "Appointment not found"
            };
        }
        await Appointment.deleteOne({_id: appointmentID});
        return {
            statusCode: 200,
            status: true,
            message: "Request success",
        };
    } catch (e) {
        return {
            statusCode: 500,
            status: false,
            message: "Something went wrong!",
            error: e.message
        };
    }
};