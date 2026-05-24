import type { AddBidRequest, AddBidResponse } from "../types/Types";

const baseUrl = 'https://localhost:7029/api/Auction';

export const getAllAuctions = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${baseUrl}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.json();
}

export const getMyAuctions = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${baseUrl}/my`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.json();
}

export const getAuctionById = async (id: number) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${baseUrl}/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.json();
}

export const addBidToAuction = async (bidRequest: AddBidRequest) : Promise<AddBidResponse> => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${baseUrl}/bid`, {
        method: "POST",
        headers: {"Content-Type": "application/json", Authorization: `Bearer ${token}`},
        body: JSON.stringify(bidRequest)
    });
    return response.json();
}

export const getHighestBidById = async (id: number) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${baseUrl}/highest/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.json();
}

export const createAuction = async (formData: FormData) => {
    const token = localStorage.getItem("token");
    console.log("Creating auction with data:", Object.fromEntries(formData.entries()));
    const response = await fetch(`${baseUrl}/create`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` }, 
        body: formData
    });
    if (!response.ok) {
        const errText = await response.text();
        throw new Error(errText || 'Failed to create auction');
    }
    return response.json();
}
