import { useState, useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";
import  {editAuction, getAuctionById} from "../../services/auctionService";
import './EditAuction.css';
import type { Auction } from "../../types/Types";
import { useToast } from "../../context/ToastContext";

const EditAuction = () => {
    const navigate = useNavigate();
    const { auctionId } = useParams();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [startingPrice, setStartingPrice] = useState(0);
    const [itemName, setItemName] = useState("");
    const [auctionType, setAuctionType] = useState("" );
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [currentImageUrl, setCurrentImageUrl] = useState<string | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const {showToast} = useToast();

    const [error, setError] = useState<string>();
    const [isSubmitting, setIsSubmitting] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            var result = await getAuctionById(parseInt(auctionId!));
                setTitle(result.name);
                setDescription(result.description);
                setStartingPrice(result.startingPrice);
                setItemName(result.item.name);
                setAuctionType(result.item.auctionType);
                setCurrentImageUrl(result.item.imageUrl);
            };
        fetchData();
    }, [auctionId]);
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] ?? null;
        setImageFile(file);
        if (file) {
            setPreviewUrl(URL.createObjectURL(file)); 
        } else {
            setPreviewUrl(null);
        }
    };


    const validate = (): boolean => {
        const errors: string[] = [];
        if (!title.trim()) errors.push("Title is required.");
        if (!description.trim()) errors.push("Description is required.");
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
            formData.append("AuctionId", auctionId!);
            formData.append("Title", title);
            formData.append("Description", description);
            formData.append("StartingPrice", startingPrice.toString());
            formData.append("ItemName", itemName);
            formData.append("AuctionType", auctionType);
            if (imageFile) {
                formData.append("Image", imageFile, imageFile.name);
            }

            var response = await editAuction(parseInt(auctionId!), formData);
            showToast("Auction updated successfully", "success");
            navigate(`/auction/${auctionId}`);
        } catch (err: any) {
            setError(err.message || "An error occurred.");
            showToast("Error updating auction", "error");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="edit-auction-container">
            <h2>edit Auction</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit} className="edit-auction-form">
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
                    {(previewUrl || currentImageUrl) && (
                        <div className="image-preview-container">
                            <img 
                                src={previewUrl ?? `https://localhost:7029${currentImageUrl}`} 
                                alt="Auction preview" 
                                className="image-preview"
                            />
                            {previewUrl && <p className="field-note">New image selected — this will replace the current one.</p>}
                        </div>
                    )}
                    <input type="file" accept="image/*" onChange={handleImageChange} />
                </label> 
                <button type="submit" disabled={isSubmitting}>Submit changes</button>
            </form>
        </div>
    );
};

export default EditAuction;