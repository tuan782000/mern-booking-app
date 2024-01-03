import express, { Request, Response, response } from "express";
import { check, validationResult } from "express-validator";
import User from "../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();
router.post(
    "/login",
    [
        check("email", "Email is required").isEmail(),
        check(
            "password",
            "Password with 6 or more characters required"
        ).isLength({
            min: 6,
        }),
    ],
    async (req: Request, res: Response) => {
        // dùng hàm validationResult của express-validator kiểm tra từ req
        const errors = validationResult(req);
        // Nếu errors có tồn tại thì return bad request
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array() });
        }
        // sử dụng cú pháp destructuring để lấy ra email và password từ req.body gán vào biến email và password
        const { email, password } = req.body;

        try {
            // Tìm nạp người dùng vào trong biến user
            const user = await User.findOne({ email });
            // kiểm tra user đó có tồn tại hay không
            if (!user) {
                return response
                    .status(400)
                    .json({ message: "Invalids Credentials" });
            }
            // so sánh cái password gửi lên với password trong DB
            // vì đã thông qua bcrypt nên cần phải dịch ngược ra để sao sánh 2 cái
            // password: Là mật khẩu được người dùng gửi lên (chưa được hash).
            // user.password: Là mật khẩu đã được hash và lưu trữ trong cơ sở dữ liệu.
            // quá trình dịch mật khẩu đã được mã hóa được tích hợp sẵn trong hàm compare
            // Lý do lỗi không ghi rõ ràng tránh hacker có thể truy tìm dấu vếch
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return response
                    .status(400)
                    .json({ message: "Invalids Credentials" });
            }
            // Tạo ra (đăng ký) token hạn sử dụng là 1 ngày
            const token = jwt.sign(
                { userId: user.id },
                process.env.JWT_SECRET_KEY as string,
                {
                    expiresIn: "1d",
                }
            );

            // sau khi có token mình sẽ lưu vào cookie
            res.cookie("auth_token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                maxAge: 86400000, // dựa và cái expresIn: '1d' 1 ngày 86400000 mili giây
            });

            // key: value
            res.status(200).json({ userId: user._id });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Something went wrong" });
        }
    }
);

export default router;
