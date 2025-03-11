import mongoose from "mongoose";

const dataSchema = new mongoose.Schema(
    {
        patientId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        doctorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Doctor",
            required: true
        },
        date: {
            type: Date,
            required: true
        },
        timeSlot: {
            type: String,
            required: true
        },
        status: {
            type: String,
            enum: ["pending", "confirmed", "canceled"],
            default: "pending"
        },
    },
    { timestamps: true }
);

const Appointment = mongoose.model("appointment", dataSchema);

export default Appointment;
