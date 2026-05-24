import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import  {createAuction} from "../../services/auctionService";
import './CreateAuction.css';

const CreateAuction = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [startingPrice, setStartingPrice] = useState(0);
    const [itemName, setItemName] = useState("");
    const [auctionType, setAuctionType] = useState("" );
    const [imageFile, setImageFile] = useState<File | null>(null);

    const [error, setError] = useState<string>();
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const today = new Date();
        const end = new Date(today);
        end.setDate(today.getDate() + 14);

        setStartDate(today.toISOString());
        setEndDate(end.toISOString());
    }, []);

    const validate = (): boolean => {
        const errors: string[] = [];
        if (!title.trim()) errors.push("Title is required.");
        if (!description.trim()) errors.push("Description is required.");
        if (!startDate) errors.push("Start date is required.");
        if (!endDate) errors.push("End date is required.");
        if (new Date(endDate) <= new Date(startDate)) errors.push("End date must be after start date.");
        if (startingPrice <= 0) errors.push("Starting price must be greater than zero.");
        if (!itemName.trim()) errors.push("Item name is required.");
        if (!auctionType.trim()) errors.push("Auction type is required.");
        setError(errors.join(" "));
        return errors.length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;
        setIsSubmitting(true);
        
        try {
            const formData = new FormData();
            formData.append("Title", title);
            formData.append("Description", description);
            formData.append("StartDate", startDate);
            formData.append("EndDate", endDate);
            formData.append("StartingPrice", startingPrice.toString());
            formData.append("ItemName", itemName);
            formData.append("AuctionType", auctionType);
            if (imageFile) {
                formData.append("Image", imageFile, imageFile.name);
            }

            var response =await createAuction(formData);
            navigate(`/auction/${response.auctionId}`);
        } catch (err: any) {
            setError(err.message || "An error occurred.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="create-auction-container">
            <h2>Create Auction</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit} className="create-auction-form">
                <label>
                    Title:
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </label>
                <label>
                    Description:
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
                </label>
                <label>
                    Starting Price (SEK):
                    <input type="number" min="0.01" step="0.01" value={startingPrice.toString()} onChange={(e) => setStartingPrice(parseFloat(e.target.value))} required />
                </label>
                <label>
                    Item Name:
                    <input type="text" value={itemName} onChange={(e) => setItemName(e.target.value)} required />
                </label>
                <label>
                    Auction Type:
                    <input type="text" value={auctionType} onChange={(e) => setAuctionType(e.target.value)} required />
                </label>
                <label>
                    Image (optional):
                    <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] ?? null)} />
                </label>
                <button type="submit" disabled={isSubmitting}>Create</button>
            </form>
        </div>
    );
};

export default CreateAuction;
