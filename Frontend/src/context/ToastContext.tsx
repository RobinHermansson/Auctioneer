import { useContext, useState, createContext, useEffect } from "react";
import Toast from "../components/Toast/Toast";

interface Toast {
    message: string;
    type: "success" | "error";
}

interface ToastContextType {
    showToast: (message: string, type?: "success" | "error") => void;
}

const ToastContext = createContext<ToastContextType>(null!);

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
    const [toast, setToast] = useState<Toast | null>(null);

    const showToast = (message: string, type: "success" | "error" = "success") => {
        setToast({ message, type });
    };

    const hideToast = () => setToast(null);

    useEffect(() => {
        if (!toast) return;
        const timer = setTimeout(hideToast, 4000); // auto-dismiss after 4s
        return () => clearTimeout(timer); // cleanup if a new toast replaces it
    }, [toast]);

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            {toast && <Toast message={toast.message} type={toast.type} onClose={hideToast} />}
        </ToastContext.Provider>
    );
};

export const useToast = () => useContext(ToastContext);