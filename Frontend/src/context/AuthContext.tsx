import { createContext, useContext, useState } from "react";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
    sub: string; 
    role: string;
}

interface AuthContextType {
    token: string | null;
    isAdmin: boolean;
    userId: number | null;
    login: (token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType>(null!);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const storedToken = localStorage.getItem("token");
    const [userRole, setUserRole] = useState<string | null>(() => {
        if (!storedToken) return null;
        return jwtDecode<JwtPayload>(storedToken).role ?? null;
    });
    const [token, setToken] = useState<string | null>(storedToken);
    const isAdmin = userRole === "Admin";

    
    const parseUserId = (token: string): number | null => {
        const decoded = jwtDecode<JwtPayload>(token);
        const id = parseInt(decoded.sub);
        return isNaN(id) ? null : id;
    };

    // Then use it in both places:
    const [userId, setUserId] = useState<number | null>(() => {
        if (!storedToken) return null;
        return parseUserId(storedToken);
    });

    const login = (token: string) => {
        localStorage.setItem("token", token);
        const decoded = jwtDecode<JwtPayload>(token);
        setUserId(parseUserId(token));
        setUserRole(decoded.role ?? null);
        setToken(token);
    }; 

    const logout = () => {
        localStorage.removeItem("token");
        setUserId(null);
        setUserRole(null);
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ token, userId, isAdmin, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);