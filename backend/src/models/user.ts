import mongoose from "mongoose";
import bcrypt from "bcryptjs";
// Khai báo type cho user
export type UserType = {
    // cái này string của ts
    _id: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
};

const userSchema = new mongoose.Schema({
    // cái này là String của mongo. type kiểu dữ liệu, required bắt buộc hay không, unique: có được phép trùng hay không
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
});

/*
userSchema.pre("save", ...): Đây là cách đăng ký một middleware cho sự kiện "save" trên schema userSchema.

async function (next) { ... }: Middleware này là một hàm asynchronous nhận vào một tham số là next, là một hàm callback sẽ được gọi khi middleware hoàn thành.
*/ 
userSchema.pre("save", async function (next) {
    /*
    if (this.isModified("password")) { ... }: Kiểm tra xem trường password có được sửa đổi không bằng cách sử dụng phương thức isModified() của đối tượng (this). Nếu mật khẩu đã được sửa đổi, middleware sẽ tiếp tục thực hiện các bước tiếp theo.

    this.password = await bcrypt.hash(this.password, 8);: Sử dụng thư viện bcrypt để hash mật khẩu. Nếu mật khẩu đã được sửa đổi, nó sẽ được hash bằng cách sử dụng hàm bcrypt.hash() với cost factor là 8 (điều này ảnh hưởng đến độ khó của quá trình hash).
    */
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 8);
    }
    next();
    // next();: Gọi hàm callback next() để thông báo rằng middleware đã hoàn thành và quá trình lưu có thể tiếp tục. Điều này là quan trọng để đảm bảo rằng quá trình lưu không bắt đầu cho đến khi middleware đã hoàn thành.
});

// Tham số đầu tiến "User" là tên bảng, Tham số thứ 2 là userSchema chứa các trường dữ liệu. và model này phải tuân thủ theo UserType đã khai báo ở trên
const User = mongoose.model<UserType>("User", userSchema);

// Ở đây, tạo một model Mongoose bằng cách sử dụng phương thức mongoose.model. Model này có tên là "User" và sử dụng userSchema để xác định cấu trúc của các tài liệu trong bộ sưu tập "User". Tham số kiểu <UserType> xác định rằng các tài liệu trong bộ sưu tập này phải tuân theo cấu trúc được định nghĩa bởi UserType.

export default User;
