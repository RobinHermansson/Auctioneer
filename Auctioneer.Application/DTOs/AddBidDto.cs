namespace Auctioneer.Application.DTOs;

public class AddBidDto
{
    public int BidderId { get; set; }
    public int AuctionId { get; set; }
    public int Amount { get; set; }
}
