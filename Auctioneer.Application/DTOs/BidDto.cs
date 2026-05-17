namespace Auctioneer.Application.DTOs;

public class BidDto
{
    public int BidId { get; set; }
    public decimal Amount { get; set; }
    public UserDto Bidder { get; set; }
    public int AuctionId { get; set; }
}
