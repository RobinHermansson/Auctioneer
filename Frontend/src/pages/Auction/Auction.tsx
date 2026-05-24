import { use, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAuctionById, getHighestBidById } from "../../services/auctionService";
import formatAuctionEndDate from "../../services/dateService";
import type { Auction } from "../../types/Types";
import "./Auction.css";
import BidModal from "../../components/BidModal/BidModal";
import {whoAmI} from "../../services/userService";


const Auction = () => {
    const navigate = useNavigate();
    const { auctionId } = useParams();
    const [auction, setAuction] = useState<Auction>()
    const [userId, setUserId] = useState<number>()
    const [highestBid, setHighestbid] = useState<number>(0)
    const [showModal, setShowBidModal] = useState(false);
    const [canPlaceBid, setCanPlaceBid] = useState(false);
    useEffect(() => {
        const fetchData = async () => {

            const response = await getAuctionById(parseInt(auctionId!));
            setAuction(response);

            const receivedUserId = await whoAmI();
            setUserId(receivedUserId);
            if (auction?.owner.userId == userId){
                setCanPlaceBid(false);
            } else {
                setCanPlaceBid(true);
            }

            const highestBidResponse = await getHighestBidById(parseInt(auctionId!));
            setHighestbid(highestBidResponse);
        }   
        fetchData();

    }, [auctionId]);
    useEffect(() => {
        const fetchHighestBid = async () => {
            const highestBidResponse = await getHighestBidById(parseInt(auctionId!));
            setHighestbid(highestBidResponse);
        } 
        fetchHighestBid();
        }, [showModal])
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
                {auction?.owner.userId === userId && <button className="delete-auction">Delete this auction</button>}

            </aside>
            </div>
            {showModal && <BidModal auctionCost={highestBid} auctionId={auction?.auctionId!} userId={userId!} onClose={() => setShowBidModal(false)} />}
        </div>
    )
}

export default Auction;