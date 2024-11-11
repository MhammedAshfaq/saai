import mongoose from "mongoose";

// Define the Address Schema
const addressSchema = new mongoose.Schema({
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
  street: { type: String, required: true },
});

const userSchema = new mongoose.Schema({
  gender: { type: String, required: true },
  name: { type: String, required: true },
  address: { type: addressSchema, required: true }, // Nested Address schema
  email: { type: String, required: true, unique: true },
  age: { type: String, required: true },
  picture: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }, // Automatically set current date if not provided
});

export default mongoose.model("Users",userSchema)

