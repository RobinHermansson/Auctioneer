import "./Toast.css";

interface ToastProps {
    message: string;
    type: "success" | "error";
    onClose: () => void;
}

const Toast = ({ message, type, onClose }: ToastProps) => (
    <div className={`toast toast-${type}`}>
        <span>{message}</span>
        <button className="toast-close" onClick={onClose}>✕</button>
    </div>
);

export default Toast;