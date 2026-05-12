import { useNavigate } from "react-router-dom";
import type { AuctionItem } from "../../types/Types";
import "./AuctionItemCard.css";

interface AuctionItemCardProps {
    AuctionItem: AuctionItem
    AuctionId: number
}
const AuctionItemCard = ({ AuctionItem, AuctionId }: AuctionItemCardProps) => {
    const navigate = useNavigate()

    const goAuction = () => {
        navigate(`/auction/${AuctionId}`)
    }
    return (
        <li className="auction-item-card" onClick={goAuction}>
            <img
                src={`https://localhost:7029${AuctionItem.imageUrl}`}
                alt={AuctionItem.name}
            ></img>
            <h4>{AuctionItem.name}</h4>
            <p className="description">{AuctionItem.description}</p>
            <p className="type">{AuctionItem.auctionType}</p>
            <p className="price">{AuctionItem.price} SEK</p>
        </li>
    )
}

export default AuctionItemCard;