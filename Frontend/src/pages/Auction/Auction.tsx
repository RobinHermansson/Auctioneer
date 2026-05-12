import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAuctionById } from "../../services/auctionService";
import type { Auction } from "../../types/Types";

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
        <>
            <img src={`https://localhost:7029${auction?.item.imageUrl}`} ></img >
            <h2>{auction?.name}</h2>
            <p>{auction?.description}</p>
        </>
    )
}

export default Auction;