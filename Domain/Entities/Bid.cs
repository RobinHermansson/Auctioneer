namespace Domain.Entities;

public class Bid
{
    public int BidId { get; set; }
    public decimal Amount { get; set; }
    public int AuctionId { get; set; }
    public Auction Auction { get; set; }
    public int BidderUserId { get; set; }
    public User Bidder { get; set; }
}
