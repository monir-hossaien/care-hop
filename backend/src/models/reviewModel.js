
import mongoose  from 'mongoose';

const dataSchema = new mongoose.Schema(
  {
    rating: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    doctorID :{
        type: mongoose.Types.ObjectId,
        ref: 'doctor',
        required: true
    }
  },{
        timestamps: true,
        versionKey: false,
    }
);

const Review = mongoose.model("review", dataSchema);

export default Review;
