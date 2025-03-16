
import { mongoose } from 'mongoose';

const dataSchema = new mongoose.Schema(
  {
    name: {
        type: String,
        required: true
    },
    email: {
        type: String, 
        required: true, 
        unique: true 
    },
    password: {
        type: String, 
        required: true 
    },
    role: {
        type: String,
        enum: ["doctor", "patient", "admin"],
        required: true
    },
    phone: {
        type: String, 
        required: true 
    },
    gender: { 
        type: String, 
        enum: ["male", "female", "other"], 
        required: true 
    },
    profileImage: {
        type: String 
    },
  },
  {
      timestamps: true,
      versionKey: false,
  }
);

const User = mongoose.model("user", dataSchema);

export default User;
