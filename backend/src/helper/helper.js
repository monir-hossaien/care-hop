import { cloud_name, api_key, api_secret } from "../config/config.js";
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

// Configure Cloudinary
cloudinary.config({
    cloud_name: cloud_name,
    api_key: api_key,
    api_secret: api_secret
});


const storage = multer.diskStorage({
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + file.originalname;
        cb(null, uniqueSuffix)
    }
})

// File Filter Function (Only Allows Specific Image Formats)
const fileFilter = (req, file, cb) => {
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp'];

    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true); // Accept the file
    } else {
        cb(new Error('Only image files (JPEG, PNG, GIF, WEBP) are allowed!'), false); // Reject file
    }
};

// Multer Middleware (With Storage & File Filter)
export const upload = multer({ storage, fileFilter });

//file upload to cloudinary
export const fileUpload = async (imageURL, folder)=>{
    try {
        let res = await cloudinary.uploader.upload(imageURL, {folder: folder});
        return res.secure_url;
    }catch(err){
        throw new Error("Image upload failed!");
    }
}

// Function to Delete Image from Cloudinary
export const deleteImage = async (publicId) => {
    try {
        const result = await cloudinary.uploader.destroy(publicId);
        if (result === "ok") {
            return { statusCode: 200, message: "Image deleted successfully" };
        } else {
            return {statusCode: 400, message: "Failed to delete image" }
        }
    } catch (error) {
        return {
            statusCode: 500,
            message: "Something went wrong!",
            error: error.message
        }
    }
};

//extract public ID from image url
export const getPublicID = (imageURL) => {
    return imageURL.split("/").slice(-3).join("/").split(".")[0];
};



