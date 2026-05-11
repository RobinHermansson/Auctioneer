import { useEffect, useState } from "react";
import AuctionCard from "../../components/AuctionCard/AuctionCard"
import type {Auction} from "../../types/Types"; 
import getAllAuctions from "../../services/auctionService";

const Home = () => {
    const [auctions, setAuctions] = useState<Auction[]>([])
    useEffect(() => {
    
        const fetchData = async () => {
        try {
        const response = await getAllAuctions();
            setAuctions(response);
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
                    <AuctionCard AuctionList={auctions}/>
                </section>
                <section>
                        <h2>New auctions</h2>
                </section>
            </main>
        </>
    )
}

export default Home;