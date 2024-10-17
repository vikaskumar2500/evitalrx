import express from "express";
import {
  forgotPassword,
  login,
  logout,
  resetPassword,
  signup,
  updateProfile,
} from "../controllers/auth.controllers";
import { protectRoute } from "../middleware/auth.middleware";
const router = express.Router();

router.post("/login", login);
router.post("/signup", signup);
router.get("/logout", logout);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", protectRoute, resetPassword);
router.patch("/update-profile", protectRoute, updateProfile);

export default router;
