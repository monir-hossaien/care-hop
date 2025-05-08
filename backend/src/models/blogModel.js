import mongoose from "mongoose";

const dataSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Blog title is required"],
            trim: true,
            unique: true,
            minLength: [10, "Title must be at least 10 characters"],
            maxLength: [100, "Title must be under 50 characters"]
        },
        shortDes: {
            type: String,
            required: [true, "Short description is required"],
            trim: true,
            minLength: [30, "Short description must be at least 30 characters"],
            maxLength: [300, "Short description must be under 300 characters"],
        },
        content: {
            type: String,
            required: [true, "Content is required"],
            trim: true,
            minLength: [100, "Content must be at least 100 characters"],
            maxLength: [5000, "Content must be under 5000 characters"],
        },
        image: {
            type: String,
            default: ''
        },
        userID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", // could be Admin or Doctor
            required: true,
        },
        category: {
            type: String,
            enum: ["Health Tips", "Diseases", "Medicine", "Nutrition", "News"],
            required: true,
        },
        views: {
            type: Number,
            default: 0,
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

const Blog = mongoose.model("Blog", dataSchema);
export default Blog;
