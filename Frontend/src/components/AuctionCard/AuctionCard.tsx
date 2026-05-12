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
        <AuctionItemCard key={theAuction.auctionId} AuctionItem={theAuction.item} />
      ))}
    </ul>
  );
};

export default AuctionCard;
