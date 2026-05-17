import type { AddBidRequest, AddBidResponse } from "../types/Types";

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

export const getAuctionById = async (id: number) => {
    const token = localStorage.getItem("token");
    const response = await fetch(
        `https://localhost:7029/api/Auction/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
    return response.json();
}

export const addBidToAuction = async (bidRequest: AddBidRequest) : Promise<AddBidResponse> => {
    const token = localStorage.getItem("token");
    const response = await fetch(
        `https://localhost:7029/api/Auction/bid`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(bidRequest )
        }
    );
    return response.json();
}
export const getHighestBidById = async (id: number) => {
    const token = localStorage.getItem("token");
    const response = await fetch(
        `https://localhost:7029/api/Auction/highest/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
    return response.json();
}
