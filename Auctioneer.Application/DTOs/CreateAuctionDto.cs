namespace Auctioneer.Application.DTOs;

public class CreateAuctionDto
{
    public string Title { get; set; }
    public string Description { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public decimal StartingPrice { get; set; }
    public string ItemName { get; set; }
    public string AuctionType { get; set; }
}
