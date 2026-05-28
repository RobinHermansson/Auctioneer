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
