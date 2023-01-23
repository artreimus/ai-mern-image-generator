import Post from '../models/post.js';
import asyncHandler from 'express-async-handler';
import { v2 as cloudinary } from 'cloudinary';
import { BadRequestError } from '../errors/index.js';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// @desc Get all posts
// @route /api/v1/posts
// @access public
const getAllPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({});
  res.status(200).json({ success: true, data: posts });
});

// @desc Create a post containing the generated AI image
// @route /api/v1/posts
// @access public
const createPost = asyncHandler(async (req, res) => {
  const { name, prompt, photo } = req.body;

  if (!name || !prompt || !photo) {
    throw new BadRequestError('Please provide all fields');
  }

  const photoUrl = await cloudinary.uploader.upload(photo, {
    timeout: 180000,
    use_filename: false,
    public_id: `${Math.random().toString(36).substring(2, 7)}`,
    folder: `ai-mern-image-generator`,
  });

  if (!photoUrl) {
    throw new BadRequestError(
      'An error was encountered while saving the image'
    );
  }

  const newPost = await Post.create({
    name,
    prompt,
    photo: photoUrl.url,
  });

  if (!newPost) {
    throw new BadRequestError('An error was encountered while saving the post');
  }

  res.status(201).json({ success: true, data: newPost });
});

export { getAllPosts, createPost };
