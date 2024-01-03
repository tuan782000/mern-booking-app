import { RegisterFormData } from "./pages/Register";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const register = async (formData: RegisterFormData) => {
    const response = await fetch(`${API_BASE_URL}/api/users/register`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    });

    /*
    Sử dụng hàm fetch để thực hiện một yêu cầu HTTP POST đến đường dẫn ${API_BASE_URL}/api/users/register.
    Truyền vào các tùy chọn như phương thức là "POST", headers để chỉ định loại nội dung là JSON, và body để chuyển đổi đối tượng formData thành chuỗi JSON.
    */

    const responseBody = await response.json();

    if (!response.ok) {
        throw new Error(responseBody.message);
    }

    /*
    Sử dụng response.json() để chuyển đổi nội dung phản hồi từ dạng JSON sang đối tượng JavaScript.
    Kiểm tra xem response.ok có giá trị true hay false. Nếu không, nghĩa là có lỗi, thì ném một lỗi với thông báo lỗi từ phản hồi.
    */
};

export const validateToken = async () => {
    const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
        credentials: "include",
    });

    if (!response.ok) {
        throw new Error("Token invalid");
    }

    return response.json();
};
