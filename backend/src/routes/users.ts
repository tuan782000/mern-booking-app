import express, { Request, Response } from "express";
import User from "../models/user";
import jwt from "jsonwebtoken";
import { check, validationResult } from "express-validator";

const router = express.Router();

// /api/users/register
router.post(
    "/register",
    [
        check("firstName", "First Name is required").isString(),
        check("lastName", "Last Name is required").isString(),
        check("email", "Email is required").isEmail(),
        check(
            "password",
            "Password with 6 or more characters rquired"
        ).isLength({ min: 6 }),
    ],
    async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array() });
        }
        // Thực hiện code bên trong try, nếu có lỗi gì xảy ra thì catch sẽ bắt lỗi
        try {
            // đang kiểm tra email của người dùng, bằng hàm findOne của mongoose, xem (req.body.email tại nơi người dùng gửi)
            let user = await User.findOne({
                email: req.body.email,
            });

            if (user) {
                return res.status(400).json({ message: "User already exists" });
            }

            user = new User(req.body);
            await user.save();

            const token = jwt.sign(
                { userId: user.id },
                process.env.JWT_SECRET_KEY as string,
                {
                    expiresIn: "1d",
                }
            );

            res.cookie("auth_token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                maxAge: 86400000, // dựa và cái expresIn: '1d' 1 ngày 86400000 mili giây
            });
            return res.sendStatus(200);
        } catch (error) {
            console.log(error);
            res.status(500).send({ message: "Something went wrong" });
        }
    }
);

export default router;
