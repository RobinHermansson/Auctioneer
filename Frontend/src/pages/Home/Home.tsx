import { useEffect, useState } from "react";
import AuctionCard from "../../components/AuctionCard/AuctionCard";
import { getAllAuctions, getMyAuctions } from "../../services/auctionService";
import type { Auction } from "../../types/Types";
import "./Home.css";

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
            try {
                const response = await getMyAuctions();
                setUserSpecificAuctions(response);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    return (
        <>
            <header>
                <h1 className="main-header">Auctioneer</h1>
            </header>
            <main className="main-area">
                <section>
                    <h2>My auctions</h2>
                    <AuctionCard AuctionList={userSpecificAuctions} />
                </section>
                <section>
                    <h2>All auctions</h2>
                    <AuctionCard AuctionList={allAuctions} />
                </section>
            </main>
        </>
    )
}

export default Home;