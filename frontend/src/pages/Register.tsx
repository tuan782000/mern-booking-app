import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import * as apiClient from "../api-client";

export type RegisterFormData = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
};

const Register = () => {
    // useForm là một hook từ thư viện react-hook-form giúp quản lý trạng thái của form.
    // RegisterFormData là một kiểu TypeScript mô tả cấu trúc dữ liệu mà form sẽ nhận được.
    // register: Một hàm được sử dụng để kết nối các trường nhập liệu trong form với react-hook-form.
    // watch: Một hàm để theo dõi giá trị của các trường nhập liệu trong form.
    // handleSubmit: Một hàm để xử lý sự kiện submit của form.
    // Bên trong của useForm cũng có các field register, watch, handleSubmit, formState: { errors }, khi dùng gán các biến vào các tên tương ứng thông qua cú pháp destructuring
    const {
        register,
        watch,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormData>();

    const mutation = useMutation(apiClient.register, {
        onSuccess: () => {
            console.log("Registration successfully!");
        },
        onError: (error: Error) => {
            console.log(error.message);
        },
    });

    // onSubmit: Là một hàm được gọi khi form được submit, in ra dữ liệu được nhập từ form vào console.
    const onSubmit = handleSubmit((data) => {
        mutation.mutate(data)
    });
    return (
        // Dùng onSubmit để xử lý sự kiện submit form.
        <form onSubmit={onSubmit} className="flex flex-col gap-5">
            <h2 className="text-3xl font-bold">Create an Account</h2>
            <div className="flex flex-col md:flex-row gap-5">
                <label
                    htmlFor=""
                    className="text-gray-700 text-sm font-bold flex-1"
                >
                    First Name
                    <input
                        className="border rounded w-full py-1 px-2 font-normal"
                        type="text"
                        {...register("firstName", {
                            required: "This field is required",
                        })}
                    />
                    {/* vế 2 luôn luôn là true, quyết định vế 1 nếu true thì hiện lỗi, false không hiện */}
                    {errors.firstName && (
                        <span className="text-red-500">
                            {errors.firstName.message}
                        </span>
                    )}
                    {/* sử dụng cú pháp destructuring ...register */}
                    {/* destructuring giúp rút gọn cú pháp khi bạn muốn trích xuất các giá trị từ đối tượng hoặc mảng. */}
                    {/* Sử dụng ...register để kết nối các trường nhập liệu với react-hook-form và thêm các quy tắc xác thực. */}
                    {/* Sử dụng ...register và truyền vào các quy tắc xác thực như required, minLength, và validate để đảm bảo tính hợp lệ của dữ liệu nhập vào. */}
                </label>
                <label
                    htmlFor=""
                    className="text-gray-700 text-sm font-bold flex-1"
                >
                    Last Name
                    <input
                        className="border rounded w-full py-1 px-2 font-normal"
                        type="text"
                        {...register("lastName", {
                            required: "This field is required",
                        })}
                    />
                    {errors.lastName && (
                        <span className="text-red-500">
                            {errors.lastName.message}
                        </span>
                    )}
                </label>
            </div>
            <label
                htmlFor=""
                className="text-gray-700 text-sm font-bold flex-1"
            >
                Email
                <input
                    className="border rounded w-full py-1 px-2 font-normal"
                    type="email"
                    {...register("email", {
                        required: "This field is required",
                    })}
                />
                {errors.email && (
                    <span className="text-red-500">{errors.email.message}</span>
                )}
            </label>
            <label
                htmlFor=""
                className="text-gray-700 text-sm font-bold flex-1"
            >
                Password
                <input
                    className="border rounded w-full py-1 px-2 font-normal"
                    type="password"
                    {...register("password", {
                        required: "This field is required",
                        minLength: {
                            value: 6,
                            message: "Password must be at least 6 characters",
                        },
                    })}
                />
                {errors.password && (
                    <span className="text-red-500">
                        {errors.password.message}
                    </span>
                )}
            </label>
            <label
                htmlFor=""
                className="text-gray-700 text-sm font-bold flex-1"
            >
                Confirm Password
                <input
                    className="border rounded w-full py-1 px-2 font-normal"
                    type="password"
                    {...register("confirmPassword", {
                        validate: (val) => {
                            if (!val) {
                                return "This field is required";
                            } else if (watch("password") !== val) {
                                return "Your password do not match";
                            }
                        },
                    })}
                    // Sử dụng watch("password") để theo dõi giá trị của trường mật khẩu và so sánh nó với trường xác nhận mật khẩu.
                />
                {errors.confirmPassword && (
                    <span className="text-red-500">
                        {errors.confirmPassword.message}
                    </span>
                )}
            </label>
            <span>
                <button
                    type="submit"
                    className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl"
                >
                    Create Account
                </button>
            </span>
        </form>
    );
};

export default Register;
