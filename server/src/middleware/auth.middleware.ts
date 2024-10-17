import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model";

interface ProtectRequest extends Request {
  user?: any;
}
export const protectRoute = async (
  req: ProtectRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
      res
        .status(401)
        .json({ message: "Unauthorized - No access token provided" });
      return;
    }
    try {
      const decodeToken = jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET!
      ) as { userId: string };
      const user = await User.findById(decodeToken.userId);
      if (!user) {
        res.status(401).json({ message: "User not found" });
        return;
      }

      req.user = user;
      next();
    } catch (e: any) {
      if (e.name === "TokenExpiredError") {
        res
          .status(401)
          .json({ message: "Unauthorized - Access token expired" });
        return;
      }
      throw e;
    }
  } catch (e: any) {
    console.log("Error message from ProtectRoute", e.message);
    res.status(401).json({ message: "Unauthorized - Invalid access token" });
  }
};
