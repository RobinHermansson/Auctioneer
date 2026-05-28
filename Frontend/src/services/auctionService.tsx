import type { AddBidRequest, AddBidResponse, Auction, BidListing, GenericResponse } from "../types/Types";

const baseUrl = 'https://localhost:7029/api/Auction';

// Helper to build auth headers — only call this for protected endpoints
const authHeaders = (): Record<string, string> => {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
};

// ── Public endpoints (no token needed) ──────────────────────────────────────

export const getAllAuctions = async (): Promise<Auction[]> => {
    const response = await fetch(`${baseUrl}`);
    return response.json();
};

export const getAuctionById = async (id: number): Promise<Auction> => {
    const response = await fetch(`${baseUrl}/${id}`);
    return response.json();
};

export const getHighestBidById = async (id: number): Promise<number> => {
    const response = await fetch(`${baseUrl}/highest/${id}`);
    return response.json();
};

export const getBidsByAuctionId = async (id: number): Promise<BidListing[]> => {
    const response = await fetch(`${baseUrl}/bids/${id}`);
    return response.json();
}


// ── Protected endpoints (token required) ────────────────────────────────────

export const getMyAuctions = async (): Promise<Auction[]> => {
    const response = await fetch(`${baseUrl}/my`, {
        headers: authHeaders()
    });
    return response.json();
};

export const addBidToAuction = async (bidRequest: AddBidRequest): Promise<AddBidResponse> => {
    const response = await fetch(`${baseUrl}/bid`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...authHeaders() },
        body: JSON.stringify(bidRequest)
    });
    return response.json();
};

export const createAuction = async (formData: FormData): Promise<Auction> => {
    const response = await fetch(`${baseUrl}/create`, {
        method: "POST",
        headers: authHeaders(),
        body: formData
    });
    if (!response.ok) {
        const errText = await response.text();
        throw new Error(errText || 'Failed to create auction');
    }
    return response.json();
};

export const deleteAuction = async (auctionId: number): Promise<void> => {
    const response = await fetch(`${baseUrl}/${auctionId}`, {
        method: "DELETE",
        headers: authHeaders()
    });
    if (!response.ok) {
        const errText = await response.text();
        throw new Error(errText || 'Failed to delete auction');
    }
};
export const retractBid = async (bidId: number): Promise<GenericResponse> => {
    const response = await fetch(`${baseUrl}/retract/${bidId}`, {
        method: "DELETE",
        headers: authHeaders()
    });
    return response.json();
};
export const deactivateAuction = async (auctionId: number): Promise<GenericResponse> => {
    const response = await fetch(`${baseUrl}/admin/deactivate/${auctionId}`, {
        method: "PATCH",
        headers: authHeaders()
    });
    return response.json();
}

export const editAuction = async (auctionId: number, formData: FormData): Promise<GenericResponse> => {
    
    const response = await fetch(`${baseUrl}/edit/${auctionId}`, {
        method: "PATCH",
        headers: authHeaders(),
        body: formData
    });
    if (!response.ok) {
        const errText = await response.text();
        throw new Error(errText || 'Failed to edit auction');
    }
    return response.json();
};