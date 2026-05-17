import { useState } from "react";
import "./BidModal.css";    
import { addBidToAuction } from "../../services/auctionService";
interface BidModalProps {
    auctionCost: number;
    auctionId : number;
    userId: number;
    onClose: () => void;
}
const BidModal = ({ auctionCost,auctionId, userId, onClose }: BidModalProps) => {
    const [bidAmount, setBidAmount] = useState(auctionCost);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const onSubmitBid = async () => {
        const response = await addBidToAuction({
            bidderId: userId,
            auctionId: auctionId,
            amount: bidAmount
        });
        if (response.success) {
            setSuccessMessage(response.message);
            setErrorMessage("");
        } else {
            setErrorMessage(response.message);
            setSuccessMessage("");
        }
    }
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

                        <p>Currently highest bid: {auctionCost} SEK</p>
                        <input 
                            className="bid-input" 
                            type="number" 
                            placeholder="Enter your bid" 
                            value={bidAmount}
                            onChange={(e) => setBidAmount(Number(e.target.value))}
                        />
                        {errorMessage && <p className="error-message">{errorMessage}</p>}
                        {successMessage && <p className="success-message">{successMessage}</p>}
                        <button disabled={bidAmount <= auctionCost} className="bid-button" onClick={onSubmitBid}>
                            Submit
                        </button>

                    </div>

            </div>
        </div>
    )
}

export default BidModal;