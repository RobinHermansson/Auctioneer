import { useEffect, useState } from "react";
import AuctionCard from "../../components/AuctionCard/AuctionCard";
import getAllAuctions from "../../services/auctionService";
import type { Auction } from "../../types/Types";

const Home = () => {
    const [allAuctions, setAllAuctions] = useState<Auction[]>([])
    const [userSpecificAuctions, setUserSpecificAuctions] = useState<Auction[]>([]);
    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await getAllAuctions();
                setAllAuctions(response);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    return (
        <>
            <header>
                <h1>Home</h1>
            </header>
            <main>
                <section>
                    <h2>My auctions</h2>
                    <AuctionCard AuctionList={allAuctions} />
                </section>
                <section>
                    <h2>New auctions</h2>
                </section>
            </main>
        </>
    )
}

export default Home;