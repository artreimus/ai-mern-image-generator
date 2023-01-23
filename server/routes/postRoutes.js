import express from 'express';
import { getAllPosts, createPost } from '../controllers/postController.js';
import { v2 as cloudinary } from 'cloudinary';
import * as dotenv from 'dotenv';

dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_CLOUD_API_KEY,
  api_secret: process.env.CLOUDINARY_CLOUD_API_SECRET,
});

const router = express.Router();

router.get('/', getAllPosts);
router.post('/', createPost);

export default router;
