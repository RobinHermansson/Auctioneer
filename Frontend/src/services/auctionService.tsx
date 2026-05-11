export const getAllAuctions = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch(
        "https://localhost:7029/api/Auction",
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
    return response.json();
}

export const getMyAuctions = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch(
        "https://localhost:7029/api/Auction/my",
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
    return response.json();
}
