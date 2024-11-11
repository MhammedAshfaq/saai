import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

interface ProcessEnv {
    MONGOURL: string;
  }

export const databaseConnection = async () => {
  try {
    const mongoUrl: string = process.env.MONGOURL as string;
    await mongoose.connect(mongoUrl);
    console.log("Database Connected successfully");
  } catch (error: any) {
    console.log(`Database connection error ${error.message}`);
  }
};
