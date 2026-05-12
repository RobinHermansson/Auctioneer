export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  token?: string;
}

export interface Auction {
  auctionId: number;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  startingPrice: number;
  owner: Owner;
  item: AuctionItem;
  bids: Bid[];
}
export interface AuctionItem {
  auctionItemId: number;
  auctionType: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
}
export interface Bid {
  bidId: number;
  amount: number;
  bidder: Owner
}

export interface Owner {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
}
