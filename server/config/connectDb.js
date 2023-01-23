import mongoose from 'mongoose';

const connectDB = async () => {
  mongoose.set('strictQuery', true);
  try {
    mongoose.connect(process.env.MONGO_URI);
  } catch (error) {
    console.error(error);
  }
};

export default connectDB;
