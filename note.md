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



