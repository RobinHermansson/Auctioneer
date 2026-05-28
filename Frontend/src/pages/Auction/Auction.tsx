import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteAuction, getAuctionById, getBidsByAuctionId, getHighestBidById, retractBid } from "../../services/auctionService";
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
    const [canDelete, setCanDelete] = useState(false);
    const { userId } = useAuth();
    const [bidToRetract, setBidToRetract] = useState<number | null>(null);
    const {showToast} = useToast();
    const [modalAction, setModalAction] = useState<"delete" | "retract" | null>(null);
    const latestBidId = bidsList.length > 0  ? bidsList[bidsList.length - 1].bidId : null;
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
    }, [bidsList, auction, userId])
    const handleDeleteAuctionClick = () => setModalAction("delete");
    const handleConfirmDelete = async () => {
        try {
            await deleteAuction(auction!.auctionId);
            showToast("Auction deleted successfully", "success");
            navigate("/");
        } catch {
            showToast("Error deleting auction", "error");
        } finally {
            setModalAction(null);
        }
    };

    const handleConfirmRetractBid = async () => {
        try {
            await retractBid(bidToRetract!);
            showToast("Bid retracted successfully", "success");
            
            const bidsResponse = await getBidsByAuctionId(parseInt(auctionId!));
            setBidsList(bidsResponse);
            const highestBidResponse = await getHighestBidById(parseInt(auctionId!));
            setHighestbid(highestBidResponse);
        } catch {
            showToast("Error retracting bid", "error");
        } finally {
            setModalAction(null);
        }
    };
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
                {auction?.isOpen 
                    ? <button disabled={!canPlaceBid} className="bid-button" onClick={() => setShowBidModal(true)}>Place a bid</button>
                    : <p className="auction-closed-badge">Auction closed</p>
                }
                {!canPlaceBid && auction?.isOpen && <p className="own-auction-note">You cannot bid on your own auction.</p>}
                <p className="auction-end-date">
                    Ends: {formatAuctionEndDate(auction?.endDate ?? "")}
                </p>
                <h4 className="bid-history-header">Bid history:</h4>
                {bidsList.length > 0 && <p className="bid-starting-price">Starting price: {auction?.item.price} SEK</p>}
                <div className="bid-history-section">
                    {bidsList.length === 0 && <p>No bids placed yet.</p>}
                    <ul className="bids-list">
                        {bidsList.map((bid) => {
                        const isOwnBid = bid.bidderId === userId && bid.bidId === latestBidId;
                        const isUsersBid = bid.bidderId === userId;

                        return (
                            <li key={bid.bidId} className={`bid-item ${isUsersBid ? "bid-item-own" : ""}`}>
                                <span className="bid-amount">
                                    {isUsersBid ? "You bid:" : "Bid:"} <strong>{bid.amount} SEK</strong>
                                </span>
                                <span className="bid-date">{new Date(bid.timestamp).toLocaleString("sv-SE")}</span>
                                {isOwnBid && (
                                    <span className="retract-bid-span" onClick={() => {
                                        setBidToRetract(bid.bidId);
                                        setModalAction("retract");
                                    }}>
                                        Retract bid
                                    </span>
                                )}
                            </li>
                        );
                    })} 
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
            {showModal && <BidModal auctionCost={highestBid <= 0 ? auction?.startingPrice! : highestBid} auctionId={auction?.auctionId!} onClose={() => setShowBidModal(false)} />}
            {modalAction === "delete" && (
            <ConfirmCancelActionModal
                title="Delete Auction"
                confirmButtonText="Yes, delete!"
                cancelButtonText="Cancel"
                message="Are you sure you want to delete this auction?"
                onConfirm={handleConfirmDelete}
                onCancel={() => setModalAction(null)}
            />
            )}
            {modalAction === "retract" && (
                <ConfirmCancelActionModal
                    title="Retract Bid"
                    confirmButtonText="Yes, retract!"
                    cancelButtonText="Cancel"
                    message="Are you sure you want to retract this bid?"
                    onConfirm={handleConfirmRetractBid}
                    onCancel={() => setModalAction(null)}
                />
            )}
        </div>
    )
}

export default Auction;