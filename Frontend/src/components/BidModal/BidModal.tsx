import { useState } from "react";
import "./BidModal.css";    
import { addBidToAuction } from "../../services/auctionService";
import { useToast } from "../../context/ToastContext";
interface BidModalProps {
    auctionCost: number;
    auctionId : number;
    onClose: () => void;
}
const BidModal = ({ auctionCost,auctionId, onClose }: BidModalProps) => {
    const [bidAmount, setBidAmount] = useState(auctionCost);
    const {showToast} = useToast();
    const onSubmitBid = async () => {
        const response = await addBidToAuction({
            auctionId: auctionId,
            amount: bidAmount
        });
        if (response.success) {
            showToast("Bid placed successfully", "success");
            onClose();
        } else {
            showToast("Failed to place bid", "error");
            onClose();
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

                        <p>You must bid more than: {auctionCost} SEK</p>
                        <input 
                            className="bid-input" 
                            type="number" 
                            placeholder="Enter your bid" 
                            value={bidAmount}
                            onChange={(e) => setBidAmount(Number(e.target.value))}
                        />
                        <button disabled={bidAmount <= auctionCost} className="bid-button" onClick={onSubmitBid}>
                            Submit
                        </button>

                    </div>

            </div>
        </div>
    )
}

export default BidModal;