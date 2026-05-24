import { createContext, useContext, useState } from "react";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
    sub: string; 
}

interface AuthContextType {
    token: string | null;
    userId: number | null;
    login: (token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType>(null!);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const storedToken = localStorage.getItem("token");
    const [token, setToken] = useState<string | null>(storedToken);
    const [userId, setUserId] = useState<number | null>(() => {
        if (!storedToken) return null;
        const decoded = jwtDecode<JwtPayload>(storedToken);
        return parseInt(decoded.sub);
        });

    const login = (token: string) => {
        localStorage.setItem("token", token);
        const decoded = jwtDecode<JwtPayload>(token);
        setUserId(parseInt(decoded.sub));
        setToken(token);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUserId(null);
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ token, userId, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);