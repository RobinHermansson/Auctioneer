namespace Domain.Entities;

public class AuctionItem
{
    public int AuctionItemId { get; set; }
    public int AuctionType { get; set; }
    public int Name { get; set; }
    public decimal Price { get; set; }
    public Auction Auction { get; set; }
}

