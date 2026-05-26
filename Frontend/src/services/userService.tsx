import type { RegisterUserRequest, RegisterUserResponse, UpdateUserDetailsRequest, User } from "../types/Types";

export const whoAmI = async (): Promise<User> => {
    const token = localStorage.getItem("token");
    const response = await fetch("https://localhost:7029/api/User/whoami", {
        headers: {
            Authorization: `Bearer ${token}`}
    });
    return response.json();
};

export const registerUser = async (RegisterRequest: RegisterUserRequest): Promise<RegisterUserResponse> => {
    const response = await fetch("https://localhost:7029/api/User/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(RegisterRequest)
    });
    return response.json();
};

export const updateUserDetails = async (updatedDetails: UpdateUserDetailsRequest): Promise<{ success: boolean; message: string }> => {
    const token = localStorage.getItem("token");
    const response = await fetch("https://localhost:7029/api/User/update", {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(updatedDetails)
    });
    return response.json();
}