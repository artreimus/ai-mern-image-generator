import { Configuration, OpenAIApi } from 'openai';
import asyncHandler from 'express-async-handler';
import { BadRequestError } from '../errors/index.js';

// @desc Generate an image using AI
// @route /api/v1/dalle
// @access public
const createImage = asyncHandler(async (req, res) => {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const openai = new OpenAIApi(configuration);

  const { prompt } = req.body;

  if (!prompt) {
    throw new BadRequestError('Please provide all fields');
  }

  const aiResponse = await openai.createImage({
    prompt,
    n: 1,
    size: '1024x1024',
    response_format: 'b64_json',
  });

  if (!aiResponse) {
    throw new BadRequestError(
      'An error was encountered while generating the image'
    );
  }

  const image = aiResponse?.data?.data[0].b64_json;

  res.status(200).json({ photo: image });
});

export { createImage };
