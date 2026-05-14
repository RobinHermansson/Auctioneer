import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAuctionById } from "../../services/auctionService";
import formatAuctionEndDate from "../../services/dateService";
import type { Auction } from "../../types/Types";
import "./Auction.css";
import BidModal from "../../components/BidModal/BidModal";


const Auction = () => {
    const navigate = useNavigate();
    const { auctionId } = useParams();
    const [auction, setAuction] = useState<Auction>()
    const [showModal, setShowBidModal] = useState(false);
    useEffect(() => {
        const fetchData = async () => {

            const response = await getAuctionById(parseInt(auctionId!));
            setAuction(response);
        }
        fetchData();
    }, [auctionId]);
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
                <p className="auction-price">{auction?.item.price} SEK</p>
                <button className="bid-button" onClick={() => setShowBidModal(true)}>
                    Place a bid
                </button>
                <p className="auction-end-date">
                    Ends: {formatAuctionEndDate(auction?.endDate ?? "")}
                </p>
                <p>
                    Seller: {auction?.owner.firstName}
                </p>

            </aside>
            </div>
            {showModal && <BidModal onClose={() => setShowBidModal(false)} />}
        </div>
    )
}

export default Auction;