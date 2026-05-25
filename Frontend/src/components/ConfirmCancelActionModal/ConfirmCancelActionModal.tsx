import "./ConfirmCancelActionModal.css";
interface ConfirmCancelActionModalProps {
    onConfirm: () => void;
    onCancel: () => void;
    title: string;
    confirmButtonText: string;
    cancelButtonText: string;
    message: string;
}

export const ConfirmCancelActionModal: React.FC<ConfirmCancelActionModalProps> = ({
    onConfirm,
    onCancel,
    title,
    confirmButtonText,
    cancelButtonText,
    message
}) => (
        <div className="modal-overlay">
                <div className="modal-content"> 
            <div className="modal-head-section">
                <h3>{title}</h3>
            </div>
                    <p>{message}</p>
                    <div className="modal-button-section">
                        <button className="btn-confirm"onClick={onConfirm}>{confirmButtonText}</button>
                        <button className="btn-cancel" onClick={onCancel}>{cancelButtonText}</button>
                    </div>
                </div>
        </div>)