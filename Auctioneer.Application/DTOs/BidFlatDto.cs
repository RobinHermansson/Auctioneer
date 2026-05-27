namespace Auctioneer.Application.DTOs;

 public class BidFlatDto
{
    public int BidId { get; set; }
    public decimal Amount { get; set; }
    public int BidderId { get; set; }
    public int AuctionId { get; set; }
    public DateTime Timestamp { get; set; }

}
