import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteAuction, getAuctionById, getHighestBidById } from "../../services/auctionService";
import formatAuctionEndDate from "../../services/dateService";
import type { Auction } from "../../types/Types";
import "./Auction.css";
import BidModal from "../../components/BidModal/BidModal";
import { useAuth } from "../../context/AuthContext";
import { ConfirmCancelActionModal } from "../../components/ConfirmCancelActionModal/ConfirmCancelActionModal";


const Auction = () => {
    const navigate = useNavigate();
    const { auctionId } = useParams();
    const [auction, setAuction] = useState<Auction>()
    const [highestBid, setHighestbid] = useState<number>(0)
    const [showModal, setShowBidModal] = useState(false);
    const [canPlaceBid, setCanPlaceBid] = useState(false);
    const [showConfirmCancelModal, setShowConfirmCancelModal] = useState(false);    
    const {token, userId} = useAuth();
    useEffect(() => {
        const fetchData = async () => {
            const response = await getAuctionById(parseInt(auctionId!));
            setAuction(response);
            const highestBidResponse = await getHighestBidById(parseInt(auctionId!));
            setHighestbid(highestBidResponse);
        };
        fetchData();
    }, [auctionId, showModal]);

    useEffect(() => {
        if (!auction || !userId) {
            console.log(`${userId}`)
            setCanPlaceBid(false);
            return;
        }
        setCanPlaceBid(auction.owner.userId !== userId);
    }, [auction, userId]);
    const handleDeleteAuctionClick = () => {
        setShowConfirmCancelModal(true);

    }
    const handleConfirmDelete = async () => {
        try{
            await deleteAuction(auction!.auctionId);
            navigate("/");
        }catch (error) {
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
                    Current price: 
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
                {auction?.owner.userId === userId && <button className="delete-auction" onClick={handleDeleteAuctionClick}>
                    Delete this auction
                </button>}

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