import { Request, Response } from "express";
import { User } from "../models/user.model";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { isEmail } from "../lib/isEmail";

const storeAccessToken = (userId: string, res: Response) => {
  const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn: 24 * 60 * 60, // 1d
  });

  res.cookie("accessToken", accessToken, {
    maxAge: 24 * 60 * 60 * 1000, // 1d
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
};
const getHashedPassword = async (password: string) =>
  await bcrypt.hash(password, 12);

export const signup = async (req: Request, res: Response) => {
  const data = req.body;
  try {
    // check existing user
    const existUser = await User.findOne({
      $or: [{ email: data.email }, { mobile: data.mobile }],
    });
    if (existUser) {
      res.status(401).json({ message: "User already exists" });
      return;
    }

    // hash password
    const hashPassword = await getHashedPassword(data.password);
    const newUser = await User.create({ ...data, password: hashPassword });

    // save the accessToken to cookies
    storeAccessToken(newUser._id.toString(), res);

    res.status(201).json(newUser);
  } catch (e: any) {
    console.log("Error in signup controller", e.message);
    res.status(500).json({ error: e.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { credential, password } = req.body;
    let user = await User.findOne(
      isEmail(credential) ? { email: credential } : { mobile: credential }
    ).lean();

    if (!user) {
      res.status(401).json({ message: "User does not found" });
      return;
    }
    const isPasswordMathched = await bcrypt.compare(password, user.password);
    // console.log("isPassword matched", isPasswordMathched);
    if (!isPasswordMathched) {
      res.status(500).json({ message: "Invalid Email / Mobile or Password" });
      return;
    }
    storeAccessToken(user._id.toString(), res); // store the accesToken to the cookies
    res.status(200).json(user);
  } catch (e: any) {
    console.log("Error in login controller", e.message);
    res.status(500).json({
      message: "Login failed, please try again later",
      error: e.message,
    });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie("accessToken");
    res.status(200).json({ message: "Logged out successfully" });
  } catch (e: any) {
    res.status(500).json({ message: "Network Error", error: e.message });
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { credential, password: newPassword } = req.body;
    const hashPassword = await getHashedPassword(newPassword);

    let updatedUser = await User.updateOne(
      isEmail(credential) ? { email: credential } : { mobile: credential },
      { password: hashPassword }
    ).lean();

    if (!updatedUser) {
      res.status(500).json({ message: "Failed to forgot your password" });
    }
    res.status(200).json({ message: "Successfully updated your password" });
  } catch (e: any) {
    console.log("Error in forgot password controller", e.message);
    res.status(500).json({
      message: "Failed to forgot password, please try again later",
      error: e.message,
    });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { credential, password, newPassword } = req.body;

    const user = await User.findOne(
      isEmail(credential) ? { email: credential } : { mobile: credential }
    );
    if (!user) {
      res.status(401).json({ message: "Unauthorized user" });
      return;
    }
    const isPasswordMathched = await bcrypt.compare(password, user.password);
    if (!isPasswordMathched) {
      res.status(500).json({ message: "Original password does not matched" });
      return;
    }
    const hashNewPassword = await getHashedPassword(newPassword);
    const updatedUser = await User.updateOne(
      isEmail(credential) ? { email: credential } : { mobile: credential },
      { password: hashNewPassword }
    ).lean();

    if (!updatedUser) {
      res.status(500).json({ message: "Failed to reset your password" });
    }
    res.status(200).json({ message: "Successfully updated your password" });
  } catch (e: any) {
    console.log("Error in reset password controller", e.message);
    res.status(500).json({
      message: "Failed to reset your password, please try again later",
    });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const updatedProfile = await User.updateOne(data, {
      email: data.email,
      mobile: data.mobile,
    });
    if (!updatedProfile) throw new Error("Failed to update your profile");

    res.status(200).json(updatedProfile);
  } catch (e: any) {
    console.log("Error in update profile controller", e.messgae);
    res.status(500).json({ message: e.message });
  }
};
