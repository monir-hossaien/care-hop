
import mongoose  from 'mongoose';

const dataSchema = new mongoose.Schema(
    {
        message: {
            type: String,
            required: true
        },
        type: {
            type: String,
            enum: ["email", "sms"],
            required: true
        },
        status: {
            type: String,
            enum: ["sent", "pending"],
            default: "pending"
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    },{
        timestamps: true,
        versionKey: false,
    }
);

const Notification = mongoose.model("notification", dataSchema);

export default Notification;
