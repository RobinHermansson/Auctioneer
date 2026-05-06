namespace Domain.Entities;

public class AuctionItem
{
    public int AuctionItemId { get; set; }
    public string AuctionType { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public int AuctionId { get; set; }
    public Auction Auction { get; set; }
}

