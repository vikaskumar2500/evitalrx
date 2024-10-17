import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import bodyParser, { json } from "body-parser";
import cors from "cors";
import authRoutes from "./rotues/auth.routes";
import connectDB from "./lib/db";
dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

connectDB()
  .then(() => {
    console.log("database is connected");
  })
  .catch((e) => {
    console.log("Failed to connect database");
  });
app.use("/api/auth", authRoutes);

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
