import "./BidModal.css";    
interface BidModalProps {
    onClose: () => void;
}
const BidModal = ({ onClose }: BidModalProps) => {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-head-section">
                    <div className="header">
                        <h2>Place a bid</h2>
                    </div>
                    <div className="close">
                        <p onClick={onClose}>X</p>
                    </div>
                </div>
                    <div className="modal-bid-section">

                        <p>Currently highest bid: </p>
                        <input className="bid-input" type="number" placeholder="Enter your bid" />
                        <button className="bid-button">Submit</button>

                    </div>

            </div>
        </div>
    )
}

export default BidModal;