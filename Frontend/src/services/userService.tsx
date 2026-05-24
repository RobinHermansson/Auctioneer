import type { RegisterUserRequest, RegisterUserResponse } from "../types/Types";

export const whoAmI = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch("https://localhost:7029/api/User/whoami", {
        headers: {
            Authorization: `Bearer ${token}`}
    });
    return response.json();
};

const registerUser = async (RegisterRequest: RegisterUserRequest): Promise<RegisterUserResponse> => {
    const response = await fetch("https://localhost:7029/api/User/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(RegisterRequest)
    });
    return response.json();
};
export default registerUser;