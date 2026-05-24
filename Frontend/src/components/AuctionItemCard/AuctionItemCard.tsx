import { useNavigate } from "react-router-dom";
import type { AuctionItem } from "../../types/Types";
import "./AuctionItemCard.css";
import { useEffect, useState } from "react";
import { getHighestBidById } from "../../services/auctionService";

interface AuctionItemCardProps {
    AuctionItem: AuctionItem
    AuctionId: number
}
const AuctionItemCard = ({ AuctionItem, AuctionId }: AuctionItemCardProps) => {
    const navigate = useNavigate()
    const [auctionItemPrice, setAuctionItemPrice] = useState<number>(AuctionItem.price);

    const goAuction = () => {
        navigate(`/auction/${AuctionId}`)
    }
    useEffect(() => {
        const fetchData = async () => {
            const response = await getHighestBidById(AuctionId);
            setAuctionItemPrice(response ? response : AuctionItem.price);
        };
        fetchData();
    }, [AuctionItem])
    return (
        <li className="auction-item-card" onClick={goAuction}>
            <img
                src={`https://localhost:7029${AuctionItem.imageUrl}`}
                alt={AuctionItem.name}
            ></img>
            <h4>{AuctionItem.name}</h4>
            <p className="description">{AuctionItem.description}</p>
            <p className="type">{AuctionItem.auctionType}</p>
            <p className="price">{auctionItemPrice} SEK</p>
        </li>
    )
}

export default AuctionItemCard;