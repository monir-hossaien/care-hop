
import mongoose from 'mongoose';

const dataSchema = new mongoose.Schema(
  {
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image :{
        type: String
    }
  },
  { timestamps: true }
);

const Specialty = mongoose.model("specialties", dataSchema);

export default Specialty;
