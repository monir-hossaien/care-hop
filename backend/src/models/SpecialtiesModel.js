
import mongoose from 'mongoose';

const dataSchema = new mongoose.Schema(
  {
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: [true, "Description is required"],
        trim: true,
        minLength: [10, "Description must be at least 30 characters"],
        maxLength: [300, "Description must be under 300 characters"],
    },
    image :{
        type: String,
        default: ''
    }
  },
    {
        timestamps: true,
        versionKey: false,
    }
);

const Specialties = mongoose.model("specialties", dataSchema);

export default Specialties;
