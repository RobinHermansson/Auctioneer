import { useEffect, useState } from "react";
import AuctionCard from "../../components/AuctionCard/AuctionCard";
import { getAllAuctions, getMyAuctions } from "../../services/auctionService";
import { useAuth } from "../../context/AuthContext";
import type { Auction } from "../../types/Types";
import "./Home.css";

const Home = () => {
    const { token } = useAuth();
    const [allAuctions, setAllAuctions] = useState<Auction[]>([])
    const [userSpecificAuctions, setUserSpecificAuctions] = useState<Auction[]>([]);



   useEffect(() => {
        getAllAuctions().then(setAllAuctions).catch(console.error);
    }, []);

    useEffect(() => {
        if (token) {
            getMyAuctions().then(setUserSpecificAuctions).catch(console.error);
        } else {
            setUserSpecificAuctions([]);
        }
    }, [token]);

    return (
        <>
            <div className="content-container">
            <main className="main-area">
                {token && userSpecificAuctions.length > 0 && 
                <section>
                    <h2>My auctions</h2>
                    <AuctionCard AuctionList={userSpecificAuctions} />
                </section>
                }
                <section>
                    <h2>All auctions</h2>
                    <AuctionCard AuctionList={allAuctions} />
                </section>
            </main>
            </div>
        </>
    )
}

export default Home;