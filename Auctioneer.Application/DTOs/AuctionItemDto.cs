namespace Auctioneer.Application.DTOs;

public class AuctionItemDto
{

    public int AuctionItemId { get; set; }
    public string AuctionType { get; set; }
    public string Name { get; set; }
    public decimal Price { get; set; }
    public string Description { get; set; }
    public string ImageUrl { get; set;  }
}
