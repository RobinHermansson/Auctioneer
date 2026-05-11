const getAllAuctions = async () => {
    const response = await fetch('https://localhost:7029/api/Auction')
    return response.json();
}

export default getAllAuctions;