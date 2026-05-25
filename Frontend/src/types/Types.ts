export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  token?: string;
}

export interface RegisterUserRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
export interface RegisterUserResponse {
  success: boolean;
  message: string;
}

export interface Auction {
  auctionId: number;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
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

export interface AddBidRequest {
  auctionId : number;
  amount: number;
}

export interface AddBidResponse{
  success: boolean;
  message: string;
}

