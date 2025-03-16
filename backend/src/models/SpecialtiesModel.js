
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
        required: true
    },
    image :{
        type: String
    }
  },
    {
        timestamps: true,
        versionKey: false,
    }
);

const Specialties = mongoose.model("specialties", dataSchema);

export default Specialties;
