# Start Project
Backend Setup:

Tạo folder Backend:
+ cd Backend
+ npm init (cấu hình ban đầu cho file package.json)
+ chú ý dòng entry point: (index.js) ./src/index.ts
+ còn lại cứ nhấn enter

Cài đặt: npm i express cros dotenv mongodb mongoose
- Express: sẽ là khung API, hỗ trợ xử lý API trở nên dễ dàng hơn
- CORS: giúp bảo mật (api request)
- dotenv: cấu hình môi trường quan trọng 
- mongodb và mongoose: giúp giao tiếp với database

npm i @types/cors @types/express @types/node ts-node typescript nodemon --save-dev
- cors
- ...

Set up chạy dự án:
- Chú ý trong file package.json
```js
  "scripts": {
    "dev": "nodemon"
  },
```
Tạo thư mục src:
- tạo file index.ts

```js
import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";

const app = express(); // Tạo một ứng dụng Express mới và lưu vào biến app.
app.use(express.json()); // express.json(): Middleware để phân tích và chuyển đổi dữ liệu JSON trong các yêu cầu.
app.use(express.urlencoded({ extended: true })); // express.urlencoded({ extended: true }): Middleware để phân tích dữ liệu định dạng application/x-www-form-urlencoded.
app.use(cors()); // cors(): Middleware để xử lý CORS, cho phép hoặc từ chối các yêu cầu từ các nguồn khác nhau.

app.get("/api/test", async (req: Request, res: Response) => {
    res.json({ message: "Hello from Express endpoint!!!"})
});

// Xác định một endpoint có đường dẫn là "/api/test" với phương thức HTTP GET. Khi có yêu cầu đến địa chỉ này, hàm callback sẽ được gọi, và nó trả về một JSON chứa thông điệp "Hello from Express endpoint!!!".

app.listen(7000, () => {
    console.log("Server running on localhost 7000")
})

// Mở cổng 7000 để lắng nghe các yêu cầu đến server. Khi server đã sẵn sàng, một thông điệp được in ra console để thông báo rằng server đang chạy trên localhost cổng 7000.
```

Frontend setup:
- Cài dự án react bằng vite
- Cài TailwindCSS


Mongodb setup:
- Tạo tài khoản
- Tạo DB
- Tạo tài khoản DB
- Connect lấy (mongodb+srv://tuannt:<password>@cluster0.vqjgd.mongodb.net/?retryWrites=true&w=majority)

set up trong file .env
```txt
MONGODB_CONNECTION_STRING=mongodb+srv://tuannt:BaD2IoseKsFIrcDx@cluster0.vqjgd.mongodb.net/?retryWrites=true&w=majority 
```

Xây dựng giao diện
- Build Componets (Header Hero Footer)
- Build Layouts
- Tiến hành import từng cái components vào layout
- Layout là child của App.

Thực hiện truyền props từ App xuống Layout

Xây dựng giao diện và tính năng Register.

Logic Register:

Form -- gủi dữ liệu (POST/auth/register) -> Tiến hành nhận password chuyển đổi bâm nhỏ với (Passoword Encrypted). Sau đó lưu lại dữ liệu đó vào trong Database. -> Cuối cùng trả về Http Cookie với JWT cho trình duyệt

JWT: JSON WEB TOKEN trả lại cho trình duyệt cùng với cookie http

Đoạn mã JWT chứng minh là người dùng đó đã xác thực với hệ thống và thường lưu trữ trên trình duyệt.

Khi người dùng thực hiện 1 tác vụ yêu cầu nào đó với các API có sự hạn chế quyền truy cập (JWT token sẽ phát huy tác dụng) ví dụ: thêm xem xóa sửa

Xây dựng User Registration API
- models
  + user.ts (đại diện cho thực thể người dùng)
  + định nghĩa type cho thực thể (vì đang TS code). Và đây cũng sẽ là các thông tin của 1 User
  + Tạo UserSchema (Schema xác định những thuộc tính được lưu trữ dựa trên user)
- routes
  + /api/users/register
  + các dòng check sẽ là thư viện validate của express giúp kiểm tra dữ liệu, đoạn này const errors = validationResult(req); là các lỗi sẽ được lưu vào biến errors. Nếu có tồn tại errors nó sẽ chạy dòng if (!errors.isEmpty()) trả về 1 bad request, kèm theo đối tượng chứa message và mảng danh sách các lỗi
  + Trước khi đăng ký phải trải qua kiểm tra xem email từ (req.body.email gửi lên) đó có tồn tại trong DB hay là không bằng hàm findOne của MongoDB.
  + Nếu tồn tại trả về Bad request 400. Còn lại chưa tồn tại sẽ đi đến bước đăng ký và dùng save của mongo để lưu lại
  + Sau đó tiến hành tạo token.
  + Lưu token đó vào cookie
  + Cuối cùng mọi thứ thành công hết trả về status 200

Xây dựng Login API
- routes
 + /api/auth/login;
 + cũng đã giải thích sẵn trong file và nó cũng tương tự register
 + cũng validate, sau đó so sánh email và password gửi từ (req.body) với dữ liệu trong DB
 + đối với email check có tồn tại hay không, đối với password dịch ngược từ password bcrypt ra so sánh password
 + xong tạo token
 + lưu vào cookie
 + có lỗi catch sẽ bắt

Xây dựng User Registration Form




