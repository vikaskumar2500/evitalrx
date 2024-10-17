// User Schema

import mongoose, { Schema } from "mongoose";

interface IUser {
  name: string;
  mobile: string;
  email: string;
  dob:string;
  gender: String;
  address: string;
  updatedAt?: Date;
  createdAt?: Date;
  isVerified: Boolean;
  password: string;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    dob:{
      type:String,
      required:true,
    },
    gender: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("users", userSchema);
