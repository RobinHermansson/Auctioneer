import { useEffect, useState } from "react";
import AuctionCard from "../../components/AuctionCard/AuctionCard";
import { getAllAuctions, searchAuctions } from "../../services/auctionService";
import { useAuth } from "../../context/AuthContext";
import type { Auction } from "../../types/Types";
import "./Home.css";

const Home = () => {
    const { token, userId } = useAuth();
    const [allOpenAuctions, setAllOpenAuctions] = useState<Auction[]>([]);
    const [userSpecificAuctions, setUserSpecificAuctions] = useState<Auction[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState<Auction[]>([]);
    const [isSearching, setIsSearching] = useState(false);

    useEffect(() => {
        const fetchAuctions = async () => {
            try {
                const auctions = await getAllAuctions();
                setAllOpenAuctions(auctions.filter((a: Auction) => a.isOpen));
                if (token && userId) {
                    setUserSpecificAuctions(auctions.filter((a: Auction) => a.owner.userId === userId));
                }
            } catch (error) {
                console.error("Error fetching auctions:", error);
            }
        };
        fetchAuctions();
    }, [token]);

    
    useEffect(() => {
        if (!searchQuery.trim()) {
            setSearchResults([]);
            setIsSearching(false);
            return;
        }

        setIsSearching(true);
        const timer = setTimeout(async () => {
            try {
                const results = await searchAuctions(searchQuery);
                setSearchResults(results);
            } catch (error) {
                console.error("Search error:", error);
            } finally {
                setIsSearching(false);
            }
        }, 400);

        return () => clearTimeout(timer); // cleanup on each keystroke
    }, [searchQuery]);

    const isSearchActive = searchQuery.trim().length > 0;

    return (
        <div className="content-container">
            <div className="search-bar-wrapper">
                <input
                    className="search-input"
                    type="text"
                    placeholder="Search auctions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                {isSearchActive && (
                    <button className="search-clear" onClick={() => setSearchQuery("")}>✕</button>
                )}
            </div>

            <main className="main-area">
                {isSearchActive ? (
                    <section>
                        <h2>Search Results {isSearching ? "..." : `(${searchResults.length})`}</h2>
                        {searchResults.length === 0 && !isSearching
                            ? <p className="no-results">No auctions found for "{searchQuery}"</p>
                            : <AuctionCard AuctionList={searchResults} />
                        }
                    </section>
                ) : (
                    <>
                        {token && userSpecificAuctions.length > 0 && (
                            <section>
                                <h2>My Auctions</h2>
                                <AuctionCard AuctionList={userSpecificAuctions} />
                            </section>
                        )}
                        <section>
                            <h2>All Open Auctions</h2>
                            <AuctionCard AuctionList={allOpenAuctions} />
                        </section>
                    </>
                )}
            </main>
        </div>
    );
};

export default Home;