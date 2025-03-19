import mongoose from 'mongoose'
import Appointment from "../models/appointmentModel.js";
import DoctorProfile from "../models/doctorProfileModel.js";
import UserProfile from "../models/userProfileModel.js";
import SendEmail from "../utility/email.js";
const objectId = mongoose.Types.ObjectId

// book Appointment
export const bookAppointmentService = async (req) => {
    try {
        const {day, timeSlot} = req.body;
        const patientID = new objectId(req.headers.id)
        const doctorID = new objectId(req.params.doctorID)

        const existingAppointment = await Appointment.findOne({patientID})
        if (existingAppointment) {
            return {
                statusCode: 400,
                status: false,
                message: "Your appointment has been booked"
            };
        }
        const newAppointment = {
            patientID,
            doctorID,
            timeSlot,
            day
        }
        const result = await Appointment.create(newAppointment);

        // Fetch doctor and patient details
        const doctor = await DoctorProfile.aggregate([
            {$match: {userID: doctorID}},
            {
                $lookup: {
                    from: "users",
                    localField: "userID",
                    foreignField: "_id",
                    as: "doctorDetails",
                }
            },
            {$unwind: "$doctorDetails"},
            {
                $project: {
                    name: 1,
                    'doctorDetails.email': 1,
                }
            }
        ]);
        const patient = await UserProfile.aggregate([
            {$match: {userID: patientID}},
            {
                $lookup: {
                    from: "users",
                    localField: "userID",
                    foreignField: "_id",
                    as: "patientDetails",
                }
            },
            {$unwind: "$patientDetails"},
            {
                $project: {
                    name: 1,
                    'patientDetails.email': 1,
                }
            }
        ]);

        // Prepare email & SMS content
        const emailSubject = "Appointment Confirmation";
        const emailMessage = `Dear ${patient[0]['name']}, Your appointment with Dr. ${doctor[0]['name']} is booked for ${day} at ${timeSlot}.Thank you!`;
        const doctorEmailMessage = `Dear ${doctor[0]['name']}, You have a new appointment with ${patient[0]['name']} on ${day} at ${timeSlot}.Please confirm it.`;

        // Send email notifications asynchronously
        await SendEmail(doctor[0]['doctorDetails'].email, emailSubject, doctorEmailMessage);
        await SendEmail(patient[0]['patientDetails'].email, emailSubject, emailMessage);

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
                as: "doctorDetails",
            }
        }
        const projection = {
            $project: {
                day: 1,
                timeSlot: 1,
                status: 1,
                "doctorDetails.name": 1,
                "doctorDetails.designation": 1
            }
        }
        const result = await Appointment.aggregate([
            matchStage,
            joinWithDoctorProfile,
            {$unwind: "$doctorDetails"},
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
                from: "userprofiles",
                localField: "patientID",
                foreignField: "userID",
                as: "patientDetails",
            }
        }
        const projection = {
            $project: {
                day: 1,
                timeSlot: 1,
                status: 1,
                "patientDetails.name": 1
            }
        }

        const result = await Appointment.aggregate([
            matchStage,
            joinWithPatientProfile,
            {$unwind: "$patientDetails"},
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
        const doctorID = new objectId(req.headers.id);
        // const appointmentID = new objectId(req.params.id);
        const result = await Appointment.findOne({doctorID});
        if (!result) {
            return {
                statusCode: 404,
                status: false,
                message: "Appointment not found"
            };
        }
        await Appointment.updateOne({doctorID}, {$set: {status}}, {new: true});
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