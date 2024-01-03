import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import userRoutes from "./routes/users";
import authRoutes from "./routes/auth";
import cookieParser from "cookie-parser";

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);

const app = express(); // tạo 1 app express mới cho dự án
app.use(cookieParser());
app.use(express.json()); // chuyển đổi nội dùng của API thành JSON
app.use(express.urlencoded({ extended: true }));
app.use(
    cors({
        origin: process.env.FRONTEND_URL,
        credentials: true,
    })
);

// app.get("/api/test", async (req: Request, res: Response) => {
//     res.json({ message: "Hello from Express endpoint!!!"})
// });
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.listen(7000, () => {
    console.log("Server running on localhost 7000");
});
