import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteAuction, getAuctionById, getBidsByAuctionId, getHighestBidById } from "../../services/auctionService";
import formatAuctionEndDate from "../../services/dateService";
import type { Auction, BidListing } from "../../types/Types";
import "./Auction.css";
import BidModal from "../../components/BidModal/BidModal";
import { useAuth } from "../../context/AuthContext";
import { ConfirmCancelActionModal } from "../../components/ConfirmCancelActionModal/ConfirmCancelActionModal";
import { useToast } from "../../context/ToastContext";


const Auction = () => {
    const navigate = useNavigate();
    const { auctionId } = useParams();
    const [auction, setAuction] = useState<Auction>()
    const [highestBid, setHighestbid] = useState<number>(0)
    const [showModal, setShowBidModal] = useState(false);
    const [canPlaceBid, setCanPlaceBid] = useState(false);
    const [bidsList, setBidsList] = useState<BidListing[]>([]);
    const [showConfirmCancelModal, setShowConfirmCancelModal] = useState(false);    
    const [canDelete, setCanDelete] = useState(false);
    const {token, userId} = useAuth();
    const {showToast} = useToast();
    useEffect(() => {
        const fetchData = async () => {
            const response = await getAuctionById(parseInt(auctionId!));
            setAuction(response);
            const highestBidResponse = await getHighestBidById(parseInt(auctionId!));
            setHighestbid(highestBidResponse);
            const bidsResponse = await getBidsByAuctionId(parseInt(auctionId!));
            setBidsList(bidsResponse);
            
        };
        fetchData();
    }, [auctionId, showModal]);

    useEffect(() => {
        if (!auction || !userId) {
            console.log(`${userId}, ${auction?.owner.userId}`)
            setCanPlaceBid(false);
            return;
        }
        setCanPlaceBid(auction.owner.userId !== userId);
    }, [auction, userId]);
    useEffect(() => {
        setCanDelete(bidsList.length <= 0 && auction?.owner.userId === userId);
    }, [bidsList])
    const handleDeleteAuctionClick = () => {
        setShowConfirmCancelModal(true);

    }
    const handleConfirmDelete = async () => {
        try{
            await deleteAuction(auction!.auctionId);
            showToast("Auction deleted successfully", "success");   
            navigate("/");
        }catch (error) {
            showToast("Error deleting auction", "error");
            console.error("Error deleting auction:", error);
        }
    }
    return (
        <div className="main-div">
            <div className="page-header">
                <button className="back-button" onClick={() => navigate("/")}>← Back to auctions</button>
            </div>

            <div className="content-row">
                <main className="main-area-auction">
                    <img
                        src={`https://localhost:7029${auction?.item.imageUrl}`}
                        alt={auction?.name}
                    />

                    <h4>Description:</h4>

                <p className="auction-description">
                    {auction?.description}
                </p>

            </main>

                <aside className="aside-area">

                <h3>{auction?.name}</h3>
                <p className="current-price-label">
                    {bidsList.length > 0 ? `Highest bid:` : `Starting price:`}
                </p>
                <p className="auction-price">{highestBid ? highestBid >0 ? highestBid : auction?.item.price : auction?.item.price} SEK</p>
                <button disabled={!canPlaceBid} className="bid-button" onClick={() => setShowBidModal(true)}>
                    Place a bid
                </button>
                <p className="auction-end-date">
                    Ends: {formatAuctionEndDate(auction?.endDate ?? "")}
                </p>
                <p>
                    Seller: {auction?.owner.firstName}
                </p>
                <h4 className="bid-history-header">Bid history:</h4>
                <div className="bid-history-section">
                    {bidsList.length === 0 && <p>No bids placed yet.</p>}
                    <ul className="bids-list">
                        {bidsList.map((bid) => (
                            <li key={bid.bidId}>
                                {bid.amount} SEK  |  At: {new Date(bid.timestamp).toLocaleString("sv-SE")} 
                            </li>
                        ))}
                    </ul>
                </div>
                {auction?.owner.userId === userId && 
                <button className="delete-auction" disabled={!canDelete} onClick={handleDeleteAuctionClick}>
                    Delete this auction
                </button>
                }
                {!canDelete && auction?.owner.userId === userId && <p className="delete-auction-note">You can only delete auctions with no bids.</p>}

            </aside>
            </div>
            {showModal && <BidModal auctionCost={highestBid} auctionId={auction?.auctionId!} onClose={() => setShowBidModal(false)} />}
                {showConfirmCancelModal && <ConfirmCancelActionModal 
                    title="Delete Auction"
                    confirmButtonText="Yes, delete!"
                    cancelButtonText="No. Cancel"
                    message="Are you sure you want to delete this auction?"
                    onConfirm={handleConfirmDelete}
                    onCancel={() => setShowConfirmCancelModal(false)}
                />}
        </div>
    )
}

export default Auction;