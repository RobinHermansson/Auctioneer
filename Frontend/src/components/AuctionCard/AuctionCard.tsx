import { useState } from "react";
import type { Auction } from "../../types/Types";

interface AuctionProps {
  AuctionList: Auction[];
}
const AuctionCard = ({ AuctionList }: AuctionProps) => {
  const [auctions, setAuctions] = useState<Auction[]>([]);

  return (
    <>
      {AuctionList.map(item => {
        return <p>{item.auctionId}</p>
      })}
    </>
  );
};

export default AuctionCard;
