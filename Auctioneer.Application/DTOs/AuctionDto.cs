namespace Auctioneer.Application.DTOs;

public class AuctionDto
{
    public int AuctionId { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public bool IsActive { get; set; }
    public bool IsOpen { get; set; }
    public bool IsDeactivated { get; set; }
    public decimal StartingPrice { get; set; }
    public UserDto Owner { get; set; }
    public AuctionItemDto Item { get; set; }
    public List<BidDto> Bids { get; set; }

}
