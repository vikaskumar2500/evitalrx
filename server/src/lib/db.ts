import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  if (mongoose.connection.readyState === 1) {
    return;
  }

  try {
    await mongoose.connect(process.env.DATABASE_URL!);
  } catch (error) {
    process.exit(1);
  }
};

export default connectDB;
