import type { Auction } from "../../types/Types";
import AuctionItemCard from "../AuctionItemCard/AuctionItemCard";
import "./AuctionCard.css";

interface AuctionProps {
  AuctionList: Auction[];
}


const AuctionCard = ({ AuctionList }: AuctionProps) => {
  return (
    <ul className="auction-list">
      {AuctionList.map(theAuction => (
        <li className="auction-item-card">
          <AuctionItemCard key={theAuction.auctionId} AuctionItem={theAuction.item} AuctionId={theAuction.auctionId} isDeactivated={theAuction.isDeactivated} isOpen={theAuction.isOpen} />
        </li>
      ))}
    </ul>
  );
};

export default AuctionCard;
