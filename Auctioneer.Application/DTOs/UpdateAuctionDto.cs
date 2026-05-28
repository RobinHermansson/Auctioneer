namespace Auctioneer.Application.DTOs;

public class UpdateAuctionDto
{

    public string Title { get; set; }
    public string Description { get; set; }
    public decimal StartingPrice { get; set; }
    public string ItemName { get; set; }
    public string AuctionType { get; set; }
}

