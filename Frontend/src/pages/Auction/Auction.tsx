import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAuctionById } from "../../services/auctionService";
import formatAuctionEndDate from "../../services/dateService";
import type { Auction } from "../../types/Types";
import "./Auction.css";


const Auction = () => {
    const { auctionId } = useParams();
    const [auction, setAuction] = useState<Auction>()
    useEffect(() => {
        const fetchData = async () => {

            const response = await getAuctionById(parseInt(auctionId!));
            setAuction(response);
        }
        fetchData();
    }, [auctionId]);
    return (
        <div className="main-div">

            <main className="main-area-auction">

                <img
                    src={`https://localhost:7029${auction?.item.imageUrl}`}
                    alt={auction?.name}
                />

                <h2>{auction?.name}</h2>

                <p className="description">
                    {auction?.description}
                </p>

            </main>

            <aside className="aside-area">

                <h3>{auction?.item.price} SEK</h3>

                <p>
                    Seller: {auction?.owner.firstName}
                </p>
                <p>
                    Ends: {formatAuctionEndDate(auction?.endDate ?? "")}
                </p>

            </aside>

        </div>
    )
}

export default Auction;