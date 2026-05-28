import type { FullUserDetails } from "../types/Types";

// Helper to build auth headers — only call this for protected endpoints
const baseUrl = 'https://localhost:7029/api/Admin';

const authHeaders = (): Record<string, string> => {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
};

export const getAllUsers = async (): Promise<FullUserDetails[]>=> {
    const response = await fetch(`${baseUrl}/users`, {
        headers: authHeaders()
    });
    return response.json();
};
export const setUserActiveStatus = async (userId: number, isActive: boolean): Promise<void> => {
    const response = await fetch(`${baseUrl}/users/${userId}/active`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", ...authHeaders() },
        body: JSON.stringify({ isActive })
    });
    if (!response.ok) throw new Error("Failed to update user status.");
};