import dotenv from "dotenv";
import cloudinaryModule from "cloudinary";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../.env") });
const cloudinary = cloudinaryModule.v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;